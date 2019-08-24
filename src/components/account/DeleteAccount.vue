<template>
  <div>
    <v-button background="bg-red" background-hover="bg-red-dark" class="w-full" @click.native="openModal" :disabled="loading">Delete Account (Permanently)</v-button>

    <modal v-if="showModal" @close="exit">
      <p class="text-center mb-8 text-grey-lighter text-md">Are you sure you want to delete your account?</p>
      <p class="text-center mb-8 text-grey-lighter text-md">This is PERMANENT.</p>

      <template v-if="deleteTimer">
        <p class="text-center mb-8 text-grey-lighter text-sm">Deleting in {{ deleteTimer }} seconds.</p>
        <v-button @click-native="cancelInterval">CANCEL</v-button>
      </template>

      <template v-else>
        <password-input v-if="!isSocialAuth" placeholder="Password" v-model="password" class="mb-4" name="password" v-validate="'required'" data-vv-delay="1000"/>
        <v-button class="w-full mb-4" @click-native="deleteAccount" :disabled="!isSocialAuth && !formIsValid">CONFIRM</v-button>
        <p class="cursor-pointer text-center text-grey-lighter text-sm" @click="closeModal">Cancel</p>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormMixin from '@/mixins/form'
import authService from '@/services/auth'
import VButton from '@/components/shared/Button'
import PasswordInput from '@/components/shared/inputs/PasswordInput'
import Modal from '@/components/shared/modals/Modal'

export default {
    components: { VButton, PasswordInput, Modal },
    mixins: [ FormMixin ],
    data () {
        return {
            password: null,
            loading: false,
            error: false,
            showModal: false,
            resolver: null,
            deleteTimer: null,
            intervalId: null
        }
    },
    computed: {
        ...mapGetters({
            isSocialAuth: 'isSocialAuth'
        })
    },
    methods: {
        async startInterval () {
            this.deleteTimer = 10

            return new Promise(async (resolve, reject) => {
                this.resolver = resolve

                this.intervalId = setInterval(() => {
                    if (this.deleteTimer !== 0) {
                        this.deleteTimer = this.deleteTimer - 1
                        return
                    }

                    resolve(true)
                }, 1000)
            })
        },
        cancelInterval () {
            this.resolver(false)
        },
        clearTimer () {
            clearInterval(this.intervalId)
            this.intervalId = null
            this.resolver = null
            this.deleteTimer = null
        },
        openModal () {
            this.showModal = true
        },
        closeModal () {
            this.showModal = false
            this.password = null
        },
        exit () {
            this.clearTimer()
            this.closeModal()
        },
        async reauthenticate () {
            if (this.isSocialAuth) {
                await authService.socialReauthenticate()
            } else {
                await authService.emailReauthenticate(this.password)
            }
        },
        async deleteAccount () {
            try {
                await this.reauthenticate()
            } catch (error) {
                this.error = true
                return
            }

            const confirmDelete = await this.startInterval()

            this.clearTimer()

            if (!confirmDelete) {
                this.closeModal()
                return
            }

            this.loading = true

            try {
                await authService.deleteMyAccount()
                this.$router.push({ name: 'logout' })
            } catch (error) {
                this.password = null
                this.error = true
            }

            this.loading = false
        }
    }
}
</script>
