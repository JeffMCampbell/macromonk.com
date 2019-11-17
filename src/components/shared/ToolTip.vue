<template>
  <div class="relative">
    <div @mouseover="showToolTip = true" @mouseleave="showToolTip = false">
      <slot/>
    </div>
    <div class="absolute pin-r w-64 bg-grey-darkest p-2 text-sm text-white" v-if="showToolTip">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: false,
            default: null
        }
    },
    data () {
        return {
            showToolTip: false
        }
    }
}
</script>
