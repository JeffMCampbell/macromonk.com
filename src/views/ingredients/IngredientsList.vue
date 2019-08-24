<template>
  <div>
    <view-header :bread-crumbs="breadCrumbs"/>
    <table-header v-model="search" search-placeholder="Search Ingredients..." @newItem="createIngredient"/>
    <macro-grid :items="filteredIngredients" @selected="viewIngredient" v-if="filteredIngredients.length"/>
    <div class="text-white text-xl text-center mt-16" v-else>You have no Ingredients!</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { includes } from 'lodash'
import ViewHeader from '@/components/shared/ViewHeader'
import TableHeader from '@/components/shared/TableHeader'
import MacroGrid from '@/components/shared/MacroGrid'

export default {
    name: 'ingredients',
    components: { ViewHeader, TableHeader, MacroGrid },
    data () {
        return {
            breadCrumbs: [{ title: 'Ingredients', route: 'ingredients' }],
            search: ''
        }
    },
    computed: {
        ...mapGetters({
            ingredients: 'processedIngredients'
        }),
        filteredIngredients () {
            return this.search ? this.ingredients.filter((ingredient) => includes(ingredient.name, this.search)) : this.ingredients
        }
    },
    methods: {
        createIngredient () {
            this.$router.push({ name: 'create-ingredient' })
        },
        viewIngredient (ingredient) {
            this.$router.push({ name: 'view-ingredient', params: { ingredientId: ingredient.id } })
        }
    }
}
</script>
