<template>
  <input
    class="shadow appearance-none rounded py-2 px-3 bg-grey-darkest text-grey-lighter leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    ref="inputRef"
    :value="value"
    @keypress="onlyNumber"
    @input="updated">
</template>

<script>
// import { floor } from 'lodash'

export default {
    name: 'number-input',
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
            default: null
        },
        max: {
            type: Number,
            default: null
        }
    },
    methods: {
        updated ($event) {
            let value = $event.target.value

            const indexOfDecimal = value.indexOf('.')

            if (indexOfDecimal >= 0) {
                value = value.substring(0, indexOfDecimal) + value.substring(indexOfDecimal, indexOfDecimal + this.precision + 1)
            }

            const parsed = value

            if (isNaN(parsed) || parsed <= 0) {
                this.$emit('input', null)
                this.$refs.inputRef.value = ''
                return
            }

            this.$refs.inputRef.value = parsed
            this.$emit('input', parseFloat(parsed))
        },
        onlyNumber ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which)

            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                $event.preventDefault()
            }
        }
    }
}
</script>
