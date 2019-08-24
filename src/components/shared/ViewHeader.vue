<template>
  <div>
    <div class="flex justify-between mb-8">
      <div class="flex self-start">
        <div class="flex items-center text-white text-sm cursor-pointer mr-2" v-for="(breadCrumb, index) in breadCrumbs" :key="index" @click="$router.push({ name: breadCrumb.route, params: breadCrumb.params })">
          <i class="material-icons text-sm mr-2">play_arrow</i>
          {{ breadCrumb.title }}
        </div>
      </div>
      <div class="self-start relative" v-if="options">
        <traffic-light-icon class="text-white" @click.native="showMenu = !showMenu"/>
        <options-menu v-if="showMenu" :options="options" @clickAway="() => showMenu = false"/>
      </div>
    </div>
    <div class="text-white text-center font-bold truncate text-3xl mb-8" v-if="title">{{ title }}</div>
    <div class="text-white truncate text-xl mb-8" v-if="subTitle">{{ subTitle }}</div>
  </div>
</template>


<script>
import OptionsMenu from '@/components/shared/OptionsMenu'
import TrafficLightIcon from '@/components/shared/icons/TrafficLightIcon'

export default {
    name: 'view-header',
    components: { OptionsMenu, TrafficLightIcon },
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
    },
    data () {
        return {
            showMenu: false
        }
    }
}
</script>
