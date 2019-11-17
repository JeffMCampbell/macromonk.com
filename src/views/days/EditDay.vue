<template>
  <div>
    <view-header :title="originalName" sub-title="Day" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <day-form save-text="Save Day" v-model="day" @save="save"/>
      <macro-card v-if="isDesktop" :calories="day.calories" :protein="day.protein" :carbs="day.carbs" :fat="day.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { cloneDeep } from 'lodash'
import ViewHeader from '@/components/shared/ViewHeader'
import DayForm from '@/components/days/DayForm'
import MacroCard from '@/components/shared/macro_items/MacroCard'

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
        ...mapGetters(['getDay', 'isDesktop']),
        breadCrumbs () {
            return [{ title: 'Days', route: 'days' }, { title: this.day.name, route: 'view-day', params: { id: this.dayId } }, { title: 'Edit' }]
        }
    },
    created () {
        this.day = cloneDeep(this.getDay(this.dayId))
        this.originalName = this.day.name
    },
    methods: {
        ...mapMutations(['setDashboardLoading']),
        ...mapActions(['updateDay']),
        async save () {
            this.setDashboardLoading(true)
            await this.updateDay(this.day)
            this.$router.push({ name: 'view-day', params: { dayId: this.dayId } })
            this.setDashboardLoading(false)
        }
    }
}
</script>
