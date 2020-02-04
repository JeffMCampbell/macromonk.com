<template>
  <div>
    <label class="block text-white text-xs mb-4" for="name">{{ label }}</label>
    <component
      :is="inputComponent"
      class="w-full"
      :value="value"
      @input="(newValue) => $emit('input', newValue)"
      :placeholder="placeholder"
      :name="name"
      :currency="currency"
    />
    <validation-error class="mt-4" v-if="validationError" :error="validationError"/>
  </div>
</template>

<script>
import { has } from 'lodash'
import ValidationError from '@/components/shared/ValidationError'
import TextInput from '@/components/shared/inputs/TextInput'
import NumberInput from '@/components/shared/inputs/NumberInput'
import PortionTypeSelect from '@/components/shared/inputs/PortionTypeSelect'

const INPUT_TYPES = {
    'text': 'text-input',
    'number': 'number-input',
    'portionType': 'portion-type-select'
}

export default {
    name: 'form-field',
    components: { TextInput, NumberInput, PortionTypeSelect, ValidationError },
    props: {
        value: {
            required: true
        },
        label: {
            type: String,
            required: true
        },
        inputType: {
            validator: function (value) {
                return has(INPUT_TYPES, value)
            },
            required: true
        },
        placeholder: {
            type: String,
            default: null
        },
        name: {
            type: String,
            required: true
        },
        validationError: {
            type: String,
            default: null
        },
        currency: {
            type: String,
            default: null
        }
    },
    computed: {
        inputComponent () {
            return INPUT_TYPES[this.inputType]
        }
    }
}
</script>
