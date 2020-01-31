<template>
  <div class="bg-black text-white p-4">
    <div :class="{'flex justify-between': hasAction}">
      <label v-if="item.fullName" @click="$emit('view')" class="block text-white underline text-sm font-bold mb-6 cursor-pointer">{{ item.fullName }}</label>
      <delete-icon v-if="deletable" class="text-md" @click.native="$emit('delete')"/>
    </div>
    <macro-bar :class="{ 'mb-4': $slots.footer }" :calories="item.calories" :protein="item.protein" :carbs="item.carbs" :fat="item.fat"/>
    <slot class="mt-4" name="footer"/>
  </div>
</template>

<script>
import MacroBar from '@/components/shared/macro_items/MacroBar'
import DeleteIcon from '@/components/shared/icons/DeleteIcon'

export default {
    name: 'macro-item',
    components: { MacroBar, DeleteIcon },
    props: {
        item: {
            type: Object,
            required: true
        },
        deletable: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        hasAction () {
            return this.deletable
        }
    }
}
</script>
