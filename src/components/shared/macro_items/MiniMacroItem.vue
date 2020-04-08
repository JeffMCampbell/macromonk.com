<template>
  <div class="bg-black text-white p-4">
    mini {{ item }}
  </div>
</template>

<script>
export default {
    name: 'mini-macro-item',
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>
