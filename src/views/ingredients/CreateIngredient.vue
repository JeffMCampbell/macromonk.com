<template>
  <div>
    <view-header title="New Ingredient" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <ingredient-form save-text="Create Ingredient" v-model="ingredient" @save="create"/>
      <macro-card v-if="isDesktop" :calories="ingredient.calories" :protein="ingredient.protein" :carbs="ingredient.carbs" :fat="ingredient.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ViewHeader from '@/components/shared/ViewHeader'
import IngredientForm from '@/components/ingredients/IngredientForm'
import MacroCard from '@/components/shared/macro_items/MacroCard'

export default {
    name: 'create-ingredient',
    components: { ViewHeader, IngredientForm, MacroCard },
    data () {
        return {
            breadCrumbs: [{ title: 'Ingredients', route: 'ingredients' }, { title: 'Create', route: 'create-ingredient' }],
            ingredient: {
                name: null,
                portionAmount: 1,
                portionType: null,
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0
            }
        }
    },
    computed: mapGetters(['isDesktop']),
    methods: {
        ...mapActions(['createIngredient']),
        async create () {
            const ingredient = await this.createIngredient(this.ingredient)
            this.$router.push({ name: 'view-ingredient', params: { ingredientId: ingredient.id } })
        }
    }
}
</script>
