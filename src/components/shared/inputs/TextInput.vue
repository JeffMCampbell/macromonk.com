<template>
  <input class="shadow appearance-none rounded py-1 px-2 bg-grey-darkest text-grey-lighter leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="internal">
</template>

<script>
export default {
    name: 'text-input',
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
