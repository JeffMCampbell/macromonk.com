<template>
  <nav class="wrapper flex relative justify-between items-center bg-black text-white p-6">
    <div class="flex items-center cursor-pointer" @click.stop="$emit('toggleMenu')">
      <menu-icon v-if="!showMenu"/>
      <clear-icon v-if="showMenu"/>
    </div>
    <logo class="ml-4"/>
    <div class="flex items-center cursor-pointer" @click.stop="$router.push({ name: 'account' })">
      <account-icon/>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '@/components/shared/Logo'
import MenuIcon from '@/components/shared/icons/MenuIcon'
import ClearIcon from '@/components/shared/icons/ClearIcon'
import AccountIcon from '@/components/shared/icons/AccountIcon'

export default {
    name: 'mobile-navigation',
    components: { Logo, MenuIcon, ClearIcon, AccountIcon },
    props: {
        showMenu: {
            type: Boolean,
            required: true
        }
    },
    // mixins: [ clickaway ],
    // data () {
    //     return {
    //         sho: false
    //     }
    // },
    computed: {
        ...mapState({
            userName: 'name'
        })
    }
    // methods: {
    //     goToRoute (route) {
    //         this.$router.push({ name: route })
    //         this.showAccountMenu = false
    //     }
    // }
}
</script>
