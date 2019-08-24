<template>
  <div>
    <view-header :bread-crumbs="breadCrumbs"/>
    <table-header v-model="search" search-placeholder="Search Meals..." @newItem="createMeal"/>
    <macro-grid :items="filteredMeals" @selected="viewMeal" v-if="filteredMeals.length"/>
    <div class="text-white text-xl text-center mt-16" v-else>You have no Meals!</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { includes } from 'lodash'
import ViewHeader from '@/components/shared/ViewHeader'
import TableHeader from '@/components/shared/TableHeader'
import MacroGrid from '@/components/shared/MacroGrid'

export default {
    name: 'meals',
    components: { ViewHeader, TableHeader, MacroGrid },
    data () {
        return {
            breadCrumbs: [{ title: 'Meals', route: 'meals' }],
            search: ''
        }
    },
    computed: {
        ...mapGetters({
            meals: 'processedMeals'
        }),
        filteredMeals () {
            return this.search ? this.meals.filter((meal) => includes(meal.name, this.search)) : this.meals
        }
    },
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
