<template>
  <div class="w-full">
    <div class="flex-1 self-start mr-2">
      <card class="bg-theme-black-2 mb-4" title="Basic Info">
        <form-field input-type="text" v-model="name" label="Name *" placeholder="Meal name..." name="name" :validation-error="getFieldError('name')" v-validate="'required'" data-vv-delay="500"/>
      </card>
      <card class="bg-theme-black-2 mb-4" title="Ingredients">
        <macro-item-counter class="mb-4" v-for="ingredient in selectedIngredients" :key="ingredient.id" v-model="ingredients[ingredient.id]" @input="update" :item="ingredient" @delete="deleteIngredient(ingredient)"/>
        <div class="flex justify-center">
          <add-button label="Recipe" @click.native="showIngredientModal = true" :disabled="!availableIngredients.length"/>
        </div>
      </card>
      <card class="bg-theme-black-2 mb-4" title="Recipes">
        <macro-item-counter class="mb-4" v-for="recipe in selectedRecipes" :key="recipe.id" v-model="recipes[recipe.id]" @input="update" :item="recipe" @delete="deleteRecipe(recipe)"/>
        <div class="flex justify-center">
          <add-button label="Recipe" @click.native="showRecipeModal = true" :disabled="!availableRecipes.length"/>
        </div>
      </card>
      <v-button class="w-full" @click.native="() => $emit('save')" :disabled="!isValid">{{ saveText }}</v-button>
    </div>
    <picker-modal v-if="showIngredientModal" title="Available Ingredients" search-text="Search Ingredients..." :macro-models="availableIngredients" @select="selectIngredient" @close="showIngredientModal = false"/>
    <picker-modal v-if="showRecipeModal" title="Available Recipes" search-text="Search Recipes..." :macro-models="availableRecipes" @select="selectRecipe" @close="showRecipeModal = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { has, omit, differenceBy } from 'lodash'
import FormMixin from '@/mixins/form'
import Meal from '@/models/Meal'
import MealIngredient from '@/models/MealIngredient'
import MealRecipe from '@/models/MealRecipe'
import Card from '@/components/shared/Card'
import FormField from '@/components/shared/forms/FormField'
import AddButton from '@/components/shared/buttons/AddButton'
import VButton from '@/components/shared/Button'
import PickerModal from '@/components/shared/modals/PickerModal'
import MacroItemCounter from '@/components/shared/macro_items/MacroItemCounter'

export default {
    name: 'meal-form',
    components: { FormField, AddButton, VButton, Card, PickerModal, MacroItemCounter },
    mixins: [ FormMixin ],
    props: {
        value: {
            type: Object,
            required: true
        },
        saveText: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            id: null,
            name: null,
            ingredients: {},
            recipes: {},
            showIngredientModal: false,
            showRecipeModal: false
        }
    },
    computed: {
        ...mapGetters({
            processedIngredients: 'processedIngredients',
            processedRecipes: 'processedRecipes'
        }),
        isValid () {
            return this.formIsValid && (this.selectedIngredients.length > 0 || this.selectedRecipes.length > 0)
        },
        availableIngredients () {
            return differenceBy(this.processedIngredients, this.selectedIngredients, ingredient => ingredient.id)
        },
        availableRecipes () {
            return differenceBy(this.processedRecipes, this.selectedRecipes, recipe => recipe.id)
        },
        selectedIngredients () {
            return this.processedIngredients.filter((ingredient) => has(this.ingredients, ingredient.id)).map((ingredient) => {
                return new MealIngredient(ingredient, new Meal({
                    id: this.id,
                    name: this.name,
                    ingredients: this.ingredients,
                    recipes: this.recipes
                }))
            })
        },
        selectedRecipes () {
            return this.processedRecipes.filter((recipe) => has(this.recipes, recipe.id)).map((recipe) => {
                return new MealRecipe(recipe, new Meal({
                    id: this.id,
                    name: this.name,
                    ingredients: this.ingredients,
                    recipes: this.recipes
                }))
            })
        }
    },
    watch: {
        isValid: function () {
            this.$emit('validation', this.isValid)
        }
    },
    async created () {
        this.id = this.value.id
        this.name = this.value.name
        this.ingredients = this.value.ingredients
        this.recipes = this.value.recipes

        await this.validateForm()

        this.onFieldChanged(this.update)
    },
    methods: {
        selectIngredient (ingredient) {
            this.$set(this.ingredients, ingredient.id, ingredient.portionAmount)
            this.update()
            this.showIngredientModal = false
        },
        deleteIngredient (ingredient) {
            this.ingredients = omit(this.ingredients, ingredient.id)
            this.update()
        },
        selectRecipe (recipe) {
            this.$set(this.recipes, recipe.id, 1)
            this.update()
            this.showRecipeModal = false
        },
        deleteRecipe (recipe) {
            this.recipes = omit(this.recipes, recipe.id)
            this.update()
        },
        update () {
            this.$emit('input', new Meal({
                id: this.id,
                name: this.name,
                ingredients: this.ingredients,
                recipes: this.recipes
            }))
        }
    }
}
</script>
