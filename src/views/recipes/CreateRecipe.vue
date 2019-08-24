<template>
  <div>
    <view-header title="New Recipe" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <recipe-form save-text="Create Recipe" v-model="recipe" @save="create"/>
      <macro-card v-if="isDesktop" :calories="macros.calories" :protein="macros.protein" :carbs="macros.carbs" :fat="macros.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MacroCalculator from '@/services/macro-calculator'
import RecipeService from '@/services/recipe-service'
import ViewHeader from '@/components/shared/ViewHeader'
import RecipeForm from '@/components/recipes/RecipeForm'
import MacroCard from '@/components/shared/MacroCard'

export default {
    name: 'create-recipe',
    components: { ViewHeader, RecipeForm, MacroCard },
    data () {
        return {
            breadCrumbs: [{ title: 'Recipes', route: 'recipes' }, { title: 'Create', route: 'create-recipe' }],
            recipe: {
                name: null,
                ingredients: {}
            }
        }
    },
    computed: {
        ...mapGetters({
            ingredients: 'processedIngredients',
            isDesktop: 'isDesktop'
        }),
        macros () {
            return MacroCalculator.forRecipe(this.recipe)
        }
    },
    methods: {
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        async create () {
            this.setDashboardLoading(true)
            const recipe = await RecipeService.addRecipe(this.recipe)
            this.$router.push({ name: 'view-recipe', params: { recipeId: recipe.id } })
            this.setDashboardLoading(false)
        }
    }
}
</script>
