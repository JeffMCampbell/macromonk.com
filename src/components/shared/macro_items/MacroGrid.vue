<template>
  <div :class="{ grid: isDesktop }">
    <Card
      class="bg-theme-color-2"
      :class="{ 'mb-4': !isDesktop }"
      v-for="(item, index) in items"
      :key="index"
      :title="item.name"
      selectable
      editable
      deletable
      @select="() => $emit('selected', item)"
      @edit="() => $emit('edit', item)"
      @delete="() => $emit('delete', item)"
    >
      <MacroBar
        :protein="item.protein"
        :carbs="item.carbs"
        :fat="item.fat"
        :calories="item.calories"/>
    </Card>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import Card from '@/components/shared/Card'
import MacroBar from '@/components/shared/macro_items/MacroBar'

export default {
    name: 'macro-grid',
    components: { Card, MacroBar },
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapGetters({
            isDesktop: 'isDesktop'
        })
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
