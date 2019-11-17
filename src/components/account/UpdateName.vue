<template>
  <block title="Username" :submit-handler="() => updateUserName(name)" :form-is-valid="isFormValid">
    <template slot-scope="slotProps">
      <text-input v-model="name" name="name" placeholder="Display name" :disabled="slotProps.loading" @keydown.native="slotProps.clearMessages" v-validate="'required'" data-vv-delay="500" class="mb-4 w-full"/>
      <validation-error v-if="errors.has('name')" :error="errors.first('name')" class="mb-4"/>
    </template>
  </block>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormMixin from '@/mixins/form'
import Block from '@/components/account/Block'
import TextInput from '@/components/shared/inputs/TextInput'
import ValidationError from '@/components/shared/ValidationError'

export default {
    components: { Block, TextInput, ValidationError },
    mixins: [ FormMixin ],
    data () {
        return {
            name: null
        }
    },
    computed: {
        ...mapState(['user'])
    },
    created () {
        this.name = this.user.name
    },
    methods: {
        ...mapActions(['updateUserName'])
    }
}
</script>
