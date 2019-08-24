<template>
  <div class="flex justify-between items-center mb-4">
    <text-input :value="value" @input="(newValue) => $emit('input', newValue)" :placeholder="searchPlaceholder" class="search-input"/>
    <v-button class="ml-2" background="bg-green" background-hover="hover:bg-green-dark" @click.native="$emit('newItem')">New</v-button>
  </div>
</template>

<script>
import TextInput from '@/components/shared/inputs/TextInput'
import VButton from '@/components/shared/Button'

export default {
    name: 'table-header',
    components: { TextInput, VButton },
    props: {
        value: {
            type: String,
            required: true
        },
        searchPlaceholder: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .search-input {
        width: 20rem;
    }
</style>
