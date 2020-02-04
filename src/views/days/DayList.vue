<template>
  <macro-item-list
    :bread-crumbs="breadCrumbs"
    title="Day List"
    :items="processedDays"
    search-placeholder="Search Days..."
    empty-text="You have no Days!"
    @newItem="createDay"
    @selectedItem="viewDay"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import MacroItemList from '@/components/shared/macro_items/MacroItemList'

export default {
    name: 'days',
    components: { MacroItemList },
    data () {
        return {
            breadCrumbs: [{ title: 'Days', route: 'days' }]
        }
    },
    computed: mapGetters(['processedDays']),
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
