<template>
  <div>
    <view-header :bread-crumbs="breadCrumbs"/>
    <table-header v-model="search" search-placeholder="Search Days..." @newItem="createDay"/>
    <macro-grid :items="filteredDays" @selected="viewDay" v-if="filteredDays.length"/>
    <div class="text-white text-xl text-center mt-16" v-else>You have no Days!</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { includes } from 'lodash'
import ViewHeader from '@/components/shared/ViewHeader'
import TableHeader from '@/components/shared/TableHeader'
import MacroGrid from '@/components/shared/macro_items/MacroGrid'

export default {
    name: 'days',
    components: { ViewHeader, TableHeader, MacroGrid },
    data () {
        return {
            breadCrumbs: [{ title: 'Days', route: 'days' }],
            search: ''
        }
    },
    computed: {
        ...mapGetters({
            days: 'processedDays'
        }),
        filteredDays () {
            return this.search ? this.days.filter((day) => includes(day.name, this.search)) : this.days
        }
    },
    methods: {
        createDay () {
            this.$router.push({ name: 'create-day' })
        },
        viewDay (day) {
            this.$router.push({ name: 'view-day', params: { dayId: day.id } })
        }
    }
}
</script>
