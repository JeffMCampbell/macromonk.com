<template>
  <div class="flex flex-col min-h-screen">
    <mobile-navigation :show-menu="showMobileMenu" @toggleMenu="showMobileMenu = !showMobileMenu" @closeMenu="showMobileMenu = false" />
    <div v-if="showMobileMenu" class="flex-1 flex flex-col justify-center items-center bg-theme-black-3">
      <div>
        <div class="flex items-center no-underline text-white text-md uppercase text-sm py-5" v-for="link in links" :key="link.route" :to="{ name: link.route }" @click="goToRoute(link.route)">
          <component :is="link.icon" class="w-5 h-5 fill-current mr-4"/> {{ link.label }}
        </div>
        <div class="flex items-center no-underline text-white text-md uppercase text-sm py-5" @click="$router.push({ name: 'logout' })">
          <logout-icon class="w-5 h-5 fill-current mr-4"/> Logout
        </div>
      </div>
    </div>
    <main class="relative p-6 bg-theme-black-3 flex-1" v-else>
      <loader v-if="loading" class="absolute m-auto pin"/>
      <router-view v-else/>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import links from '@/resources/links'
import ScheduleIcon from '@/components/svg/ScheduleIcon'
import IngredientIcon from '@/components/svg/IngredientIcon'
import RecipeIcon from '@/components/svg/RecipeIcon'
import MealIcon from '@/components/svg/MealIcon'
import DayIcon from '@/components/svg/DayIcon'
import LogoutIcon from '@/components/svg/LogoutIcon'
import MobileNavigation from '@/components/navigation/MobileNavigation'
import Loader from '@/components/shared/Loader'

export default {
    name: 'mobile-dashboard',
    components: { MobileNavigation, Loader, ScheduleIcon, IngredientIcon, MealIcon, RecipeIcon, DayIcon, LogoutIcon },
    data () {
        return {
            showMobileMenu: false
        }
    },
    computed: {
        ...mapState({
            loading: 'dashboardLoading'
        }),
        links () {
            return links
        }
    },
    methods: {
        goToRoute (route) {
            this.$router.push({ name: route })
            this.showMobileMenu = false
        }
    }
}
</script>
