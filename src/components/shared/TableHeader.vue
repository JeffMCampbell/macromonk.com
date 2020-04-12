<template>
  <div class="mb-4">
    <div class="top-section flex justify-between items-center">
      <!-- <v-button class="ml-r" background="bg-white" background-hover="hover:bg-gray" @click.native="showFilter = !showFilter">
        <filter-icon class="text-black"/>
      </v-button> -->
      <text-input class="flex-1 w-full h-full mr-2" :value="value.search" @input="(newValue) => update('search', newValue)" :placeholder="searchPlaceholder"/>
      <v-button class="mr-2 h-full" background="bg-white" background-hover="hover:bg-gray" @click.native="showFilter = !showFilter">
        <filter-icon class="text-black"/>
      </v-button>
      <v-button class="mr-2" background="h-full bg-green" background-hover="hover:bg-green-dark" @click.native="$emit('newItem')">New</v-button>
    </div>

    <div class="flex justify-center items-center mt-4" v-if="showFilter">
      <span class="text-white mr-2">Sort:</span>
      <select-input class="w-24 mr-2" :value="value.sortField" @input="(newValue) => update('sortField', newValue)" :options="sortFields"/>
      <select-input class="w-24" :value="value.sortDirection" @input="(newValue) => update('sortDirection', newValue)" :options="sortDirections"/>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/shared/inputs/TextInput'
import SelectInput from '@/components/shared/inputs/SelectInput'
import FilterIcon from '@/components/shared/icons/FilterIcon'
import VButton from '@/components/shared/Button'

const sortFields = [
    { label: 'Name', value: 'name' },
    { label: 'Calories', value: 'calories' },
    { label: 'Protein', value: 'protein' },
    { label: 'Carbs', value: 'carbs' },
    { label: 'Fat', value: 'fat' }
]

const sortDirections = [
    { label: 'Desc', value: 'desc' },
    { label: 'Asc', value: 'asc' }
]


export default {
    name: 'table-header',
    components: { TextInput, SelectInput, VButton, FilterIcon },
    props: {
        value: {
            type: Object,
            required: true
        },
        searchPlaceholder: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            showFilter: false
        }
    },
    computed: {
        sortFields: () => sortFields,
        sortDirections: () => sortDirections
    },
    methods: {
        update (field, value) {
            this.$emit('input', {
                search: this.value.search,
                sortField: this.value.sortField,
                sortDirection: this.value.sortDirection,
                ...{ [field]: value }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .top-section {
        height: 3rem;
    }
</style>
