<template>
  <div/>
</template>

<script>
import authService from '@/services/auth'

export default {
    async created () {
        try {
            await authService.logout()
        } catch (error) {
            alert('Logout Error')
            return
        }

        this.$router.replace({ name: 'landing' })
    }
}
</script>

<style>

</style>
