<template>
  <select class="shadow appearance-none rounded py-2 px-3 bg-grey-darkest text-grey-lighter leading-tight focus:outline-none focus:shadow-outline" v-model="internal">
    <option disabled :value="null">Please select one</option>
    <option v-for="portionType in portionTypes" :value="portionType.value" :key="portionType.value">
      {{ portionType.text }}
    </option>
  </select>
</template>

<script>
import portionTypes from '@/resources/portion-types'

export default {
    name: 'portion-type-select',
    props: {
        value: {
            validator: function (value) {
                return typeof value === 'string' || value === null
            },
            required: true
        }
    },
    data () {
        return {
            internal: null
        }
    },
    computed: {
        portionTypes () {
            return portionTypes
        }
    },
    watch: {
        internal () {
            this.$emit('input', this.internal)
        },
        value () {
            this.internal = this.value
        }
    },
    created () {
        this.internal = this.value
    }
}
</script>
