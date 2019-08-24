<template>
  <div>
    <div class="flex justify-between text-white mx-4 mb-4">
      <div class="flex flex-1 justify-center">
        <div class="w-4 h-4 mr-2 bg-red"/>
        <div>Protein ({{ proteinPercent }}%)</div>
      </div>
      <div class="flex flex-1 justify-center">
        <div class="w-4 h-4 mr-2 bg-blue"/>
        <div>Carbs ({{ carbsPercent }}%)</div>
      </div>
      <div class="flex flex-1 justify-center">
        <div class="w-4 h-4 mr-2 bg-green"/>
        <div>Fat ({{ fatPercent }}%)</div>
      </div>
    </div>
    <chart-js :chart-data="chartOptions"/>
  </div>
</template>

<script>
import ChartJs from '@/components/shared/Charts/Chart'

export default {
    name: 'macro-chart',
    components: { ChartJs },
    props: {
        protein: {
            type: Number,
            default: 0
        },
        carbs: {
            type: Number,
            default: 0
        },
        fat: {
            type: Number,
            default: 0
        }
    },
    computed: {
        chartOptions () {
            return {
                datasets: [
                    {
                        backgroundColor: ['#3490DC', '#E3342F', '#38C172'],
                        data: [this.protein, this.carbs, this.fat]
                    }
                ]
            }
        },
        total () {
            return this.protein + this.carbs + this.fat
        },
        proteinPercent () {
            return this.protein ? Math.round((this.protein / this.total * 100)) : 0
        },
        carbsPercent () {
            return this.carbs ? Math.round((this.carbs / this.total * 100)) : 0
        },
        fatPercent () {
            return this.fat ? Math.round((this.fat / this.total * 100)) : 0
        }
    }
}
</script>
