<template>
  <div class="bg-black text-white mb-4">
    <div class="flex justify-between items-center p-4">
      <span class="flex-1 truncate text-base">{{ ingredient.name }}</span>
      <div class="flex-1 flex items-center justify-end">
        <number-input class="w-16 mr-2" :value="value" @input="(newValue) => $emit('input', newValue)"/>
        <span class="text-sm mr-2">{{ ingredient.portionType }}</span>
        <delete-icon @click.native="$emit('delete')"/>
      </div>
    </div>
    <macro-bar class="p-4" :calories="(ingredient.calories / ingredient.portionAmount) * value" :protein="(ingredient.protein / ingredient.portionAmount) * value" :carbs="(ingredient.carbs / ingredient.portionAmount) * value" :fat="(ingredient.fat / ingredient.portionAmount) * value"/>
  </div>
</template>

<script>
import DeleteIcon from '@/components/shared/icons/DeleteIcon'
import NumberInput from '@/components/shared/inputs/NumberInput'
import MacroBar from '@/components/shared/macro_items/MacroBar'

export default {
    name: 'ingredient-portion-selector',
    components: { NumberInput, DeleteIcon, MacroBar },
    props: {
        ingredient: {
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
