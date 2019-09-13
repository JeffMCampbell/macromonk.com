<template>
  <div>
    <view-header :title="ingredient.name" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <card class="bg-theme-black-2 mb-4" title="Portion">
          <div class="text-white text-base">{{ ingredient.portionAmount }} {{ ingredient.portionType }}</div>
        </card>
        <card class="bg-theme-black-2 mb-4" :title="`Contained in Recipes (${recipes.length})`">
          <macro-grid :items="recipes" @selected="(recipe) => $router.push({ name: 'view-recipe', params: { recipeId: recipe.id } })" v-if="recipes.length"/>
          <div class="text-white text-center text-sm italic" v-else>Ingredient is not in any recipes.</div>
        </card>
        <card class="bg-theme-black-2 mb-4" :title="`Contained in Meals (${meals.length})`">
          <macro-grid :items="meals" @selected="(meal) => $router.push({ name: 'view-meal', params: { mealId: meal.id } })" v-if="meals.length"/>
          <div class="text-white text-center text-sm italic" v-else>Ingredient is not in any meals.</div>
        </card>
        <card class="bg-theme-black-2 mb-4" :title="`Contained in Days (${days.length})`">
          <macro-grid :items="days" @selected="(day) => $router.push({ name: 'view-day', params: { dayId: day.id } })" v-if="days.length"/>
          <div class="text-white text-center text-sm italic" v-else>Ingredient is not in any days.</div>
        </card>
      </div>
      <macro-card class="self-start" :calories="ingredient.calories" :protein="ingredient.protein" :carbs="ingredient.carbs" :fat="ingredient.fat"/>
    </div>
    <confirm-modal
      v-if="showDeleteModal"
      header-text="Are you sure you want to delete this ingredient?"
      sub-text="This is will modify any recipes, meals & days containing this ingredient."
      @confirmed="deleteIngredient"
      @close="() => showDeleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import IngredientService from '@/services/ingredient-service'
import IngredientRecipe from '@/models/IngredientRecipe'
import IngredientMeal from '@/models/IngredientMeal'
import IngredientDay from '@/models/IngredientDay'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/MacroCard'
import Card from '@/components/shared/Card'
import ConfirmModal from '@/components/shared/modals/ConfirmModal'
import MacroGrid from '@/components/shared/MacroGrid'

export default {
    name: 'view-ingredient',
    components: { ViewHeader, MacroCard, Card, ConfirmModal, MacroGrid },
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
        ...mapGetters({
            getIngredient: 'getIngredient',
            recipesForIngredient: 'recipesForIngredient',
            mealsForIngredientIncludingRecipes: 'mealsForIngredientIncludingRecipes',
            daysForIngredient: 'daysForIngredient'
        }),
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
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        async deleteIngredient () {
            this.setDashboardLoading(true)
            await IngredientService.deleteIngredient(this.ingredientId)
            this.setDashboardLoading(false)
            this.$router.push({ name: 'ingredients' })
        }
    }
}
</script>
