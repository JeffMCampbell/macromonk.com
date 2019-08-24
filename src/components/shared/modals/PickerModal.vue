<template>
  <modal @close="() => $emit('close')">
    <div class="picker-modal overflow-auto text-white">
      <div class="text-center text-base font-bold mb-6">{{ title }}</div>
      <text-input v-model="search" :placeholder="searchText" class="w-full mb-4"/>
      <card class="bg-theme-black-2 mb-4" :title="macroModel.fullName" v-for="macroModel in filteredMacroModels" :key="macroModel.id">
        <macro-bar class="mb-4" :calories="macroModel.calories" :protein="macroModel.protein" :carbs="macroModel.carbs" :fat="macroModel.fat"/>
        <v-button class="self-start w-full" @click.native="$emit('select', macroModel)">Select</v-button>
      </card>
      <div v-if="!filteredMacroModels.length" class="text-center mt-4">None found</div>
    </div>
  </modal>
</template>

<script>
import { includes } from 'lodash'
import Modal from '@/components/shared/modals/Modal'
import VButton from '@/components/shared/Button'
import Card from '@/components/shared/Card'
import MacroBar from '@/components/shared/MacroBar'
import TextInput from '@/components/shared/inputs/TextInput'

export default {
    name: 'picker-modal',
    components: { Modal, VButton, Card, MacroBar, TextInput },
    props: {
        title: {
            type: String,
            required: true
        },
        searchText: {
            type: String,
            required: true
        },
        macroModels: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            search: ''
        }
    },
    computed: {
        filteredMacroModels () {
            if (!this.search) {
                return this.macroModels
            }

            return this.macroModels.filter((macroModel) => includes(macroModel.name, this.search))
        }
    }
}
</script>

<style lang="scss" scoped>
  .picker-modal {
        height: 450px;
        width: 400px;
  }
</style>
