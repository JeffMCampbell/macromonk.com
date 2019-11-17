<template>
  <div>
    <view-header :title="ingredient.name" sub-title="Ingredient" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <card class="bg-theme-black-2 mb-4" title="Portion">
          <div class="text-white text-base">{{ ingredient.portionAmount }} {{ ingredient.portionType }}</div>
        </card>
        <macro-grid-card
          :title="`Contained in Recipes (${recipes.length})`"
          tool-tip="Recipes that contain this ingredient and the macros this ingredient makes up within that recipe."
          :items="recipes"
          @selected="(recipe) => $router.push({ name: 'view-recipe', params: { recipeId: recipe.id } })"
          empty-text="Ingredient is not in any recipes."
        />
        <macro-grid-card
          :title="`Contained in Meals (${meals.length})`"
          tool-tip="Meals that contain this ingredient and the macros this ingredient makes up within that meal."
          :items="meals"
          @selected="(meal) => $router.push({ name: 'view-meal', params: { mealId: meal.id } })"
          empty-text="Ingredient is not in any meals."
        />
        <macro-grid-card
          :title="`Contained in Days (${days.length})`"
          tool-tip="Days that contain this ingredient and the macros this ingredient makes up within that day."
          :items="days"
          @selected="(day) => $router.push({ name: 'view-day', params: { dayId: day.id } })"
          empty-text="Ingredient is not in any days."
        />
      </div>
      <macro-card class="self-start" :calories="ingredient.calories" :protein="ingredient.protein" :carbs="ingredient.carbs" :fat="ingredient.fat"/>
    </div>
    <confirm-modal
      v-if="showDeleteModal"
      header-text="Are you sure you want to delete this ingredient?"
      sub-text="This is will modify any recipes, meals & days containing this ingredient."
      @confirmed="deleteConfirmed"
      @close="() => showDeleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import IngredientRecipe from '@/models/IngredientRecipe'
import IngredientMeal from '@/models/IngredientMeal'
import IngredientDay from '@/models/IngredientDay'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/macro_items/MacroCard'
import MacroGridCard from '@/components/shared/macro_items/MacroGridCard'
import Card from '@/components/shared/Card'
import ConfirmModal from '@/components/shared/modals/ConfirmModal'
import MacroGrid from '@/components/shared/macro_items/MacroGrid'

export default {
    name: 'view-ingredient',
    components: { ViewHeader, MacroCard, Card, ConfirmModal, MacroGrid, MacroGridCard },
    props: {
        ingredientId: {
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
                    handler: () => this.$router.push({ name: 'edit-ingredient', params: { ingredientId: this.ingredientId } })
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
        ...mapGetters(['getIngredient', 'recipesForIngredient', 'mealsForIngredientIncludingRecipes', 'daysForIngredient']),
        ingredient () {
            return this.getIngredient(this.ingredientId)
        },
        recipes () {
            return this.recipesForIngredient(this.ingredientId).map((recipe) => new IngredientRecipe(this.ingredient, recipe))
        },
        meals () {
            return this.mealsForIngredientIncludingRecipes(this.ingredientId).map((meal) => new IngredientMeal(this.ingredient, meal))
        },
        days () {
            return this.daysForIngredient(this.ingredientId).map((day) => new IngredientDay(this.ingredient, day))
        },
        breadCrumbs () {
            return [{ title: 'Ingredients', route: 'ingredients' }, { title: this.ingredient.name, route: 'view-ingredient', params: { id: this.ingredientId } }]
        }
    },
    created () {
        if (!this.ingredient) this.$router.replace({ name: 'ingredients' })
    },
    methods: {
        ...mapMutations(['setDashboardLoading']),
        ...mapActions(['deleteIngredient']),
        async deleteConfirmed () {
            this.setDashboardLoading(true)
            await this.deleteIngredient(this.ingredientId)
            this.setDashboardLoading(false)
            this.$router.push({ name: 'ingredients' })
        }
    }
}
</script>
