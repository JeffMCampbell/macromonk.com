<template>
  <v-button background="bg-white" background-hover="hover:bg-grey-light" font-color="text-black" @click.native="showIngredientModal = true" :disabled="disabled">
    <add-icon class="text-black mr-1"/><span>{{ label }}</span>
  </v-button>
</template>

<script>
import VButton from '@/components/shared/Button'
import AddIcon from '@/components/shared/icons/AddIcon'

export default {
    name: 'meal-form',
    components: { VButton, AddIcon },
    props: {
        label: {
            type: String,
            required: true
        },
        disabled: {
            default: false,
            type: Boolean
        }
    }
}
</script>
