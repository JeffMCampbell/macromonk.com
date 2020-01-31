<template>
  <div class="flex-1">
    <card class="bg-theme-black-2 mb-4" title="Basic Info">
      <form-field input-type="text" v-model="name" label="Name *" placeholder="Name" name="name" :validation-error="getFieldError('name')" v-validate="'required'" data-vv-delay="500"/>
      <div class="flex mt-4">
        <div class="flex-1">
          <form-field input-type="number" v-model="portionAmount" label="Portion Amount *" name="portionAmount" :validation-error="getFieldError('portionAmount')" v-validate="'required'" data-vv-delay="500"/>
        </div>
        <div class="flex-1 ml-4">
          <form-field input-type="portionType" v-model="portionType" label="Portion Type *" name="portionType" :validation-error="getFieldError('portionType')" v-validate="'required'" data-vv-delay="500"/>
        </div>
      </div>
      <div class="flex mt-4">
        <div class="flex-1">
          <form-field input-type="number" v-model="calories" label="Calories (kCal) *" name="calories" :validation-error="getFieldError('calories')" v-validate="'required'" data-vv-delay="500"/>
        </div>
        <div class="flex-1 ml-4">
          <form-field input-type="number" v-model="protein" label="Protein (g) *" name="protein" :validation-error="getFieldError('protein')" v-validate="'required'" data-vv-delay="500"/>
        </div>
      </div>
      <div class="flex mt-4">
        <div class="flex-1">
          <form-field input-type="number" v-model="carbs" label="Carbs *" name="carbs" :validation-error="getFieldError('carbs')" v-validate="'required'" data-vv-delay="500"/>
        </div>
        <div class="flex-1 ml-4">
          <form-field input-type="number" v-model="fat" label="Fat *" name="fat" :validation-error="getFieldError('fat')" v-validate="'required'" data-vv-delay="500"/>
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
import VButton from '@/components/shared/Button'
import FormField from '@/components/shared/forms/FormField'

export default {
    name: 'ingredient-form',
    components: { Card, VButton, FormField },
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
