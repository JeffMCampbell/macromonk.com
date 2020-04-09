<template>
  <div class="bg-black text-white p-4">
    <div class="flex justify-between mb-4">
      <div>{{ item.name }}</div>
      <div v-if="deletable" @click="$emit('delete')"><delete-icon/></div>
    </div>
    <div class="flex">
      <div class="flex-1 text-center border-2 border-yellow-light rounded p-2 mr-2">
        <div>{{ item.calories }}</div>
        <div class="text-xs mt-1">Calories</div>
      </div>
      <div class="flex-1 text-center border-2 border-red-light rounded p-2 mr-2">
        <div>{{ item.protein }}g</div>
        <div class="text-xs mt-1">Protein</div>
      </div>
      <div class="flex-1 text-center border-2 border-blue-light rounded p-2 mr-2">
        <div>{{ item.carbs }}g</div>
        <div class="text-xs mt-1">Carbs</div>
      </div>
      <div class="flex-1 text-center border-2 border-green-light rounded p-2">
        <div>{{ item.fat }}g</div>
        <div class="text-xs mt-1">Fat</div>
      </div>
    </div>
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
