<template>
  <div>
    <view-header :title="recipe.name" sub-title="Recipe" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <macro-grid-card
          :title="`Ingredients (${ingredients.length})`"
          tool-tip="Ingredients with this recipe and the macros each ingredient makes up within that recipe."
          :items="ingredients"
          @selected="(ingredient) => $router.push({ name: 'view-ingredient', params: { ingredientId: ingredient.id } })"
          empty-text="Recipe has no ingredients."
        />
      </div>
      <macro-card class="self-start" :calories="recipe.calories" :protein="recipe.protein" :carbs="recipe.carbs" :fat="recipe.fat"/>
    </div>
    <confirm-modal
      v-if="showDeleteModal"
      header-text="Are you sure you want to delete this recipe?"
      sub-text="This is will modify any meals & days containing this recipe."
      @confirmed="deleteConfirmed"
      @close="() => showDeleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import RecipeIngredient from '@/models/RecipeIngredient'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/macro_items/MacroCard'
import ConfirmModal from '@/components/shared/modals/ConfirmModal'
import MacroGridCard from '@/components/shared/macro_items/MacroGridCard'

export default {
    name: 'view-recipe',
    components: { ViewHeader, MacroCard, MacroGridCard, ConfirmModal },
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
        ...mapGetters(['getRecipe', 'ingredientsForRecipe']),
        recipe () {
            return this.getRecipe(this.recipeId)
        },
        ingredients () {
            return this.ingredientsForRecipe(this.recipeId).map((ingredient) => new RecipeIngredient(ingredient, this.recipe))
        },
        breadCrumbs () {
            return [{ title: 'Recipes', route: 'recipes' }, { title: this.recipe.name, route: 'view-recipe', params: { id: this.recipeId } }]
        }
    },
    created () {
        if (!this.recipe) { this.$router.replace({ name: 'recipes' }) }
    },
    methods: {
        ...mapMutations(['setDashboardLoading']),
        ...mapActions(['deleteRecipe']),
        async deleteConfirmed () {
            this.setDashboardLoading(true)
            await this.deleteRecipe(this.recipeId)
            this.setDashboardLoading(false)
            this.$router.push({ name: 'recipes' })
        }
    }
}
</script>
