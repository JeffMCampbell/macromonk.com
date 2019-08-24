<template>
  <div class="grid">
    <card class="bg-black text-white cursor-pointer mb-4" :title="item.fullName" v-for="(item, index) in items" :key="index" @click.native="$emit('selected', item)">
      <macro-bar :calories="item.calories" :protein="item.protein" :carbs="item.carbs" :fat="item.fat"/>
    </card>
  </div>
</template>

<script>
import Card from '@/components/shared/Card'
import MacroBar from '@/components/shared/MacroBar'

export default {
    name: 'macro-grid',
    components: { Card, MacroBar },
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        grid-gap: 1rem;
    }
</style>
