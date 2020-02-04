<template>
  <macro-item-list
    :bread-crumbs="breadCrumbs"
    title="Recipe List"
    :items="processedRecipes"
    search-placeholder="Search Recipes..."
    empty-text="You have no Recipes!"
    @newItem="createRecipe"
    @selectedItem="viewRecipe"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import MacroItemList from '@/components/shared/macro_items/MacroItemList'

export default {
    name: 'recipes',
    components: { MacroItemList },
    data () {
        return {
            breadCrumbs: [{ title: 'Recipes', route: 'recipes' }]
        }
    },
    computed: mapGetters(['processedRecipes']),
    methods: {
        createRecipe () {
            this.$router.push({ name: 'create-recipe' })
        },
        viewRecipe (recipe) {
            this.$router.push({ name: 'view-recipe', params: { recipeId: recipe.id } })
        }
    }
}
</script>
