<template>
  <div class="relative">
    <loader class="absolute m-auto pin" v-if="loading"/>
    <div :class="{ 'opacity-50': loading }">
      <h3 class="text-center mb-8 text-grey-lighter text-2xl">{{ title }}</h3>
      <validation-error class=" mb-4 text-center" v-if="errorMessage" :error="errorMessage"/>
      <v-button class="w-full mb-2" background="bg-red" background-hover="hover:bg-red-dark" :disabled="loading" @click.native="googleLogin">Login with Google</v-button>
      <v-button class="w-full mb-8" background="bg-blue" background-hover="hover:bg-blue-dark" :disabled="loading" @click.native="facebookLogin">Login with Facebook</v-button>
      <form>
        <slot class="mb-4" name="body" :loading="loading"/>
        <v-button class="w-full mb-5" background="bg-black" background-hover="hover:bg-gray-dark" :disabled="loading || !formValid" @click.native="submit">{{ submitText }}</v-button>
      </form>
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import authService from '@/services/auth'
import Login from '@/components/landing/Login'
import Loader from '@/components/shared/Loader'
import VButton from '@/components/shared/Button'
import ValidationError from '@/components/shared/ValidationError'

export default {
    components: { Login, Loader, VButton, ValidationError },
    props: {
        title: {
            type: String,
            required: true
        },
        submitText: {
            type: String,
            required: true
        },
        submitHandler: {
            type: Function,
            required: true
        },
        formValid: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            loading: false,
            errorMessage: null
        }
    },
    methods: {
        async wrapper (handler) {
            this.loading = true

            try {
                console.log(1)
                await handler()
                console.log(2)
                this.$router.replace({ name: 'ingredients' })
            } catch (error) {
                console.log(error)
                this.errorMessage = error.message
            }

            this.loading = false
        },
        submit () {
            this.wrapper(this.submitHandler)
        },
        googleLogin () {
            this.wrapper(authService.googleLogin)
        },
        facebookLogin () {
            this.wrapper(authService.facebookLogin)
        },
        clear () {
            this.errorMessage = null
        }
    }
}
</script>
