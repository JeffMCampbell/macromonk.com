<template>
  <v-button>
    <i class="material-icons">
      {{ icon }}
    </i>
  </v-button>
</template>

<script>
import VButton from '@/components/shared/Button'

export default {
    name: 'icon-button',
    components: { VButton },
    props: {
        icon: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>
