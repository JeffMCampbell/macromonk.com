<template>
  <div>
    <view-header :title="originalName" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <day-form save-text="Save Day" v-model="day" @save="save"/>
      <macro-card v-if="isDesktop" :calories="macros.calories" :protein="macros.protein" :carbs="macros.carbs" :fat="macros.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { cloneDeep } from 'lodash'
import MacroCalculator from '@/services/macro-calculator'
import DayService from '@/services/day-service'
import ViewHeader from '@/components/shared/ViewHeader'
import DayForm from '@/components/days/DayForm'
import MacroCard from '@/components/shared/MacroCard'

export default {
    name: 'edit-day',
    components: { ViewHeader, DayForm, MacroCard },
    props: {
        dayId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            originalName: null,
            day: null
        }
    },
    computed: {
        ...mapGetters({
            getDay: 'getDay',
            isDesktop: 'isDesktop'
        }),
        breadCrumbs () {
            return [{ title: 'Days', route: 'days' }, { title: this.day.name, route: 'view-day', params: { id: this.dayId } }, { title: 'Edit' }]
        },
        macros () {
            return MacroCalculator.forDay(this.day)
        }
    },
    created () {
        this.day = cloneDeep(this.getDay(this.dayId))
        this.originalName = this.day.name
    },
    methods: {
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        async save () {
            this.setDashboardLoading(true)
            await DayService.updateDay(this.dayId, this.day)
            this.$router.push({ name: 'view-day', params: { dayId: this.dayId } })
            this.setDashboardLoading(false)
        }
    }
}
</script>
