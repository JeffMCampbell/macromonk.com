<template>
  <div class="flex items-center text-2xl font-bold tracking-wide text-grey-lighter">
    <monk-icon class="w-8 h-8 fill-current text-red-dark mr-4"/> MacroMonk <span class="text-xs text-red ml-2">Beta</span>
  </div>
</template>

<script>
import MonkIcon from '@/components/svg/MonkIcon'

export default {
    name: 'logo',
    components: { MonkIcon }
}
</script>

<style>

</style>
