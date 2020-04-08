<template>
  <div :class="{ grid: isDesktop }">
    <macro-item
      :class="{ 'mb-4': !isDesktop }"
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      @view="() => $emit('selected', item)"
      editable
      deletable
      @edit="() => $emit('edit', item)"
      @delete="() => $emit('delete', item)"
    />
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import MacroItem from '@/components/shared/macro_items/MacroItem'

export default {
    name: 'macro-grid',
    components: { MacroItem },
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
