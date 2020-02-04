<template>
  <macro-item-list
    :bread-crumbs="breadCrumbs"
    :items="processedIngredients"
    search-placeholder="Search Ingredients..."
    empty-text="You have no Ingredients!"
    @newItem="createIngredient"
    @selectedItem="viewIngredient"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import MacroItemList from '@/components/shared/macro_items/MacroItemList'

export default {
    name: 'ingredients',
    components: { MacroItemList },
    data () {
        return {
            breadCrumbs: [{ title: 'Ingredients', route: 'ingredients' }]
        }
    },
    computed: mapGetters(['processedIngredients']),
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
