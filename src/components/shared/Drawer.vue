<template>
  <div>
    <div class="flex justify-between items-center cursor-pointer" @click="open = !open">
      <slot name="header"/>
      <component :is="arrowIcon"/>
    </div>
    <div class=" mt-4" v-if="open">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
import ArrowLeftIcon from '@/components/shared/icons/ArrowLeftIcon'
import ArrowDownIcon from '@/components/shared/icons/ArrowDownIcon'

export default {
    name: 'drawer',
    components: { ArrowLeftIcon, ArrowDownIcon },
    data () {
        return {
            open: false
        }
    },
    computed: {
        arrowIcon () {
            return this.open ? 'arrow-down-icon' : 'arrow-left-icon'
        }
    },
    methods: {
        blah () {
            console.log('b;ah')
        }
    }
}
</script>
