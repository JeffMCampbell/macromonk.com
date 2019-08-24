<template>
  <p class="text-green text-sm italic">{{ message }}</p>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        }
    }
}
</script>
