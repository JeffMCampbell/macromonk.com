<template>
  <base-input type="password" :value="value" @input="update" />
</template>

<script>
import BaseInput from '@/components/shared/inputs/BaseInput'

export default {
    name: 'password-input',
    components: { BaseInput },
    props: {
        value: {
            validator: function (value) {
                return typeof value === 'string' || value === null
            },
            required: true
        }
    },
    methods: {
        update (value) {
            this.$emit('input', value)
        }
    }
}
</script>
