<template>
  <div>
    <view-header title="Schedule" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <div v-for="item in scheduleWithDays" :key="item.key">
          <day-entry :name="item.key" :day="item.day" :editing="editing" @select="pickDay(item.key)" @clear="deleteDay(item.key)"/>
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
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import { reduce, mapValues, cloneDeep } from 'lodash'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/macro_items/MacroCard'
import VButton from '@/components/shared/Button'
import PickerModal from '@/components/shared/modals/PickerModal'
import DayEntry from '@/components/schedule/DayEntry'

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
        ...mapGetters(['processedDays', 'getDay']),
        dayOrder: () => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        scheduleWithDays () {
            return this.dayOrder.map((dayKey) => {
                return {
                    key: dayKey,
                    day: this.getDay(this.schedule[dayKey])
                }
            })
        },
        scheduleDays () {
            return this.scheduleWithDays.filter((item) => item.day)
        },
        averageMacros () {
            return mapValues(this.totalMacros, (value) => this.scheduleDays.length ? value / this.scheduleDays.length : 0)
        },
        totalMacros () {
            return reduce(this.scheduleDays, (carry, item) => {
                return {
                    calories: carry.calories + item.day.calories,
                    protein: carry.protein + item.day.protein,
                    carbs: carry.carbs + item.day.carbs,
                    fat: carry.fat + item.day.fat
                }
            }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
        }
    },
    created () {
        this.schedule = cloneDeep(this.user.schedule)
    },
    methods: {
        ...mapMutations(['setDashboardLoading']),
        ...mapActions(['updateSchedule']),
        pickDay (dayKey) {
            this.selectedDayKey = dayKey
        },
        async selectDay (day) {
            this.schedule[this.selectedDayKey] = day.id
            this.selectedDayKey = null
        },
        async deleteDay (dayKey) {
            this.schedule[dayKey] = null
        },
        async save () {
            this.setDashboardLoading(true)
            await this.updateSchedule(this.schedule)
            this.setDashboardLoading(false)
            this.editing = false
            window.scrollTo(0, 0)
        }
    }
}
</script>
