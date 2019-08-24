<template>
  <div>
    <view-header :title="recipe.name" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <card class="bg-theme-black-2 mb-4" :title="`Ingredients (${ingredients.length})`">
          <macro-grid :items="ingredients" @selected="(ingredient) => $router.push({ name: 'view-ingredient', params: { ingredientId: ingredient.id } })"/>
        </card>
      </div>
      <macro-card class="self-start" :calories="recipe.calories" :protein="recipe.protein" :carbs="recipe.carbs" :fat="recipe.fat"/>
    </div>
    <confirm-modal
      v-if="showDeleteModal"
      header-text="Are you sure you want to delete this recipe?"
      sub-text="This is will modify any meals & days containing this recipe."
      @confirmed="deleteRecipe"
      @close="() => showDeleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import RecipeService from '@/services/recipe-service'
import RecipeIngredient from '@/models/RecipeIngredient'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/MacroCard'
import Card from '@/components/shared/Card'
import ConfirmModal from '@/components/shared/modals/ConfirmModal'
import MacroGrid from '@/components/shared/MacroGrid'

export default {
    name: 'view-recipe',
    components: { ViewHeader, MacroCard, MacroGrid, Card, ConfirmModal },
    props: {
        recipeId: {
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
                    handler: () => this.$router.push({ name: 'edit-recipe', params: { recipeId: this.recipeId } })
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
        breadCrumbs () {
            return [{ title: 'Recipes', route: 'recipes' }, { title: this.recipe.name, route: 'view-recipe', params: { id: this.recipeId } }]
        },
        ...mapGetters({
            getRecipe: 'getRecipe',
            ingredientsForRecipe: 'ingredientsForRecipe'
        }),
        recipe () {
            return this.getRecipe(this.recipeId)
        },
        ingredients () {
            return this.ingredientsForRecipe(this.recipeId).map((ingredient) => new RecipeIngredient(this.recipe, ingredient))
        }
    },
    created () {
        if (!this.recipe) { this.$router.replace({ name: 'recipes' }) }
    },
    methods: {
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        async deleteRecipe () {
            this.setDashboardLoading(true)
            await RecipeService.deleteRecipe(this.recipeId)
            this.setDashboardLoading(false)
            this.$router.push({ name: 'recipes' })
        }
    }
}
</script>
