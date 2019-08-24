<template>
  <div>
    <view-header :title="original.name" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <ingredient-form save-text="Save Ingredient" v-model="ingredient" @save="save"/>
      <macro-card v-if="isDesktop" :calories="ingredient.calories" :protein="ingredient.protein" :carbs="ingredient.carbs" :fat="ingredient.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { cloneDeep } from 'lodash'
import IngredientService from '@/services/ingredient-service'
import ViewHeader from '@/components/shared/ViewHeader'
import IngredientForm from '@/components/ingredients/IngredientForm'
import MacroCard from '@/components/shared/MacroCard'

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
        ...mapGetters({
            getIngredient: 'getIngredient',
            isDesktop: 'isDesktop'
        }),
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
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        async save () {
            this.setDashboardLoading(true)
            await IngredientService.updateIngredient(this.ingredientId, this.ingredient)
            this.$router.push({ name: 'view-ingredient', params: { ingredientId: this.ingredientId } })
            this.setDashboardLoading(false)
        }
    }
}
</script>
