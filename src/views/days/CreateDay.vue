<template>
  <div>
    <view-header title="New Day" :bread-crumbs="breadCrumbs"/>
    <div class="flex flex-row">
      <day-form save-text="Create Day" v-model="day" @save="create"/>
      <macro-card v-if="isDesktop" :calories="macros.calories" :protein="macros.protein" :carbs="macros.carbs" :fat="macros.fat"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import MacroCalculator from '@/services/macro-calculator'
import DayForm from '@/components/days/DayForm'
import ViewHeader from '@/components/shared/ViewHeader'
import MacroCard from '@/components/shared/macro_items/MacroCard'

export default {
    name: 'create-day',
    components: { ViewHeader, DayForm, MacroCard },
    data () {
        return {
            breadCrumbs: [{ title: 'Days', route: 'days' }, { title: 'Create', route: 'create-day' }],
            day: {
                name: null,
                meals: []
            },
            loading: false
        }
    },
    computed: {
        ...mapGetters({
            isDesktop: 'isDesktop'
        }),
        macros () {
            return MacroCalculator.forDay(this.day)
        }
    },
    methods: {
        ...mapMutations({
            setDashboardLoading: 'setDashboardLoading'
        }),
        ...mapActions(['createDay']),
        async create () {
            this.setDashboardLoading(true)
            await this.createDay(this.day)
            this.$router.push({ name: 'days' })
            this.setDashboardLoading(false)
        }
    }
}
</script>
