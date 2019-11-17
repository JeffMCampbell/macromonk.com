<template>
  <vue-numeric
    class="shadow appearance-none rounded py-2 px-3 bg-grey-darkest text-grey-lighter leading-tight focus:outline-none focus:shadow-outline"
    separator=","
    :empty-value="0"
    :precision="precision"
    :min="min"
    :max="max"
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
        }
    }
}
</script>
