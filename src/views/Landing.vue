<template>
  <div>
    <component :is="landingComponent" :login-handler="toggleShowLogin" :create-account-handler="toggleShowCreateAccount"/>
    <modal v-if="showLogin || showCreateAccount" @close="closeAuth">
      <div class="auth-modal-wrapper">
        <login v-if="showLogin"/>
        <create-account v-if="showCreateAccount"/>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/shared/modals/Modal'
import Login from '@/components/landing/Login'
import CreateAccount from '@/components/landing/CreateAccount'
import DesktopLanding from '@/components/landing/DesktopLanding'
import MobileLanding from '@/components/landing/MobileLanding'

export default {
    name: 'landing',
    components: { DesktopLanding, MobileLanding, Modal, CreateAccount, Login },
    data () {
        return {
            showLogin: false,
            showCreateAccount: false
        }
    },
    computed: {
        ...mapGetters({
            isDesktop: 'isDesktop'
        }),
        landingComponent () {
            return this.isDesktop ? 'DesktopLanding' : 'MobileLanding'
        }
    },
    methods: {
        toggleShowLogin () {
            this.showCreateAccount = false
            this.showLogin = !this.showLogin
        },
        toggleShowCreateAccount () {
            this.showLogin = false
            this.showCreateAccount = !this.showCreateAccount
        },
        closeAuth () {
            this.showCreateAccount = false
            this.showLogin = false
        }
    }
}
</script>

<style lang="scss" scoped>
  .notsure {
    background: #48545d;
  }

  .auth-modal-wrapper {
      width: 25rem;
  }
</style>
