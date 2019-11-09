<template>
  <div class="min-h-screen flex flex-col items-center">

    <div class="flex w-full items-center justify-between px-20">
      <logo/>
      <div class="flex items-center justify-center p-6">
        <button class="bg-red-light text-grey-light font-bold py-3 px-4 rounded mr-5" @click="toggleShowLogin">Login</button>
        <button class="bg-transparent text-red-light font-bold py-3 px-4 rounded border border-red-light" @click="toggleShowCreateAccount">Create Account</button>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center notsure w-full p-4">
      <div class="text-3xl text-white text-bold mt-8 mb-4">Plan Your Macros For Ingredients, Recipes, Meals and Days</div>
      <div class="text-xl text-white text-bold mb-8">Manually enter macros from your own nutrition label!</div>
      <div class="carousel-wrapper overflow-auto p-4">
        <carousel :per-page="1">
          <slide class="text-center image-slide" v-for="image in images" :key="image.path">
            <img :src="image.path">
          </slide>
        </carousel>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center p-6">
      <div class="text-2xl text-white">Features</div>
    </div>

    <ul class="list-disc text-white mb-8">
      <li>MacroMonk is a tool to help you manage and plan your calorie and macro nutritent intake.</li>
      <li>It helps you plan your macros for recipes, meals & days based on raw ingredients you enter into the app.</li>
      <li>We allow you to enter the nutrition data yourself for the ingriedents you use, instead of trusting the data on various other resources.</li>
      <li> You get to enter exactly what your label says</li>
    </ul>


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
import Modal from '@/components/shared/modals/Modal'
import Login from '@/components/landing/Login'
import CreateAccount from '@/components/landing/CreateAccount'
import Logo from '@/components/shared/Logo'
import { Carousel, Slide } from 'vue-carousel'

export default {
    name: 'landing-navigation',
    components: { Logo, Modal, Login, CreateAccount, Carousel, Slide },
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
                    path: '/img/landing/ingredient-list2.png'
                },
                {
                    path: '/img/landing/new-ingredient2.png'
                },
                {
                    path: '/img/landing/view-ingredient2.png'
                },
                {
                    path: '/img/landing/view-recipe2.png'
                },
                {
                    path: '/img/landing/edit-recipe2.png'
                },
                {
                    path: '/img/landing/create-meal2.png'
                },
                {
                    path: '/img/landing/view-meal2.png'
                },
                {
                    path: '/img/landing/create-day2.png'
                },
                {
                    path: '/img/landing/view-day2.png'
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
  .image-slide {
      width:auto;
      // text-align:center;
      // padding:20px;
        img {
          max-width:100%;
          height:auto;
      }
  }


  .carousel-wrapper {

  }

  .notsure {
    background: #48545d;
  }

    .auth-modal-wrapper {
        width: 25rem;
    }
</style>
