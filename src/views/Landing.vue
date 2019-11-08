<template>
  <div class="min-h-screen flex flex-col items-center">

    <div class="flex flex-col items-center justify-center p-6">
      <div><logo class="ml-4 mb-4"/></div>
      <div class="text-white">Nutrition Planner</div>
    </div>

    <ul class="list-disc text-white mb-8">
      <li>MacroMonk is a tool to help you manage and plan your calorie and macro nutritent intake.</li>
      <li>It helps you plan your macros for recipes, meals & days based on raw ingredients you enter into the app.</li>
      <li>We allow you to enter the nutrition data yourself for the ingriedents you use, instead of trusting the data on various other resources.</li>
      <li> You get to enter exactly what your label says</li>
    </ul>

    <div class="flex-1 flex items-center justify-center p-6">
      <button class="bg-red-light text-grey-light font-bold py-3 px-4 rounded mr-5" @click="toggleShowLogin">Login</button>
      <button class="bg-transparent text-red-light font-bold py-3 px-4 rounded border border-red-light" @click="toggleShowCreateAccount">Create Account</button>
    </div>

    <div class="carousel-wrapper p-4 border-white border">
      <carousel :per-page="1">
        <slide v-for="image in images" :key="image.path">
          <img :src="image.path">
        </slide>
      </carousel>
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
import { mixin as clickaway } from 'vue-clickaway2'
import Navigation from '@/components/navigation/Navigation'
import Modal from '@/components/shared/modals/Modal'
import Login from '@/components/landing/Login'
import CreateAccount from '@/components/landing/CreateAccount'
import Logo from '@/components/shared/Logo'
import { Carousel, Slide } from 'vue-carousel'

export default {
    name: 'landing-navigation',
    components: { Logo, Navigation, Modal, Login, CreateAccount, Carousel, Slide },
    mixins: [ clickaway ],
    data () {
        return {
            showLogin: false,
            showCreateAccount: false
        }
    },
    computed: {
        images () {
            return [
                {
                    path: '/img/landing/ingredient-list.png'
                },
                {
                    path: '/img/landing/new-ingredient.png'
                },
                {
                    path: '/img/landing/view-ingredient.png'
                },
                {
                    path: '/img/landing/view-recipe.png'
                },
                {
                    path: '/img/landing/edit-recipe.png'
                },
                {
                    path: '/img/landing/create-meal.png'
                },
                {
                    path: '/img/landing/view-meal.png'
                },
                {
                    path: '/img/landing/create-day.png'
                },
                {
                    path: '/img/landing/view-day.png'
                }
            ]
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
  .carousel-wrapper {
    width: 80rem
  }

    .auth-modal-wrapper {
        width: 25rem;
    }
</style>
