<template>
  <div>
    <view-header :bread-crumbs="breadCrumbs"/>
    <table-header v-model="search" search-placeholder="Search Recipes..." @newItem="createRecipe"/>
    <macro-grid :items="filteredRecipes" @selected="viewRecipe" v-if="filteredRecipes.length"/>
    <div class="text-white text-xl text-center mt-16" v-else>You have no Recipes!</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { includes } from 'lodash'
import ViewHeader from '@/components/shared/ViewHeader'
import TableHeader from '@/components/shared/TableHeader'
import MacroGrid from '@/components/shared/macro_items/MacroGrid'

export default {
    name: 'recipes',
    components: { ViewHeader, TableHeader, MacroGrid },
    data () {
        return {
            breadCrumbs: [{ title: 'Recipes', route: 'recipes' }],
            search: ''
        }
    },
    computed: {
        ...mapGetters({
            recipes: 'processedRecipes'
        }),
        filteredRecipes () {
            return this.search ? this.recipes.filter((recipe) => includes(recipe.name, this.search)) : this.recipes
        }
    },
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
