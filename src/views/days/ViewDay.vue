<template>
  <div>
    <view-header :title="day.name" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <card class="bg-theme-black-2 mb-4" :title="`Meal List (${meals.length})`">
          <macro-grid :items="meals" @selected="(meal) => $router.push({ name: 'view-meal', params: { mealId: meal.id } })"/>
        </card>
      </div>
      <macro-card class="self-start" :calories="day.calories" :protein="day.protein" :carbs="day.carbs" :fat="day.fat"/>
    </div>
    <confirm-modal
      v-if="showDeleteModal"
      header-text="Are you sure you want to delete this day?"
      @confirmed="deleteDay"
      @close="() => showDeleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import DayService from '@/services/day-service'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/MacroCard'
import MacroGrid from '@/components/shared/MacroGrid'
import Card from '@/components/shared/Card'
import ConfirmModal from '@/components/shared/modals/ConfirmModal'

export default {
    name: 'view-day',
    components: { ViewHeader, MacroCard, MacroGrid, Card, ConfirmModal },
    props: {
        dayId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            options: [
                {
                    label: 'Edit',
                    icon: 'edit',
                    handler: () => this.$router.push({ name: 'edit-day', params: { dayId: this.dayId } })
                },
                {
                    label: 'Delete',
                    icon: 'delete',
                    handler: () => { this.showDeleteModal = true }
                }
            ],
            showDeleteModal: false
        }
    },
    computed: {
        ...mapGetters({
            getDay: 'getDay',
            mealsForDay: 'mealsForDay'
        }),
        day () {
            return this.getDay(this.dayId)
        },
        meals () {
            return this.mealsForDay(this.dayId)
        },
        breadCrumbs () {
            return [{ title: 'Days', route: 'days' }, { title: this.day.name, route: 'view-day', params: { id: this.dayId } }]
        }
    },
    methods: {
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        async deleteDay () {
            this.setDashboardLoading(true)
            await DayService.deleteDay(this.dayId)
            this.setDashboardLoading(false)
            this.$router.push({ name: 'days' })
        }
    }
}
</script>
