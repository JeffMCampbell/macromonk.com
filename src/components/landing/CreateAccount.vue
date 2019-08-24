<template>
  <auth title="Create Account" submit-text="Create Account" :submit-handler="createAccount" :form-valid="formIsValid">
    <form slot="body">
      <text-input class="w-full mb-4" placeholder="Name..." name="name" v-model="name" v-validate="'required'" data-vv-delay="1000"/>
      <validation-error class="mb-4" v-if="fieldHasError('name')" :error="getFieldError('name')"/>
      <text-input class="w-full mb-4" placeholder="Email..." name="email" v-model="email" v-validate="'required|email'" data-vv-delay="1000"/>
      <validation-error class="mb-4" v-if="fieldHasError('email')" :error="getFieldError('email')"/>
      <password-input class="w-full mb-4" placeholder="Password..." name="password" ref="password" v-model="password" v-validate="'required|min:6|max:30'" data-vv-delay="1000"/>
      <validation-error class="mb-4" v-if="fieldHasError('password')" :error="getFieldError('password')"/>
      <password-input class="w-full mb-4" placeholder="Confirm..." name="confirm" v-model="confirm" v-validate="'required|confirmed:password'" data-vv-delay="1000"/>
      <validation-error class="mb-4" v-if="fieldHasError('confirm')" :error="getFieldError('confirm')"/>
    </form>
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
            name: null,
            email: null,
            password: null,
            confirm: null
        }
    },
    methods: {
        async createAccount () {
            try {
                await authService.createEmailAccount(this.name, this.email, this.password)
            } catch (error) {
                this.password = null
                this.confirm = null
                throw error
            }
        }
    }
}
</script>
