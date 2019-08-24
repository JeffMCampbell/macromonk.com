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
          <div class="bg-black text-white mb-4" v-for="ingredient in selectedIngredients" :key="ingredient.id">
            <div class="flex justify-between items-center p-4">
              <span class="flex-1 truncate text-base">{{ ingredient.name }}</span>
              <div class="flex-1 flex items-center justify-end">
                <number-input class="w-16 mr-2" v-model="ingredients[ingredient.id]" @input="update"/>
                <span class="text-sm mr-2">{{ ingredient.portionType }}</span>
                <delete-icon @click.native="deleteIngredient(ingredient)"/>
              </div>
            </div>
            <macro-bar :calories="(ingredient.calories / ingredient.portionAmount) * ingredients[ingredient.id]" :protein="(ingredient.protein / ingredient.portionAmount) * ingredients[ingredient.id]" :carbs="(ingredient.carbs / ingredient.portionAmount) * ingredients[ingredient.id]" :fat="(ingredient.fat / ingredient.portionAmount) * ingredients[ingredient.id]"/>
          </div>
          <div class="flex justify-center">
            <v-button background="bg-white" background-hover="hover:bg-grey-light" font-color="text-black" @click.native="showModal = true" :disabled="!availableIngredients.length">
              <add-icon class="text-black mr-1"/><span>Ingredient</span>
            </v-button>
          </div>
        </card>
        <v-button class="w-full" @click.native="() => $emit('save')" :disabled="!isValid">{{ saveText }}</v-button>
      </div>
    </div>
    <picker-modal v-if="showModal" title="Available Ingredients" search-text="gwegwg" :macro-models="availableIngredients" @select="selectIngredient" @close="showModal = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { has, omit, difference } from 'lodash'
import FormMixin from '@/mixins/form'
import Card from '@/components/shared/Card'
import MacroBar from '@/components/shared/MacroBar'
import TextInput from '@/components/shared/inputs/TextInput'
import VButton from '@/components/shared/Button'
import DeleteIcon from '@/components/shared/icons/DeleteIcon'
import AddIcon from '@/components/shared/icons/AddIcon'
import NumberInput from '@/components/shared/inputs/NumberInput'
import ValidationError from '@/components/shared/ValidationError'
import PickerModal from '@/components/shared/modals/PickerModal'

export default {
    name: 'recipe-form',
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
            showModal: false
        }
    },
    computed: {
        ...mapGetters({
            vuexIngredients: 'processedIngredients'
        }),
        isValid () {
            return this.formIsValid && this.selectedIngredients.length > 0
        },
        selectedIngredients () {
            return this.vuexIngredients.filter((ingredient) => has(this.ingredients, ingredient.id))
        },
        availableIngredients () {
            return difference(this.vuexIngredients, this.selectedIngredients)
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
            this.$emit('input', {
                name: this.name,
                ingredients: this.ingredients
            })
        }
    }
}
</script>
