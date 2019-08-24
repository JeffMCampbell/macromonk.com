<template>
  <div class="dashboard--container min-h-screen">
    <dashboard-navigation />
    <side-bar/>
    <main class="relative h-full p-6 bg-theme-black-3">
      <loader v-if="loading" class="absolute m-auto pin"/>
      <router-view v-else/>
    </main>
    <dashboard-footer/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DashboardNavigation from '@/components/navigation/DashboardNavigation'
import SideBar from '@/components/dashboard/SideBar'
import DashboardFooter from '@/components/dashboard/DashboardFooter'
import Loader from '@/components/shared/Loader'

export default {
    name: 'desktop-dashboard',
    components: { DashboardNavigation, SideBar, DashboardFooter, Loader },
    computed: {
        ...mapState({
            loading: 'dashboardLoading'
        })
    }
}
</script>
