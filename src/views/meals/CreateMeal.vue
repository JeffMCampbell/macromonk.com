<template>
  <div>
    <view-header title="New Meal" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <meal-form save-text="Create Meal" v-model="meal" @save="create"/>
      <macro-card v-if="isDesktop" :calories="macros.calories" :protein="macros.protein" :carbs="macros.carbs" :fat="macros.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MacroCalculator from '@/services/macro-calculator'
import MealService from '@/services/meal-service'
import ViewHeader from '@/components/shared/ViewHeader'
import MealForm from '@/components/meals/MealForm'
import MacroCard from '@/components/shared/MacroCard'

export default {
    name: 'create-meal',
    components: { ViewHeader, MealForm, MacroCard },
    data () {
        return {
            breadCrumbs: [{ title: 'Meals', route: 'meals' }, { title: 'Create', route: 'create-meal' }],
            meal: {
                name: null,
                ingredients: {},
                recipes: {}
            }
        }
    },
    computed: {
        ...mapGetters({
            isDesktop: 'isDesktop'
        }),
        macros () {
            return MacroCalculator.forMeal(this.meal)
        }
    },
    methods: {
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        async create () {
            this.setDashboardLoading(true)
            const meal = await MealService.addMeal(this.meal)
            this.$router.push({ name: 'view-meal', params: { mealId: meal.id } })
            this.setDashboardLoading(false)
        }
    }
}
</script>
