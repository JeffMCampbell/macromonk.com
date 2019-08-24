<template>
  <input class="shadow appearance-none rounded py-2 px-3 bg-grey-darkest text-grey-lighter leading-tight focus:outline-none focus:shadow-outline mb-4" :type="type" v-model="internal">
</template>

<script>
export default {
    name: 'base-input',
    props: {
        value: {
            required: true
        },
        type: {
            type: String,
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
