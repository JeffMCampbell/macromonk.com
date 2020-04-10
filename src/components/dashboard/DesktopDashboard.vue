<template>
  <div class="dashboard--container min-h-screen">
    <dashboard-navigation />
    <side-bar/>
    <main class="relative h-full p-6 bg-theme-color-3">
      <loader v-if="updatingMacros" class="absolute m-auto pin"/>
      <router-view v-else/>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DashboardNavigation from '@/components/navigation/DashboardNavigation'
import SideBar from '@/components/dashboard/SideBar'
import Loader from '@/components/shared/Loader'

export default {
    name: 'desktop-dashboard',
    components: { DashboardNavigation, SideBar, Loader },
    computed: {
        ...mapState(['updatingMacros'])
    }
}
</script>
