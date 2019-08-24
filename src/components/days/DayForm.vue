<template>
  <div class="w-full">
    <div class="flex-1 self-start mr-2">
      <card class="bg-theme-black-2 mb-4">
        <label class="block text-white text-xs mb-4" for="name">Name *</label>
        <text-input class="w-full" v-model="name" placeholder="Name" name="name" v-validate="'required'" data-vv-delay="500"/>
        <validation-error class="mt-4" v-if="fieldHasError('name')" :error="getFieldError('name')"/>
        <label class="block text-white text-xs mt-8 mb-4" for="name">Meals *</label>
        <div class="bg-black text-white p-4 mb-4" v-for="(meal, index) in selectedMeals" :key="index">
          <div class="flex items-center mb-4">
            <span class="flex-1 truncate text-base mr-2">{{ meal.name }}</span>
            <delete-icon @click.native="deleteMeal(index)"/>
          </div>
          <macro-bar :calories="meal.calories" :protein="meal.protein" :carbs="meal.carbs" :fat="meal.fat"/>
        </div>
        <div class="flex justify-center">
          <v-button background="bg-white" background-hover="hover:bg-grey-light" font-color="text-black" @click.native="showModal = true" :disabled="!availableMeals.length">
            <add-icon class="text-black mr-1"/><span>Meal</span>
          </v-button>
        </div>
      </card>
      <v-button class="w-full" @click.native="() => $emit('save')" :disabled="!isValid">{{ saveText }}</v-button>
    </div>
    <picker-modal v-if="showModal" title="Available Meals" search-text="gwegwg" :macro-models="availableMeals" @select="selectMeal" @close="showModal = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { find } from 'lodash'
import FormMixin from '@/mixins/form'
import Card from '@/components/shared/Card'
import MacroBar from '@/components/shared/MacroBar'
import TextInput from '@/components/shared/inputs/TextInput'
import NumberInput from '@/components/shared/inputs/NumberInput'
import DeleteIcon from '@/components/shared/icons/DeleteIcon'
import AddIcon from '@/components/shared/icons/AddIcon'
import VButton from '@/components/shared/Button'
import ValidationError from '@/components/shared/ValidationError'
import PickerModal from '@/components/shared/modals/PickerModal'

export default {
    name: 'day-form',
    components: { MacroBar, NumberInput, TextInput, PickerModal, AddIcon, DeleteIcon, ValidationError, Card, VButton },
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
            meals: [],
            showModal: false
        }
    },
    computed: {
        ...mapGetters({
            processedMeals: 'processedMeals'
        }),
        selectedMeals () {
            return this.meals.map((mealId) => find(this.processedMeals, { id: mealId }))
        },
        availableMeals () {
            return this.processedMeals
        },
        isValid () {
            return this.formIsValid && this.selectedMeals.length > 0
        }
    },
    watch: {
        isValid: function () {
            this.$emit('validation', this.isValid)
        }
    },
    async created () {
        this.name = this.value.name
        this.meals = this.value.meals

        await this.validateForm()

        this.onFieldChanged(this.update)
    },
    methods: {
        selectMeal (meal) {
            this.meals.push(meal.id)
            this.update()
            this.showModal = false
        },
        deleteMeal (index) {
            this.meals.splice(index, 1)
            this.update()
        },
        update () {
            this.$emit('input', {
                name: this.name,
                meals: this.meals
            })
        }
    }
}
</script>
