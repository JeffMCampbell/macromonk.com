<template>
  <div>
    <view-header :title="recipe.name" sub-title="Recipe" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row  items-start">
      <card class="bg-theme-color-2" :title="`Ingredients (${ingredients.length})`">
        <mini-macro-item class="mb-4" v-for="ingredient in ingredients" :key="ingredient.id" :item="ingredient"/>
      </card>
      <!-- <div class="flex-1">
        <macro-grid-card
          tool-tip="Ingredients with this recipe and the macros each ingredient makes up within that recipe."
          :items="ingredients"
          @selected="(ingredient) => $router.push({ name: 'view-ingredient', params: { ingredientId: ingredient.id } })"
          empty-text="Recipe has no ingredients."
        />
      </div> -->
      <macro-card class="self-start" :calories="recipe.calories" :protein="recipe.protein" :carbs="recipe.carbs" :fat="recipe.fat"/>
    </div>
    <confirm-modal
      v-if="showDeleteModal"
      header-text="Are you sure you want to delete this recipe?"
      sub-text="This is will modify any meals containing this recipe."
      @confirmed="deleteConfirmed"
      @close="() => showDeleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RecipeIngredient from '@/models/RecipeIngredient'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/macro_items/MacroCard'
import ConfirmModal from '@/components/shared/modals/ConfirmModal'
import MiniMacroItem from '@/components/shared/macro_items/MiniMacroItem'
import Card from '@/components/shared/Card'

export default {
    name: 'view-recipe',
    components: { ViewHeader, MacroCard, MiniMacroItem, ConfirmModal, Card },
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
        ...mapActions(['deleteRecipe']),
        async deleteConfirmed () {
            await this.deleteRecipe(this.recipeId)
            this.$router.push({ name: 'recipes' })
        }
    }
}
</script>
