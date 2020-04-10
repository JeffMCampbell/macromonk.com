<template>
  <card class="md:max-w-sm md:ml-2 bg-theme-color-2" :title="title" >
    <div class="bg-theme-color-1 p-4 mb-8">
      <macro-bar class="text-white" :calories="calories" :protein="protein" :carbs="carbs" :fat="fat"/>
    </div>
    <macro-chart :protein="protein" :carbs="carbs" :fat="fat"/>
  </card>
</template>

<script>
import Card from '@/components/shared/Card'
import MacroBar from '@/components/shared/macro_items/MacroBar'
import MacroChart from '@/components/shared/Charts/MacroChart'

export default {
    name: 'macro-card',
    components: { Card, MacroBar, MacroChart },
    props: {
        title: {
            type: String,
            default: 'Macros'
        },
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
