<template>
  <component :is="dashboardComponent"/>
</template>

<script>
import { mapGetters } from 'vuex'
import DesktopDashboard from '@/components/dashboard/DesktopDashboard'
import MobileDashboard from '@/components/dashboard/MobileDashboard'

export default {
    name: 'dashboard',
    components: { DesktopDashboard, MobileDashboard },
    computed: {
        ...mapGetters({
            isDesktop: 'isDesktop'
        }),
        dashboardComponent () {
            return this.isDesktop ? 'desktop-dashboard' : 'mobile-dashboard'
        }
    }
}
</script>
