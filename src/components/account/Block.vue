<template>
  <card class="bg-theme-color-2 relative" :title="title">
    <loader class="absolute m-auto pin" v-if="loading"/>
    <slot :clear-messages="clearMessages" :loading="loading"/>
    <v-button @click.native="submit" :disabled="loading || !formIsValid" class="w-full">Save</v-button>
    <success-message v-if="success" message="Success!" class="text-center mt-4"/>
    <validation-error v-if="error" error="An Error Occurred." class="text-center mt-4"/>
  </card>
</template>

<script>
import Card from '@/components/shared/Card'
import Loader from '@/components/shared/Loader'
import VButton from '@/components/shared/Button'
import SuccessMessage from '@/components/shared/SuccessMessage'
import ValidationError from '@/components/shared/ValidationError'

export default {
    components: { Card, Loader, VButton, SuccessMessage, ValidationError },
    props: {
        title: {
            type: String,
            required: false,
            default: null
        },
        submitHandler: {
            type: Function,
            required: true
        },
        formIsValid: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            loading: false,
            error: false,
            success: false
        }
    },
    methods: {
        async submit () {
            this.loading = true
            this.clearMessages()

            try {
                await this.submitHandler()
            } catch (error) {
                this.error = true
            }

            this.success = !this.error
            this.loading = false
        },
        clearMessages () {
            this.error = false
            this.success = false
        }
    }
}
</script>
