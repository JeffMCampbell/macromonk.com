<template>
  <vue-numeric
    class="bg-grey-darkest shadow appearance-none rounded py-1 px-2 text-grey-lighter leading-tight focus:outline-none focus:shadow-outline"
    separator=","
    :empty-value="0"
    :precision="precision"
    :min="min"
    :max="max"
    :currency="currency"
    :currency-symbol-position="currencySymbolPosition"
    :value="value"
    @input="newValue => $emit('input', newValue)"
  />
</template>

<script>
import VueNumeric from 'vue-numeric'

export default {
    name: 'number-input',
    components: {
        VueNumeric
    },
    props: {
        value: { type: null, default: null },
        precision: {
            type: Number,
            default: 2
        },
        increment: {
            type: Number,
            default: 0.01
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100000
        },
        currency: {
            type: String,
            default: null
        },
        currencySymbolPosition: {
            type: String,
            default: 'suffix'
        }
    }
}
</script>
