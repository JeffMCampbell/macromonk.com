<template>
  <card class="bg-theme-color-2 mb-4" :title="value.key">
    <div v-if="!value.meals.length">
      <div class="text-xl text-red mb-4">Cheat Day</div>
    </div>
    <template v-else>
      <label class="block text-white text-sm mb-4">Total</label>
      <macro-item class="mb-4" :item="value"/>
    </template>
    <label class="block text-white text-sm mb-4">Meals</label>
    <mini-macro-item
      class="mb-4"
      v-for="(meal, index) in value.meals"
      :key="index"
      :item="meal"
      :deletable="editing"
      @delete="() => removeMeal(index)"
      selectable
      @select="() => $router.push({ name: 'view-meal', params: { mealId: meal.id } })"
    />
    <div class="text-center">
      <v-button @click.native="showMealModal = true" v-if="editing">Add Meal</v-button>
    </div>
    <picker-modal v-if="showMealModal" title="Available Meals" search-text="Search Meals..." :items="processedMeals" @select="selectMeal" @close="showMealModal = false"/>
  </card>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/shared/Card'
import VButton from '@/components/shared/Button'
import MacroItem from '@/components/shared/macro_items/MacroItem'
import MiniMacroItem from '@/components/shared/macro_items/MiniMacroItem'
import PickerModal from '@/components/shared/modals/PickerModal'

export default {
    name: 'day-entry',
    components: { Card, VButton, MacroItem, MiniMacroItem, PickerModal },
    props: {
        value: {
            type: Object,
            default: null
        },
        editing: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            showMealModal: false
        }
    },
    computed: mapGetters(['processedMeals']),
    methods: {
        selectMeal (meal) {
            this.$emit('input', {
                ...this.value,
                meals: [...this.value.meals, meal]
            })

            this.showMealModal = false
        },
        removeMeal (index) {
            this.$emit('input', {
                ...this.value,
                meals: [...this.value.meals.slice(0, index), ...this.value.meals.slice(index + 1, this.value.meals.length)]
            })
        },
        clearDay () {
            this.$emit('input', {
                ...this.value,
                meals: []
            })
        }
    }
}
</script>
