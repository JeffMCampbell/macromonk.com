<template>
  <div class="bg-black text-white p-4">
    <div class="flex justify-between mb-4">
      <span class="flex-1 truncate text-base underline block">{{ item.name }}</span>
      <div class="flex-1 flex justify-end">
        <number-input class="w-24 text-right mr-2" :currency="item.portionTypeAbbr" :value="value" @input="(newValue) => $emit('input', newValue)"/>
        <delete-icon class="text-md" @click.native="$emit('delete')"/>
      </div>
    </div>
    <macro-bar :calories="item.calories" :protein="item.protein" :carbs="item.carbs" :fat="item.fat"/>
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
