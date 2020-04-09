<template>
  <div>
    <view-header title="New Meal" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <meal-form save-text="Create Meal" v-model="meal" @save="create"/>
      <macro-card v-if="isDesktop" :calories="meal.calories" :protein="meal.protein" :carbs="meal.carbs" :fat="meal.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Meal from '@/models/Meal'
import ViewHeader from '@/components/shared/ViewHeader'
import MealForm from '@/components/meals/MealForm'
import MacroCard from '@/components/shared/macro_items/MacroCard'

export default {
    name: 'create-meal',
    components: { ViewHeader, MealForm, MacroCard },
    data () {
        return {
            breadCrumbs: [{ title: 'Meals', route: 'meals' }, { title: 'Create', route: 'create-meal' }],
            meal: new Meal({
                name: null,
                ingredients: {},
                recipes: {}
            })
        }
    },
    computed: mapGetters(['isDesktop']),
    methods: {
        ...mapActions(['createMeal']),
        async create () {
            const meal = await this.createMeal(this.meal)
            this.$router.push({ name: 'view-meal', params: { mealId: meal.id } })
        }
    }
}
</script>
