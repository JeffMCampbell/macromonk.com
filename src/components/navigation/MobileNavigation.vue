<template>
  <nav class="wrapper flex relative justify-between items-center bg-theme-color-1 text-white p-6">
    <div class="flex items-center cursor-pointer" @click.stop="$emit('toggleMenu')">
      <menu-icon v-if="!showMenu"/>
      <clear-icon v-if="showMenu"/>
    </div>
    <logo class="ml-4"/>
    <div class="flex items-center cursor-pointer" @click.stop="showSettings">
      <account-icon/>
    </div>
  </nav>
</template>

<script>
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
    methods: {
        showSettings (route) {
            this.$emit('closeMenu')
            this.$router.push({ name: 'account' })
        }
    }
}
</script>
