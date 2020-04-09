<template>
  <div>
    <view-header :title="meal.name" sub-title="Meal" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <macro-grid-card
          :title="`Ingredients (${ingredients.length})`"
          tool-tip="Ingredients within this meal and the macros each ingredient makes up within this meal."
          :items="ingredients"
          @selected="(ingredient) => $router.push({ name: 'view-ingredient', params: { ingredientId: ingredient.id } })"
          empty-text="Meal has no ingredients."
        />
        <macro-grid-card
          :title="`Recipes (${recipes.length})`"
          tool-tip="Recipes within this meal and the macros each recipe makes up within this meal."
          :items="recipes"
          @selected="(recipe) => $router.push({ name: 'view-recipe', params: { recipeId: recipe.id } })"
          empty-text="Meal has no recipes."
        />
      </div>
      <macro-card class="self-start" :calories="meal.calories" :protein="meal.protein" :carbs="meal.carbs" :fat="meal.fat"/>
    </div>
    <confirm-modal
      v-if="showDeleteModal"
      header-text="Are you sure you want to delete this meal?"
      @confirmed="deleteConfirmed"
      @close="() => showDeleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MealIngredient from '@/models/MealIngredient'
import MealRecipe from '@/models/MealRecipe'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/macro_items/MacroCard'
import MacroGridCard from '@/components/shared/macro_items/MacroGridCard'
import ConfirmModal from '@/components/shared/modals/ConfirmModal'

export default {
    name: 'view-meal',
    components: { ViewHeader, MacroCard, MacroGridCard, ConfirmModal },
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
        ...mapGetters(['getMeal', 'ingredientsForMeal', 'recipesForMeal']),
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
        ...mapActions(['deleteMeal']),
        async deleteConfirmed () {
            await this.deleteMeal(this.mealId)
            this.$router.push({ name: 'meals' })
        }
    }
}
</script>
