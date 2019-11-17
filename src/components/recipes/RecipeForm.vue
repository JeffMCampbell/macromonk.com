<template>
  <div class="w-full">
    <div class="flex">
      <div class="flex-1 self-start mr-2">
        <card class="bg-theme-black-2 mb-4" title="Basic Info">
          <label class="block text-white text-xs mb-4" for="name">Name *</label>
          <text-input class="w-full" v-model="name" placeholder="Recipe name..." name="name" v-validate="'required'" data-vv-delay="500"/>
          <validation-error class="mt-4" v-if="fieldHasError('name')" :error="getFieldError('name')"/>
        </card>
        <card class="bg-theme-black-2 mb-4" title="Ingredients">
          <macro-item-counter v-for="ingredient in selectedIngredients" :key="ingredient.id" v-model="ingredients[ingredient.id]" @input="update" :item="ingredient" @delete="deleteIngredient(ingredient)"/>
          <div class="flex justify-center">
            <add-button label="Ingredient" @click.native="showModal = true" :disabled="!availableIngredients.length"/>
          </div>
        </card>
        <v-button class="w-full" @click.native="() => $emit('save')" :disabled="!isValid">{{ saveText }}</v-button>
      </div>
    </div>
    <picker-modal v-if="showModal" title="Available Ingredients" search-text="Search Ingredeints..." :macro-models="availableIngredients" @select="selectIngredient" @close="showModal = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { has, omit, differenceBy } from 'lodash'
import FormMixin from '@/mixins/form'
import Recipe from '@/models/Recipe'
import RecipeIngredient from '@/models/RecipeIngredient'
import Card from '@/components/shared/Card'
import MacroBar from '@/components/shared/macro_items/MacroBar'
import TextInput from '@/components/shared/inputs/TextInput'
import AddButton from '@/components/shared/buttons/AddButton'
import VButton from '@/components/shared/Button'
import DeleteIcon from '@/components/shared/icons/DeleteIcon'
import AddIcon from '@/components/shared/icons/AddIcon'
import NumberInput from '@/components/shared/inputs/NumberInput'
import ValidationError from '@/components/shared/ValidationError'
import PickerModal from '@/components/shared/modals/PickerModal'
import MacroItemCounter from '@/components/shared/macro_items/MacroItemCounter'

export default {
    name: 'recipe-form',
    components: { MacroBar, NumberInput, TextInput, VButton, AddButton, ValidationError, Card, DeleteIcon, AddIcon, PickerModal, MacroItemCounter },
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
            showModal: false
        }
    },
    computed: {
        ...mapGetters({
            processedIngredients: 'processedIngredients'
        }),
        isValid () {
            return this.formIsValid && this.selectedIngredients.length > 0
        },
        selectedIngredients () {
            return this.processedIngredients.filter((ingredient) => has(this.ingredients, ingredient.id)).map((ingredient) => {
                return new RecipeIngredient(ingredient, new Recipe({
                    id: this.id,
                    name: this.name,
                    ingredients: this.ingredients
                }))
            })
        },
        availableIngredients () {
            return differenceBy(this.processedIngredients, this.selectedIngredients, ingredient => ingredient.id)
        }
    },
    async created () {
        this.id = this.value.id
        this.name = this.value.name
        this.ingredients = this.value.ingredients
        await this.validateForm()
        this.onFieldChanged(this.update)
    },
    methods: {
        selectIngredient (ingredient) {
            this.$set(this.ingredients, ingredient.id, ingredient.portionAmount)
            this.update()
            this.showModal = false
        },
        deleteIngredient (ingredient) {
            this.ingredients = omit(this.ingredients, ingredient.id)
            this.update()
        },
        update () {
            this.$emit('input', new Recipe({
                id: this.id,
                name: this.name,
                ingredients: this.ingredients
            }))
        }
    }
}
</script>
