<template>
  <div>
    <div class="top-bar flex justify-between mb-8">
      <div class="flex self-start">
        <div class="flex items-center text-white text-sm cursor-pointer mr-2" v-for="(breadCrumb, index) in breadCrumbs" :key="index" @click="$router.push({ name: breadCrumb.route, params: breadCrumb.params })">
          <i class="material-icons text-sm mr-2">play_arrow</i>
          {{ breadCrumb.title }}
        </div>
      </div>
      <options-menu v-if="options" :options="options"/>
    </div>
    <div class="text-white text-center mb-8">
      <div class="font-bold truncate text-3xl mb-2" v-if="title">{{ title }}</div>
      <div class="truncate text-lg" v-if="subTitle">{{ subTitle }}</div>
    </div>
  </div>
</template>


<script>
import OptionsMenu from '@/components/shared/OptionsMenu'

export default {
    name: 'view-header',
    components: { OptionsMenu },
    props: {
        breadCrumbs: {
            type: Array,
            required: true
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

<style scoped>
  .top-bar {
    height: 30px;
  }
</style>
