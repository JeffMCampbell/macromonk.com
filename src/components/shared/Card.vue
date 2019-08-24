<template>
  <div class="w-full p-6">
    <label v-if="title" class="block text-white text-sm font-bold mb-6">{{ title }}</label>
    <slot/>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: null
        }
    }
}
</script>
