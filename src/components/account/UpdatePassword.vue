<template>
  <block title="Password" :submit-handler="updatePassword" :form-is-valid="formIsValid">
    <template slot-scope="slotProps">
      <text-input v-model="currentPassword" name="currentPassword" placeholder="Current" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('currentPassword')" :error="errors.first('currentPassword')" class="mb-4"/>
      <text-input v-model="newPassword" name="newPassword" placeholder="New" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('newPassword')" :error="errors.first('newPassword')" class="mb-4"/>
      <text-input v-model="confirmPassword" name="confirmPassword" placeholder="Confirm" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('confirmPassword')" :error="errors.first('confirmPassword')" class="mb-4"/>
    </template>
  </block>
</template>

<script>
import FormMixin from '@/mixins/form'
import authService from '@/services/auth'
import Block from '@/components/account/Block'
import TextInput from '@/components/shared/inputs/TextInput'
import ValidationError from '@/components/shared/ValidationError'

export default {
    components: { Block, TextInput, ValidationError },
    mixins: [ FormMixin ],
    data () {
        return {
            currentPassword: null,
            newPassword: null,
            confirmPassword: null
        }
    },
    methods: {
        async updatePassword () {
            try {
                await authService.updateMyPassword(this.currentPassword, this.newPassword)
            } catch (error) {
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
