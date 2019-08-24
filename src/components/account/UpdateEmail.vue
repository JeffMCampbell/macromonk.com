<template>
  <block title="Email" :submit-handler="updateEmail" :form-is-valid="formIsValid">
    <template slot-scope="slotProps">
      <text-input v-model="email" name="email" placeholder="Email" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('email')" :error="errors.first('email')" class="mb-4"/>
      <text-input v-model="password" name="password" placeholder="Password" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('password')" :error="errors.first('password')" class="mb-4"/>
    </template>
  </block>
</template>

<script>
import { mapState } from 'vuex'
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
            email: null,
            password: null
        }
    },
    computed: {
        ...mapState({
            userEmail: 'email'
        })
    },
    created () {
        this.email = this.userEmail
    },
    methods: {
        async updateEmail () {
            try {
                await authService.updateMyEmail(this.email, this.password)
            } catch (error) {
                throw error
            } finally {
                this.password = null
                this.$validator.reset()
            }
        }
    }
}
</script>
