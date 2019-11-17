<template>
  <div class="wrapper">
    <component :is="landingComponent" :login-handler="toggleShowLogin" :create-account-handler="toggleShowCreateAccount"/>

    <div class="flex items-center flex-col p-4">
      <div class="text-3xl text-white mb-6">Features</div>

      <ul class="list-disc text-white mb-8">
        <li class="mb-2">MacroMonk is a tool to help you manage and plan your calorie and macro nutritent intake.</li>
        <li class="mb-2">It helps you plan your macros for recipes, meals & days based on raw ingredients you enter into the app.</li>
        <li class="mb-2">We allow you to enter the nutrition data yourself for the ingriedents you use, instead of trusting the data on various other resources.</li>
        <li> You get to enter exactly what your label says</li>
      </ul>
    </div>

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
  .wrapper {
    background: #48545d;
    height: auto;
  }

  .auth-modal-wrapper {
      max-width: 25rem;
  }
</style>
