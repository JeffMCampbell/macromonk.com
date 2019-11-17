<template>
  <block title="Password" :submit-handler="submitHandler" :form-is-valid="formIsValid">
    <template slot-scope="slotProps">
      <password-input v-model="currentPassword" name="currentPassword" placeholder="Current" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('currentPassword')" :error="errors.first('currentPassword')" class="mb-4"/>
      <password-input v-model="newPassword" name="newPassword" placeholder="New" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('newPassword')" :error="errors.first('newPassword')" class="mb-4"/>
      <password-input v-model="confirmPassword" name="confirmPassword" placeholder="Confirm" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('confirmPassword')" :error="errors.first('confirmPassword')" class="mb-4"/>
      <validation-error v-if="updateError" :error="updateError" class="mb-4"/>
    </template>
  </block>
</template>

<script>
import { mapActions } from 'vuex'
import FormMixin from '@/mixins/form'
import Block from '@/components/account/Block'
import PasswordInput from '@/components/shared/inputs/PasswordInput'
import ValidationError from '@/components/shared/ValidationError'

export default {
    components: { Block, PasswordInput, ValidationError },
    mixins: [ FormMixin ],
    data () {
        return {
            currentPassword: null,
            newPassword: null,
            confirmPassword: null,
            updateError: null
        }
    },
    methods: {
        ...mapActions(['updatePassword']),
        async submitHandler () {
            this.updateError = null

            try {
                await this.updatePassword(this.currentPassword, this.newPassword)
            } catch (error) {
                this.updateError = error.message
                throw error
            } finally {
                this.currentPassword = null
                this.newPassword = null
                this.confirmPassword = null
                this.$validator.reset()
            }
        }
    }
}
</script>
