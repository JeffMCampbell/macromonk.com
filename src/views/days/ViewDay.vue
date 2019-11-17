<template>
  <div>
    <view-header :title="day.name" sub-title="Day" :bread-crumbs="breadCrumbs" :options="options"/>
    <div class="flex flex-col md:flex-row">
      <div class="flex-1">
        <macro-grid-card
          :title="`Meals (${meals.length})`"
          tool-tip="Meals within this day and the macros each meal makes up within this day."
          :items="meals"
          @selected="(meal) => $router.push({ name: 'view-meal', params: { mealId: meal.id } })"
          empty-text="Day has no meals."
        />
      </div>
      <macro-card class="self-start" :calories="day.calories" :protein="day.protein" :carbs="day.carbs" :fat="day.fat"/>
    </div>
    <confirm-modal
      v-if="showDeleteModal"
      header-text="Are you sure you want to delete this day?"
      @confirmed="deleteConfirmed"
      @close="() => showDeleteModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/macro_items/MacroCard'
import MacroGridCard from '@/components/shared/macro_items/MacroGridCard'
import ConfirmModal from '@/components/shared/modals/ConfirmModal'

export default {
    name: 'view-day',
    components: { ViewHeader, MacroCard, MacroGridCard, ConfirmModal },
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
        ...mapGetters(['getDay', 'mealsForDay']),
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
        ...mapMutations(['setDashboardLoading']),
        ...mapActions(['deleteDay']),
        async deleteConfirmed () {
            this.setDashboardLoading(true)
            await this.deleteDay(this.dayId)
            this.setDashboardLoading(false)
            this.$router.push({ name: 'days' })
        }
    }
}
</script>
