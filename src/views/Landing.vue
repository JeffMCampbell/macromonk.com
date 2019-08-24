<template>
  <div class="min-h-screen flex flex-col">

    <div class="flex items-center justify-center p-6">
      <logo class="ml-4"/>
    </div>

    <div class="flex-1 flex items-center justify-center p-6">
      <button class="bg-red-light text-grey-light font-bold py-3 px-4 rounded mr-5" @click="toggleShowLogin">Login</button>
      <button class="bg-transparent text-red-light font-bold py-3 px-4 rounded border border-red-light" @click="toggleShowCreateAccount">Create Account</button>
    </div>

    <modal v-if="showLogin || showCreateAccount" @close="closeAuth">
      <div class="auth-modal-wrapper">
        <login v-if="showLogin"/>
        <create-account v-if="showCreateAccount"/>
      </div>
    </modal>

  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway2'
import Navigation from '@/components/navigation/Navigation'
import Modal from '@/components/shared/modals/Modal'
import Login from '@/components/landing/Login'
import CreateAccount from '@/components/landing/CreateAccount'
import Logo from '@/components/shared/Logo'

export default {
    name: 'landing-navigation',
    components: { Logo, Navigation, Modal, Login, CreateAccount },
    mixins: [ clickaway ],
    data () {
        return {
            showLogin: false,
            showCreateAccount: false
        }
    },
    methods: {
        toggleShowLogin () {
            this.showCreateAccount = false
            this.showLogin = !this.showLogin
        },
        toggleShowCreateAccount () {
            this.showLogin = false
            this.showCreateAccount = !this.showCreateAccount
        },
        closeAuth () {
            this.showCreateAccount = false
            this.showLogin = false
        }
    }
}
</script>

<style lang="scss" scoped>
    .auth-modal-wrapper {
        width: 25rem;
    }
</style>
