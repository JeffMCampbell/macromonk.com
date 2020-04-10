<template>
  <navigation>

    <div class="flex items-center h-full pl-4 pr-4 cursor-pointer" @click="() => showAccountMenu = true">
      <div class="text-grey-lighter inline mr-3">{{ user.name }}</div>
      <account-icon class="text-3xl text-grey-lighter"/>
    </div>

    <div class="dashboard--nav-menu absolute bg-theme-color-1 pin-r text-left text-white z-50" v-if="showAccountMenu" v-on-clickaway="() => showAccountMenu = false">
      <div class="dashboard--nav-menu-item flex items-center cursor-pointer p-4" @click.stop="goToRoute('account')">
        <wrench-icon class="mr-4 text-xl"/><span class="text-base">Settings</span>
      </div>
      <div class="dashboard--nav-menu-item flex items-center cursor-pointer p-4" @click.stop="goToRoute('logout')">
        <power-button-icon class="mr-4 text-xl"/><span class="text-base">Logout</span>
      </div>
    </div>

  </navigation>
</template>

<script>
import { mapState } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway2'
import Navigation from '@/components/navigation/Navigation'
import PowerButtonIcon from '@/components/shared/icons/PowerButtonIcon'
import AccountIcon from '@/components/shared/icons/AccountIcon'
import WrenchIcon from '@/components/shared/icons/WrenchIcon'

export default {
    name: 'dashboard-navigation',
    components: { Navigation, PowerButtonIcon, AccountIcon, WrenchIcon },
    mixins: [ clickaway ],
    data () {
        return {
            showAccountMenu: false
        }
    },
    computed: {
        ...mapState({
            user: 'user'
        })
    },
    methods: {
        goToRoute (route) {
            this.$router.push({ name: route })
            this.showAccountMenu = false
        }
    }
}
</script>
