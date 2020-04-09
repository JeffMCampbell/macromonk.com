<template>
  <div class="bg-black text-white p-4">
    <div class="flex">
      <div class="w-32 flex items-center">{{ item.name }}</div>
      <div class="flex-1 text-center border-2 border-yellow-light rounded p-2 mr-2">{{ item.calories }}</div>
      <div class="flex-1 text-center border-2 border-red-light rounded p-2 mr-2">{{ item.protein }}g</div>
      <div class="flex-1 text-center border-2 border-blue-light rounded p-2 mr-2">{{ item.carbs }}g</div>
      <div class="flex-1 text-center border-2 border-green-light rounded p-2">{{ item.fat }}g</div>
    </div>
    <div v-if="deletable" class="text-center mt-4" @click="$emit('delete')"><delete-icon/></div>
  </div>
</template>

<script>
import DeleteIcon from '@/components/shared/icons/DeleteIcon'

export default {
    name: 'mini-macro-item',
    components: { DeleteIcon },
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
    }
}
</script>
