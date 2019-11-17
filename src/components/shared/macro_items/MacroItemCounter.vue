<template>
  <div class="bg-black text-white mb-4">
    <div class="flex justify-between items-center p-4">
      <span class="flex-1 truncate text-base">{{ item.name }}</span>
      <div class="flex-1 flex items-center justify-end">
        <number-input class="w-16 mr-2" :value="value" @input="(newValue) => $emit('input', newValue)"/>
        <span v-if="item.portionType" class="text-sm mr-2">{{ item.portionType }}</span>
        <delete-icon class="text-md" @click.native="$emit('delete')"/>
      </div>
    </div>
    <macro-bar class="p-4" :calories="item.calories" :protein="item.protein" :carbs="item.carbs" :fat="item.fat"/>
  </div>
</template>

<script>
import DeleteIcon from '@/components/shared/icons/DeleteIcon'
import NumberInput from '@/components/shared/inputs/NumberInput'
import MacroBar from '@/components/shared/macro_items/MacroBar'

export default {
    name: 'macro-item-counter',
    components: { NumberInput, DeleteIcon, MacroBar },
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
