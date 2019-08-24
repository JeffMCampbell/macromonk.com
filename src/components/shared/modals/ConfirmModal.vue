<template>
  <modal :loading="loading" @close="() => $emit('close')">
    <div class="w-48">
      <p class="text-center mb-8 text-grey-lighter text-md">{{ headerText }}</p>
      <p class="text-center mb-8 text-grey-lighter text-sm">{{ subText }}</p>
      <v-button @click.native="$emit('confirmed')" background="bg-red" background-hover="hover:bg-red-dark" class="w-full">CONFIRM</v-button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/shared/modals/Modal'
import VButton from '@/components/shared/Button'

export default {
    name: 'confirm-modal',
    components: { Modal, VButton },
    props: {
        headerText: {
            type: String,
            required: true
        },
        subText: {
            type: String,
            required: false,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>
