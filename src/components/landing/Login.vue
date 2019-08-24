<template>
  <auth title="Login" submit-text="Login" :submit-handler="login" :form-valid="formIsValid">
    <form slot="body">
      <text-input class="w-full mb-4" placeholder="Email Address..." name="email" v-model="email" v-validate="'required|email'" data-vv-delay="1000"/>
      <validation-error class="mb-4" v-if="fieldHasError('email')" :error="getFieldError('email')"/>
      <password-input class="w-full mb-4" placeholder="Password..." name="password" v-model="password" v-validate="'required|min:6|max:30'" data-vv-delay="1000"/>
      <validation-error class="mb-4" v-if="fieldHasError('password')" :error="getFieldError('password')"/>
    </form>
    <div class="text-center no-underline text-grey text-sm" slot="footer">
      Forgot Password?
    </div>
  </auth>
</template>

<script>
import FormMixin from '@/mixins/form'
import authService from '@/services/auth'
import Auth from '@/components/landing/Auth'
import TextInput from '@/components/shared/inputs/TextInput'
import PasswordInput from '@/components/shared/inputs/PasswordInput'
import ValidationError from '@/components/shared/ValidationError'

export default {
    components: { Auth, TextInput, PasswordInput, ValidationError },
    mixins: [ FormMixin ],
    data () {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        async login () {
            try {
                await authService.emailLogin(this.email, this.password)
            } catch (error) {
                this.password = null
                throw error
            }
        }
    }
}
</script>
