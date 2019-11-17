<template>
  <block title="Email" :submit-handler="submitHandler" :form-is-valid="formIsValid">
    <template slot-scope="slotProps">
      <text-input v-model="email" name="email" placeholder="Email" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('email')" :error="errors.first('email')" class="mb-4"/>
      <password-input v-model="password" name="password" placeholder="Password" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('password')" :error="errors.first('password')" class="mb-4"/>
      <validation-error v-if="updateError" :error="updateError" class="mb-4"/>
    </template>
  </block>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormMixin from '@/mixins/form'
import Block from '@/components/account/Block'
import TextInput from '@/components/shared/inputs/TextInput'
import PasswordInput from '@/components/shared/inputs/PasswordInput'
import ValidationError from '@/components/shared/ValidationError'

export default {
    components: { Block, TextInput, PasswordInput, ValidationError },
    mixins: [ FormMixin ],
    data () {
        return {
            email: null,
            password: null,
            updateError: null
        }
    },
    computed: {
        ...mapState({
            user: 'user'
        })
    },
    created () {
        this.email = this.user.email
    },
    methods: {
        ...mapActions(['updateEmail']),
        async submitHandler () {
            this.updateError = null

            try {
                await this.updateEmail(this.email, this.password)
            } catch (error) {
                this.updateError = error.message
                throw error
            } finally {
                this.password = null
                this.$validator.reset()
            }
        }
    }
}
</script>
