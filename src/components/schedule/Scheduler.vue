<template>
  <div>
    <view-header title="Schedule" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <div v-for="item in scheduleWithDays" :key="item.key">
          <day-entry :value="item" :editing="editing" @input="updateDay"/>
        </div>
        <v-button v-if="editing" class="w-full" @click.native="save">Save</v-button>
      </div>
      <div>
        <macro-card class="self-start mb-4" title="Average Daily Macros" :calories="averageMacros.calories" :protein="averageMacros.protein" :carbs="averageMacros.carbs" :fat="averageMacros.fat"/>
        <macro-card class="self-start" title="Total Weekly Macros" :calories="totalMacros.calories" :protein="totalMacros.protein" :carbs="totalMacros.carbs" :fat="totalMacros.fat"/>
      </div>
    </div>
    <picker-modal v-if="selectedDayKey" title="Available Days" search-text="Seach Days..." :items="processedDays" @select="selectDay" @close="selectedDayKey = null"/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/macro_items/MacroCard'
import VButton from '@/components/shared/Button'
import PickerModal from '@/components/shared/modals/PickerModal'
import DayEntry from '@/components/schedule/DayEntry'
import { sumMacroItems, averageMacroItems } from '@/services/macro-calculator'

export default {
    name: 'scheduler',
    components: { ViewHeader, MacroCard, PickerModal, DayEntry, VButton },
    data () {
        return {
            breadCrumbs: [{ title: 'Schedule', route: 'schedule' }],
            schedule: null,
            selectedDayKey: null,
            editing: false,
            options: [
                {
                    label: 'Edit',
                    icon: 'edit',
                    handler: () => { this.editing = true }
                }
            ]
        }
    },
    computed: {
        ...mapState(['user']),
        ...mapGetters(['processedMeals', 'getMeal']),
        dayOrder: () => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        scheduleWithDays () {
            return this.dayOrder.map((dayKey) => {
                const meals = this.schedule[dayKey].map(this.getMeal)

                const macros = sumMacroItems(meals)

                return {
                    key: dayKey,
                    ...macros,
                    meals: this.schedule[dayKey].map((mealId) => this.getMeal(mealId))
                }
            })
        },
        averageMacros () {
            return averageMacroItems(this.scheduleWithDays.filter((day) => day.meals.length))
        },
        totalMacros () {
            return sumMacroItems(this.scheduleWithDays)
        }
    },
    created () {
        this.schedule = cloneDeep(this.user.schedule)
    },
    methods: {
        ...mapActions(['updateSchedule']),
        updateDay (day) {
            this.schedule[day.key] = day.meals.map((meal) => meal.id)
        },
        async save () {
            await this.updateSchedule(this.schedule)
            this.editing = false
            window.scrollTo(0, 0)
        }
    }
}
</script>
