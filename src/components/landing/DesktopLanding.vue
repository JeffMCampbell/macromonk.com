<template>
  <div class="flex flex-col items-center">

    <div class="bg-theme-black-2 flex w-full items-center justify-between px-20" >
      <div class="flex items-center py-5">
        <logo/>
      </div>
      <div class="flex items-center justify-center p-6">
        <button class="bg-red-light text-grey-light font-bold py-3 px-4 rounded mr-5" @click="loginHandler">Login</button>
        <button class="bg-transparent text-red-light font-bold py-3 px-4 rounded border border-red-light" @click="createAccountHandler">Create Account</button>
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


  </div>
</template>

<script>
import Logo from '@/components/shared/Logo'
import { Carousel, Slide } from 'vue-carousel'

export default {
    name: 'landing-navigation',
    components: { Logo, Carousel, Slide },
    props: ['loginHandler', 'createAccountHandler'],
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
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
  .image-slide {
      width:auto;
      height: auto;
      max-height: 500px;
      overflow: auto;
        img {
          width: 800px;
          height:auto;
      }
  }

  .notsure {
    background: #48545d;
  }
</style>
