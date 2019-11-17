<template>
  <div class="flex-1">
    <card class="bg-theme-black-2 mb-4" title="Basic Info">
      <label class="block text-white text-xs mb-4" for="name">Name *</label>
      <text-input class="w-full" v-model="name" placeholder="Name" name="name" v-validate="'required'" data-vv-delay="500"/>
      <validation-error class="mt-4" v-if="fieldHasError('name')" :error="getFieldError('name')"/>
      <div class="flex mt-4">
        <div class="flex-1">
          <label class="block text-white text-xs mb-4" for="name">Portion Amount *</label>
          <number-input class="w-full" placeholder="Portion amount..." name="portionAmount" v-model="portionAmount" :min="0.01" :max="10000" v-validate="'required'" data-vv-delay="500"/>
          <validation-error class="mt-4" v-if="fieldHasError('portionAmount')" :error="getFieldError('portionAmount')"/>
        </div>
        <div class="flex-1 ml-4">
          <label class="block text-white text-xs mb-4" for="name">Portion Type *</label>
          <portion-type-select class="w-full" name="portionType" v-model="portionType" v-validate="'required'" data-vv-delay="500"/>
          <validation-error class="mt-4" v-if="fieldHasError('portionType')" :error="getFieldError('portionType')"/>
        </div>
      </div>
      <div class="flex mt-4">
        <div class="flex-1">
          <label class="block text-white text-xs mb-4" for="name">Calories (kCal) *</label>
          <number-input class="w-full" placeholder="Calories..." name="calories" v-model="calories" :min="0" :max="10000" v-validate="'required'" data-vv-delay="500"/>
          <validation-error class="mt-4" v-if="fieldHasError('calories')" :error="getFieldError('calories')"/>
        </div>
        <div class="flex-1 ml-4">
          <label class="block text-white text-xs mb-4" for="name">Protein (g) *</label>
          <number-input class="w-full" placeholder="Protein..." name="protein" v-model="protein" :min="0" :max="10000" v-validate="'required'" data-vv-delay="500"/>
          <validation-error class="mt-4" v-if="fieldHasError('protein')" :error="getFieldError('protein')"/>
        </div>
      </div>
      <div class="flex mt-4">
        <div class="flex-1">
          <label class="block text-white text-xs mb-4" for="name">Carbs (g) *</label>
          <number-input class="w-full" placeholder="Carbs..." name="carbs" v-model="carbs" :min="0" :max="10000" v-validate="'required'" data-vv-delay="500"/>
          <validation-error class="mt-4" v-if="fieldHasError('carbs')" :error="getFieldError('carbs')"/>
        </div>
        <div class="flex-1 ml-4">
          <label class="block text-white text-xs mb-4" for="name">Fat (g) *</label>
          <number-input class="w-full" placeholder="Fat..." name="fat" v-model="fat" :min="0" :max="10000" v-validate="'required'" data-vv-delay="500"/>
          <validation-error class="mt-4" v-if="fieldHasError('fat')" :error="getFieldError('fat')"/>
        </div>
      </div>
    </card>
    <v-button class="w-full" @click.native="() => $emit('save')" :disabled="!isFormValid">{{ saveText }}</v-button>
  </div>
</template>

<script>
import FormMixin from '@/mixins/form'
import Ingredient from '@/models/Ingredient'
import Card from '@/components/shared/Card'
import TextInput from '@/components/shared/inputs/TextInput'
import NumberInput from '@/components/shared/inputs/NumberInput'
import PortionTypeSelect from '@/components/shared/inputs/PortionTypeSelect'
import VButton from '@/components/shared/Button'
import ValidationError from '@/components/shared/ValidationError'


export default {
    name: 'ingredient-form',
    components: { NumberInput, TextInput, PortionTypeSelect, ValidationError, Card, VButton },
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
            portionAmount: 1,
            portionType: null,
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        }
    },
    async created () {
        this.id = this.value.id
        this.name = this.value.name
        this.portionAmount = this.value.portionAmount
        this.portionType = this.value.portionType
        this.calories = this.value.calories
        this.protein = this.value.protein
        this.carbs = this.value.carbs
        this.fat = this.value.fat

        await this.validateForm()

        this.onFieldChanged(this.update)
    },
    methods: {
        update () {
            this.$emit('input', new Ingredient({
                id: this.id,
                name: this.name,
                portionAmount: this.portionAmount,
                portionType: this.portionType,
                calories: this.calories,
                protein: this.protein,
                carbs: this.carbs,
                fat: this.fat
            }))
        }
    }
}
</script>
