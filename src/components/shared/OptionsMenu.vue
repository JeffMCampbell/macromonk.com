<template>
  <div class="self-start relative" v-if="options">
    <traffic-light-icon class="text-white" @click.native="showMenu = !showMenu"/>
    <div class="absolute pin-r pin-t text-left z-50 p-1" :class="background" v-if="showMenu" v-on-clickaway="() => showMenu = false">
      <div class="flex items-center cursor-pointer text-white p-3" v-for="option in options" :key="option.label" @click.stop="optionClicked(option)">
        <i class="material-icons cursor-pointer mr-2" v-if="option.icon">{{ option.icon }}</i><span class="text-sm">{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway2'
import TrafficLightIcon from '@/components/shared/icons/TrafficLightIcon'

export default {
    name: 'options-menu',
    components: { TrafficLightIcon },
    mixins: [ clickaway ],
    props: {
        options: {
            type: Array,
            required: true
        },
        background: {
            type: String,
            default: 'bg-theme-color-1'
        }
    },
    data () {
        return {
            showMenu: false
        }
    },
    methods: {
        optionClicked (option) {
            this.showMenu = false
            option.handler()
        }
    }
}
</script>
