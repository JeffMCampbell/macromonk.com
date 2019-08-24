<template>
  <p class="text-red text-sm italic">{{ error }}</p>
</template>

<script>
export default {
    props: {
        error: {
            type: String,
            required: true
        }
    }
}
</script>
