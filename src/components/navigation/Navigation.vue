<template>
  <nav class="wrapper flex relative justify-between items-center bg-theme-color-1 text-white p-6">
    <logo class="ml-4"/>
    <slot/>
  </nav>
</template>

<script>
import Logo from '@/components/shared/Logo'

export default {
    name: 'navigation',
    components: { Logo }
}
</script>

<style lang="scss" scoped>
    .wrapper {
        height: 5rem;
    }
</style>
