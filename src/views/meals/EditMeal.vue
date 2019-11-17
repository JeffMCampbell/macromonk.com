<template>
  <div>
    <view-header :title="originalName" sub-title="Meal" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <meal-form save-text="Save Meal" v-model="meal" @save="save"/>
      <macro-card v-if="isDesktop" :calories="macros.calories" :protein="macros.protein" :carbs="macros.carbs" :fat="macros.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import MacroCalculator from '@/services/macro-calculator'
import ViewHeader from '@/components/shared/ViewHeader'
import MealForm from '@/components/meals/MealForm'
import MacroCard from '@/components/shared/macro_items/MacroCard'

export default {
    name: 'edit-meal',
    components: { ViewHeader, MealForm, MacroCard },
    props: {
        mealId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            originalName: null,
            meal: null
        }
    },
    computed: {
        ...mapGetters(['getMeal', 'isDesktop']),
        breadCrumbs () {
            return [{ title: 'Meals', route: 'meals' }, { title: this.originalName, route: 'view-meal', params: { id: this.mealId } }, { title: 'Edit' }]
        },
        macros () {
            return MacroCalculator.forMeal(this.meal)
        }
    },
    created () {
        this.meal = cloneDeep(this.getMeal(this.mealId))
        if (!this.meal) { this.$router.replace({ name: 'meals' }) }
        this.originalName = this.meal.name
    },
    methods: {
        ...mapMutations(['setDashboardLoading']),
        ...mapActions(['updateMeal']),
        async save () {
            this.setDashboardLoading(true)
            await this.updateMeal(this.meal)
            this.$router.push({ name: 'view-meal', params: { mealId: this.mealId } })
            this.setDashboardLoading(false)
        }
    }
}
</script>
