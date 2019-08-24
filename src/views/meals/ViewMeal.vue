<template>
  <div>
    <view-header :title="meal.name" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <card class="bg-theme-black-2 mb-4" :title="`Ingredients (${calculatedIngredients.length})`">
          <macro-grid :items="calculatedIngredients" @selected="(ingredient) => $router.push({ name: 'view-ingredient', params: { ingredientId: ingredient.id } })"/>
        </card>
        <card class="bg-theme-black-2 mb-4" :title="`Recipes (${calculatedRecipes.length})`">
          <macro-grid :items="calculatedRecipes" @selected="(recipe) => $router.push({ name: 'view-recipe', params: { recipeId: recipe.id } })"/>
        </card>
      </div>
      <macro-card class="self-start" :calories="meal.calories" :protein="meal.protein" :carbs="meal.carbs" :fat="meal.fat"/>
    </div>
    <confirm-modal
      v-if="showDeleteModal"
      header-text="Are you sure you want to delete this meal?"
      sub-text="This is will modify any days containing this meal."
      @confirmed="deleteMeal"
      @close="() => showDeleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { get } from 'lodash'
import MealService from '@/services/meal-service'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/MacroCard'
import MacroGrid from '@/components/shared/MacroGrid'
import Card from '@/components/shared/Card'
import ConfirmModal from '@/components/shared/modals/ConfirmModal'

export default {
    name: 'view-meal',
    components: { ViewHeader, MacroCard, MacroGrid, Card, ConfirmModal },
    props: {
        mealId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            options: [
                {
                    label: 'Edit',
                    icon: 'edit',
                    handler: () => this.$router.push({ name: 'edit-meal', params: { mealId: this.mealId } })
                },
                {
                    label: 'Delete',
                    icon: 'delete',
                    handler: () => { this.showDeleteModal = true }
                }
            ],
            showDeleteModal: false
        }
    },
    computed: {
        ...mapGetters({
            getMeal: 'getMeal',
            ingredientsForMeal: 'ingredientsForMeal',
            recipesForMeal: 'recipesForMeal'
        }),
        meal () { return this.getMeal(this.mealId) },
        ingredients () { return this.ingredientsForMeal(this.mealId) },
        recipes () { return this.recipesForMeal(this.mealId) },
        breadCrumbs () { return [{ title: 'Meals', route: 'meals' }, { title: this.meal.name, route: 'view-meal', params: { id: this.mealId } }] },
        calculatedIngredients () {
            return this.ingredientsForMeal(this.mealId).map((ingredient) => {
                const portions = this.getIngredientPortions(ingredient)

                return {
                    id: ingredient.id,
                    name: ingredient.nameWithPortionLabel(portions),
                    calories: ingredient.calories * portions,
                    protein: ingredient.protein * portions,
                    carbs: ingredient.carbs * portions,
                    fat: ingredient.fat * portions
                }
            })
        },
        calculatedRecipes () {
            return this.recipesForMeal(this.mealId).map((recipe) => {
                const portions = this.getRecipePortions(recipe)

                return {
                    id: recipe.id,
                    name: `${recipe.name} (${portions})`,
                    calories: recipe.calories * portions,
                    protein: recipe.protein * portions,
                    carbs: recipe.carbs * portions,
                    fat: recipe.fat * portions
                }
            })
        }
    },
    methods: {
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        getIngredientPortions (ingredient) {
            return get(this.meal.ingredients, ingredient.id, 0)
        },
        getRecipePortions (recipe) {
            return get(this.meal.recipes, recipe.id, 0)
        },
        async deleteMeal () {
            this.setDashboardLoading(true)
            await MealService.deleteMeal(this.mealId)
            this.setDashboardLoading(false)
            this.$router.push({ name: 'meals' })
        }
    }
}
</script>
