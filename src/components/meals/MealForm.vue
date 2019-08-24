<template>
  <div class="w-full">
    <div class="flex-1 self-start mr-2">
      <card class="bg-theme-black-2 mb-4" title="Basic Info">
        <label class="block text-white text-xs mb-4" for="name">Name *</label>
        <text-input class="w-full" v-model="name" placeholder="Meal name..." name="name" v-validate="'required'" data-vv-delay="500"/>
        <validation-error class="mt-4" v-if="fieldHasError('name')" :error="getFieldError('name')"/>
      </card>
      <card class="bg-theme-black-2 mb-4" title="Ingredients">
        <div class="bg-black text-white mb-4" v-for="ingredient in selectedIngredients" :key="ingredient.id">
          <div class="flex justify-between items-center p-4">
            <span class="flex-1 truncate text-base">{{ ingredient.name }}</span>
            <div class="flex-1 flex items-center justify-end">
              <number-input class="w-16 mr-2" v-model="ingredients[ingredient.id]" @input="update"/>
              <span class="text-sm mr-2">{{ ingredient.portionType }}</span>
              <delete-icon @click.native="deleteIngredient(ingredient)"/>
            </div>
          </div>
          <macro-bar class="p-4" :calories="(ingredient.calories / ingredient.portionAmount) * ingredients[ingredient.id]" :protein="(ingredient.protein / ingredient.portionAmount) * ingredients[ingredient.id]" :carbs="(ingredient.carbs / ingredient.portionAmount) * ingredients[ingredient.id]" :fat="(ingredient.fat / ingredient.portionAmount) * ingredients[ingredient.id]"/>
        </div>
        <div class="flex justify-center">
          <v-button background="bg-white" background-hover="hover:bg-grey-light" font-color="text-black" @click.native="showIngredientModal = true" :disabled="!availableIngredients.length">
            <add-icon class="text-black mr-1"/><span>Ingredient</span>
          </v-button>
        </div>
      </card>
      <card class="bg-theme-black-2 mb-4" title="Recipes">
        <div class="bg-black text-white mb-4" v-for="recipe in selectedRecipes" :key="recipe.id">
          <div class="flex justify-between items-center p-4">
            <span class="flex-1 truncate text-base">{{ recipe.name }}</span>
            <div class="flex-1 flex items-center justify-end">
              <number-input class="w-16 mr-2" v-model="recipes[recipe.id]" @input="update"/>
              <delete-icon @click.native="deleteRecipe(recipe)"/>
            </div>
          </div>
          <macro-bar class="p-4" :calories="recipe.calories* recipes[recipe.id]" :protein="recipe.protein * recipes[recipe.id]" :carbs="recipe.carbs * recipes[recipe.id]" :fat="recipe.fat * recipes[recipe.id]"/>
        </div>
        <div class="flex justify-center">
          <v-button background="bg-white" background-hover="hover:bg-grey-light" font-color="text-black" @click.native="showRecipeModal = true" :disabled="!availableRecipes.length">
            <add-icon class="text-black mr-1"/><span>Recipe</span>
          </v-button>
        </div>
      </card>
      <v-button class="w-full" @click.native="() => $emit('save')" :disabled="!isValid">{{ saveText }}</v-button>
    </div>
    <picker-modal v-if="showIngredientModal" title="Available Ingredients" search-text="gwegwg" :macro-models="availableIngredients" @select="selectIngredient" @close="showIngredientModal = false"/>
    <picker-modal v-if="showRecipeModal" title="Available Recipes" search-text="gwegwg" :macro-models="availableRecipes" @select="selectRecipe" @close="showRecipeModal = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { has, omit, difference } from 'lodash'
import FormMixin from '@/mixins/form'
import MacroBar from '@/components/shared/MacroBar'
import Card from '@/components/shared/Card'
import TextInput from '@/components/shared/inputs/TextInput'
import VButton from '@/components/shared/Button'
import DeleteIcon from '@/components/shared/icons/DeleteIcon'
import AddIcon from '@/components/shared/icons/AddIcon'
import NumberInput from '@/components/shared/inputs/NumberInput'
import ValidationError from '@/components/shared/ValidationError'
import PickerModal from '@/components/shared/modals/PickerModal'

export default {
    name: 'meal-form',
    components: { MacroBar, NumberInput, TextInput, VButton, ValidationError, Card, DeleteIcon, AddIcon, PickerModal },
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
            return difference(this.processedIngredients, this.selectedIngredients)
        },
        availableRecipes () {
            return difference(this.processedRecipes, this.selectedRecipes)
        },
        selectedIngredients () {
            return this.processedIngredients.filter((ingredient) => has(this.ingredients, ingredient.id))
        },
        selectedRecipes () {
            return this.processedRecipes.filter((recipe) => has(this.recipes, recipe.id))
        }
    },
    watch: {
        isValid: function () {
            this.$emit('validation', this.isValid)
        }
    },
    async created () {
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
            this.$emit('input', {
                name: this.name,
                ingredients: this.ingredients,
                recipes: this.recipes
            })
        }
    }
}
</script>
