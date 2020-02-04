<template>
  <macro-item-list
    :bread-crumbs="breadCrumbs"
    :items="processedMeals"
    search-placeholder="Search Meals..."
    empty-text="You have no Meals!"
    @newItem="createMeal"
    @selectedItem="viewMeal"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import MacroItemList from '@/components/shared/macro_items/MacroItemList'

export default {
    name: 'meals',
    components: { MacroItemList },
    data () {
        return {
            breadCrumbs: [{ title: 'Meals', route: 'meals' }]
        }
    },
    computed: mapGetters(['processedMeals']),
    methods: {
        createMeal () {
            this.$router.push({ name: 'create-meal' })
        },
        viewMeal (meal) {
            this.$router.push({ name: 'view-meal', params: { mealId: meal.id } })
        }
    }
}
</script>
