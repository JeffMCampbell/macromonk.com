<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container" v-on-clickaway="() => $emit('close')">
        <div class="bg-theme-black-3 pt-16 pb-12 pl-16 pr-12" v-if="loading">
          <loader class=""/>
        </div>
        <div class="modal-body bg-theme-black-3 p-8" v-else>
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway2'
import Loader from '@/components/shared/Loader'

export default {
    components: { Loader },
    mixins: [ clickaway ],
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.modal-mask {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity .3s ease;
  background: rgba(0, 0, 0, 0.45);
}

.modal-container {
  max-width: 500px;
  max-height: 450px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
