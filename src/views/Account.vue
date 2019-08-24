<template>
  <div>
    <view-header :bread-crumbs="breadCrumbs"/>
    <div class="wrapper">
      <update-name class="mb-4"/>
      <update-email class="mb-4" mb-4 v-if="!isSocialAuth"/>
      <update-password class="mb-4" v-if="!isSocialAuth"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ViewHeader from '@/components/shared/ViewHeader'
import UpdateName from '@/components/account/UpdateName'
import UpdateEmail from '@/components/account/UpdateEmail'
import UpdatePassword from '@/components/account/UpdatePassword'

export default {
    name: 'account',
    components: { ViewHeader, UpdateName, UpdateEmail, UpdatePassword },
    data () {
        return {
            breadCrumbs: [{ title: 'Account Settings', route: 'account' }]
        }
    },
    computed: {
        ...mapGetters({
            isSocialAuth: 'isSocialAuth'
        })
    }
}
</script>

<style scoped lang="scss">
    .wrapper {
        max-width: 30rem;
    }
</style>
