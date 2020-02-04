<template>
  <macro-item :item="item" deletable @delete="$emit('delete')">
    <div slot="footer" class="flex justify-center">
      <number-input class="text-center" :currency="item.portionTypeAbbr" :value="value" @input="(newValue) => $emit('input', newValue)"/>
    </div>
  </macro-item>
</template>

<script>
import NumberInput from '@/components/shared/inputs/NumberInput'
import MacroItem from '@/components/shared/macro_items/MacroItem'

export default {
    name: 'macro-item-counter',
    components: { NumberInput, MacroItem },
    props: {
        item: {
            type: Object,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    }
}
</script>
