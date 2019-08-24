<template>
  <div class="relative h-full">
    <loader v-if="loading" class="absolute m-auto pin"/>
    <template v-else>
      <!-- <div class="w-full h-48 bg-center bg-cover" :style="{ 'background-image': `url('/img/${heroImage}')` }"/> -->
      <div class="p-6">
        <view-header :bread-crumbs="breadCrumbs" :options="options" />
        <div class="text-white text-center font-bold truncate text-3xl mb-8" v-if="title">{{ title }}</div>
        <div class="text-white truncate text-xl mb-8" v-if="subTitle">{{ subTitle }}</div>
        <div class="flex flex-col md:flex-row">
          <slot/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Loader from '@/components/shared/Loader'
import ViewHeader from '@/components/shared/ViewHeader'

export default {
    name: 'view-wrapper',
    components: { Loader, ViewHeader },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        breadCrumbs: {
            type: Array,
            required: true
        },
        heroImage: {
            type: String,
            default: 'ingredients.jpeg'
        },
        options: {
            type: Array,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        subTitle: {
            type: String,
            default: null
        }
    }
}
</script>
