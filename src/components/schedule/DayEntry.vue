<template>
  <card class="bg-theme-black-2 mb-4" :title="name">
    <macro-item :item="day" v-if="day" :deletable="editing" @delete="$emit('clear')" @view="viewDay"/>
    <div class="text-center" v-else>
      <div class="text-xl text-red mb-4">Cheat Day</div>
      <v-button @click.native="$emit('select')" v-if="editing">Select Day</v-button>
    </div>
  </card>
</template>

<script>
import Card from '@/components/shared/Card'
import VButton from '@/components/shared/Button'
import MacroItem from '@/components/shared/macro_items/MacroItem'

export default {
    name: 'day-entry',
    components: { Card, VButton, MacroItem },
    props: {
        name: {
            type: String,
            required: true
        },
        day: {
            type: Object,
            default: null
        },
        editing: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        viewDay () {
            this.$router.push({ name: 'view-day', params: { dayId: this.day.id } })
        }
    }
}
</script>
