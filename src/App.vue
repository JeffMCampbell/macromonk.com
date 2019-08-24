<template>
  <div id="app" class="min-h-screen bg-black overflow-x-hidden">
    <router-view v-if="initialized"/>
    <loader class="absolute m-auto pin" v-if="!initialized"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import responsive from '@/mixins/responsive'
import Navigation from '@/components/navigation/Navigation'
import Loader from '@/components/shared/Loader'

export default {
    name: 'app',
    components: { Navigation, Loader },
    mixins: [ responsive ],
    computed: {
        ...mapState({
            initialized: 'initialized'
        })
    }
}
</script>
