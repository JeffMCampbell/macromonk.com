<template>
  <div class="flex">
    <div class="flex-1 flex-col flex justify-center items-center border-b-2 border-yellow-light mr-2 pb-4 pb-4">
      <div class="mb-4 text-md">{{ calories | round }}</div>
      <div class="font-bold text-sm text-grey-light">Calories</div>
    </div>
    <div class="flex-1 flex-col flex justify-center items-center border-b-2 border-red-light mr-2 pb-4">
      <div class="mb-4 text-md">{{ protein | round }}g</div>
      <div class="font-bold text-sm text-grey-light">Protein</div>
    </div>
    <div class="flex-1 flex-col flex justify-center items-center border-b-2 border-blue-light mr-2 pb-4">
      <div class="mb-4 text-md">{{ carbs | round }}g</div>
      <div class="font-bold text-sm text-grey-light">Carbs</div>
    </div>
    <div class="flex-1 flex-col flex justify-center items-center border-b-2 border-green-light pb-4">
      <div class="mb-4 text-md">{{ fat | round }}g</div>
      <div class="font-bold text-sm text-grey-light">Fat</div>
    </div>
  </div>
</template>

<script>
import round from '@/filters/round'

export default {
    name: 'macro-bar',
    filters: { round },
    props: {
        calories: {
            type: Number,
            required: true
        },
        protein: {
            type: Number,
            required: true
        },
        carbs: {
            type: Number,
            required: true
        },
        fat: {
            type: Number,
            required: true
        }
    }
}
</script>
