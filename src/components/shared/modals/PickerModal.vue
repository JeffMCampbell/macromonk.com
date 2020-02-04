<template>
  <modal @close="() => $emit('close')">
    <div class="picker-modal overflow-auto text-white" :class="{ 'desktop': isDesktop }">
      <div class="text-center text-base font-bold mb-6">{{ title }}</div>
      <text-input v-model="search" :placeholder="searchText" class="w-full mb-4"/>
      <macro-item class="mb-4" v-for="item in filteredMacroModels" :key="item.id" :item="item">
        <v-button slot="footer" class="self-start w-full" @click.native="$emit('select', item)">Select</v-button>
      </macro-item>
      <div v-if="!filteredMacroModels.length" class="text-center mt-4">None Found</div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import { includes } from 'lodash'
import Modal from '@/components/shared/modals/Modal'
import VButton from '@/components/shared/Button'
import MacroItem from '@/components/shared/macro_items/MacroItem'
import TextInput from '@/components/shared/inputs/TextInput'

export default {
    name: 'picker-modal',
    components: { Modal, VButton, TextInput, MacroItem },
    props: {
        title: {
            type: String,
            required: true
        },
        searchText: {
            type: String,
            required: true
        },
        items: {
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
        ...mapGetters(['isDesktop']),
        filteredMacroModels () {
            if (!this.search) {
                return this.items
            }

            return this.items.filter((macroModel) => includes(macroModel.name, this.search))
        }
    }
}
</script>

<style lang="scss" scoped>
  .picker-modal {
        max-height: 450px;
  }

  .desktop {
        width: 450px;
  }
</style>
