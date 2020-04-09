<template>
  <div>
    <view-header :title="original.name" sub-title="Ingredient" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <ingredient-form save-text="Save Ingredient" v-model="ingredient" @save="save"/>
      <macro-card v-if="isDesktop" :calories="ingredient.calories" :protein="ingredient.protein" :carbs="ingredient.carbs" :fat="ingredient.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import ViewHeader from '@/components/shared/ViewHeader'
import IngredientForm from '@/components/ingredients/IngredientForm'
import MacroCard from '@/components/shared/macro_items/MacroCard'

export default {
    name: 'edit-ingredient',
    components: { ViewHeader, IngredientForm, MacroCard },
    props: {
        ingredientId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            original: null,
            ingredient: null
        }
    },
    computed: {
        ...mapGetters(['getIngredient', 'isDesktop']),
        breadCrumbs () {
            return [{ title: 'Ingredients', route: 'ingredients' }, { title: this.original.name, route: 'view-ingredient', params: { id: this.ingredientId } }, { title: 'Edit', route: 'edit-ingredient', params: { id: this.ingredientId } }]
        }
    },
    created () {
        const ingredient = this.getIngredient(this.ingredientId)

        if (!ingredient) {
            this.$router.replace({ name: 'ingredients' })
            return
        }

        this.original = cloneDeep(ingredient)
        this.ingredient = cloneDeep(ingredient)
    },
    methods: {
        ...mapActions(['updateIngredient']),
        async save () {
            await this.updateIngredient(this.ingredient)
            this.$router.push({ name: 'view-ingredient', params: { ingredientId: this.ingredientId } })
        }
    }
}
</script>
