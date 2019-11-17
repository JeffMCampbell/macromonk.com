<template>
  <card class="bg-theme-black-2 mb-4" :title="title" :tool-tip="toolTip">
    <macro-grid :items="items" @selected="(item) => $emit('selected', item)" v-if="items.length"/>
    <div class="text-white text-center text-sm italic" v-else>I{{ emptyText }}</div>
  </card>
</template>

<script>
import Card from '@/components/shared/Card'
import MacroGrid from '@/components/shared/macro_items/MacroGrid'

export default {
    name: 'macro-grid-card',
    components: { Card, MacroGrid },
    props: {
        title: {
            type: String,
            required: true
        },
        emptyText: {
            type: String,
            required: true
        },
        toolTip: {
            type: String,
            default: null
        },
        items: {
            type: Array,
            required: true
        }
    }
}
</script>
