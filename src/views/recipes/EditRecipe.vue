<template>
  <div>
    <view-header :title="originalName" sub-title="Recipe" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <recipe-form save-text="Save Recipe" v-model="recipe" @save="save"/>
      <macro-card v-if="isDesktop" :calories="macros.calories" :protein="macros.protein" :carbs="macros.carbs" :fat="macros.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import MacroCalculator from '@/services/macro-calculator'
import ViewHeader from '@/components/shared/ViewHeader'
import RecipeForm from '@/components/recipes/RecipeForm'
import MacroCard from '@/components/shared/macro_items/MacroCard'

export default {
    name: 'edit-recipe',
    components: { ViewHeader, RecipeForm, MacroCard },
    props: {
        recipeId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            originalName: null,
            recipe: null
        }
    },
    computed: {
        ...mapGetters(['getRecipe', 'isDesktop']),
        breadCrumbs () {
            return [{ title: 'Recipes', route: 'recipes' }, { title: this.originalName, route: 'view-recipe', params: { id: this.recipeId } }, { title: 'Edit' }]
        },
        macros () {
            return MacroCalculator.forRecipe(this.recipe)
        }
    },
    created () {
        const recipe = this.getRecipe(this.recipeId)

        if (!recipe) {
            this.$router.replace({ name: 'recipes' })
            return
        }

        this.originalName = recipe.name
        this.recipe = cloneDeep(recipe)
    },
    methods: {
        ...mapMutations(['setDashboardLoading']),
        ...mapActions(['updateRecipe']),
        async save () {
            this.setDashboardLoading(true)
            await this.updateRecipe(this.recipe)
            this.$router.push({ name: 'view-recipe', params: { recipeId: this.recipeId } })
            this.setDashboardLoading(false)
        }
    }
}
</script>
