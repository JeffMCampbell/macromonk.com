<template>
  <div class="absolute bg-black pin-r pin-t text-left z-50 p-1" v-on-clickaway="() => $emit('clickAway')">
    <div class="flex items-center cursor-pointer text-white p-3" v-for="option in options" :key="option.label" @click.stop="optionClicked(option)">
      <i class="material-icons cursor-pointer text-sm mr-2" v-if="option.icon">{{ option.icon }}</i><span class="text-sm">{{ option.label }}</span>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway2'

export default {
    name: 'options-menu',
    mixins: [ clickaway ],
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    methods: {
        optionClicked (option) {
            this.$emit('optionClicked')
            option.handler()
        }
    }
}
</script>
