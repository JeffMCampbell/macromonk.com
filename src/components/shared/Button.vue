<template>
  <button
    class="inline-flex flex items-center justify-center font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
    :class="classes"
    type="button"
    :disabled="disabled">
    <slot/>
  </button>
</template>

<script>
export default {
    props: {
        disabled: {
            default: false,
            type: Boolean
        },
        borderColor: {
            default: 'border-black',
            type: String
        },
        background: {
            default: 'bg-blue',
            type: String
        },
        backgroundHover: {
            default: 'hover:bg-blue-dark',
            type: String
        },
        fontColor: {
            default: 'text-white',
            type: String
        }
    },
    computed: {
        classes () {
            return {
                'cursor-not-allowed': this.disabled,
                'opacity-50': this.disabled,
                [this.background]: true,
                [this.backgroundHover]: true,
                [this.fontColor]: true,
                [this.borderColor]: true
            }
        }
    }
}
</script>
