<template>
  <div>
    <view-header :title="meal.name" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <card class="bg-theme-black-2 mb-4" :title="`Ingredients (${ingredients.length})`">
          <macro-grid :items="ingredients" @selected="(ingredient) => $router.push({ name: 'view-ingredient', params: { ingredientId: ingredient.id } })" v-if="ingredients.length"/>
          <div class="text-white text-center text-sm italic" v-else>Meal has no ingredients.</div>
        </card>
        <card class="bg-theme-black-2" :title="`Recipes (${recipes.length})`">
          <macro-grid :items="recipes" @selected="(recipe) => $router.push({ name: 'view-recipe', params: { recipeId: recipe.id } })" v-if="recipes.length"/>
          <div class="text-white text-center text-sm italic" v-else>Meal has no recipes.</div>
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
import MealService from '@/services/meal-service'
import MealIngredient from '@/models/MealIngredient'
import MealRecipe from '@/models/MealRecipe'
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
        meal () {
            return this.getMeal(this.mealId)
        },
        ingredients () {
            return this.ingredientsForMeal(this.mealId).map((ingredient) => new MealIngredient(ingredient, this.meal))
        },
        recipes () {
            return this.recipesForMeal(this.mealId).map((recipe) => new MealRecipe(recipe, this.meal))
        },
        breadCrumbs () {
            return [{ title: 'Meals', route: 'meals' }, { title: this.meal.name, route: 'view-meal', params: { id: this.mealId } }]
        }
    },
    created () {
        if (!this.meal) { this.$router.replace({ name: 'meals' }) }
    },
    methods: {
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        async deleteMeal () {
            this.setDashboardLoading(true)
            await MealService.deleteMeal(this.mealId)
            this.setDashboardLoading(false)
            this.$router.push({ name: 'meals' })
        }
    }
}
</script>
