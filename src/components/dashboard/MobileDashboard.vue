<template>
  <div class="flex flex-col min-h-screen">
    <mobile-navigation :show-menu="showMobileMenu" @toggleMenu="showMobileMenu = !showMobileMenu" @closeMenu="showMobileMenu = false" />
    <div v-if="showMobileMenu" class="flex-1 flex flex-col justify-center items-center bg-theme-black-3">
      <div class="no-underline text-white text-md uppercase text-sm py-5" v-for="link in links" :key="link.route" :to="{ name: link.route }" @click="goToRoute(link.route)">
        {{ link.label }}
      </div>
      <div class="no-underline text-white text-md uppercase text-sm py-5" @click="$router.push({ name: 'logout' })">
        Logout
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
import MobileNavigation from '@/components/navigation/MobileNavigation'
import Loader from '@/components/shared/Loader'

export default {
    name: 'mobile-dashboard',
    components: { MobileNavigation, Loader },
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
