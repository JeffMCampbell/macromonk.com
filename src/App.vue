<template>
  <div id="app" class="min-h-screen bg-black overflow-x-hidden">
    <template v-if="initialized">
      <router-view />
      <app-footer/>
    </template>
    <loader class="absolute m-auto pin" v-if="!initialized"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import responsive from '@/mixins/responsive'
import Navigation from '@/components/navigation/Navigation'
import Loader from '@/components/shared/Loader'
import AppFooter from '@/components/shared/AppFooter'

export default {
    name: 'app',
    components: { Navigation, Loader, AppFooter },
    mixins: [ responsive ],
    computed: {
        ...mapState({
            initialized: 'initialized'
        })
    }
}
</script>
