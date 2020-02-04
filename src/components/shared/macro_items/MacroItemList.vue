<template>
  <div>
    <view-header title="Ingredient List" :bread-crumbs="breadCrumbs"/>
    <table-header v-model="filter" :search-placeholder="searchPlaceholder" @newItem="() => $emit('newItem')"/>
    <macro-grid :items="filteredItems" @selected="(item) => $emit('selectedItem', item)" v-if="filteredItems.length"/>
    <div class="text-white text-xl text-center mt-16" v-else>{{ emptyText }}</div>
  </div>
</template>

<script>
import { includes, orderBy, isString } from 'lodash'
import ViewHeader from '@/components/shared/ViewHeader'
import TableHeader from '@/components/shared/TableHeader'
import MacroGrid from '@/components/shared/macro_items/MacroGrid'

export default {
    name: 'ingredients',
    components: { ViewHeader, TableHeader, MacroGrid },
    props: {
        breadCrumbs: {
            type: Array,
            required: true
        },
        searchPlaceholder: {
            type: String,
            default: 'Search...'
        },
        emptyText: {
            type: String,
            default: 'You have no items...'
        },
        items: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            filter: {
                search: '',
                sortField: 'name',
                sortDirection: 'asc'
            }
        }
    },
    computed: {
        filteredItems () {
            const bySearch = this.filter.search ? this.items.filter((item) => includes(item.name, this.filter.search)) : this.items

            return orderBy(bySearch, (item) => {
                let value = item[this.filter.sortField]
                return isString(value) ? value.toLowerCase() : value
            }, this.filter.sortDirection)
        }
    }
}
</script>
