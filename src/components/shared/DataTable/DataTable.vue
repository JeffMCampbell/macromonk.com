<template>
  <div>
    <div class="flex text-white text-xs font-bold bg-theme-black-2">
      <div class="w-48 p-4 truncate">Name</div>
      <div class="flex-1 text-right p-4 truncate" v-for="header in headers" :key="header">{{ header }}</div>
      <div class="w-24 text-right"/>
    </div>

    <template v-if="rows.length">
      <div v-for="row in rows" :key="row.id" @click="$emit('viewItem', row)" class="data-table--row flex items-center cursor-pointer text-white text-sm border-t border-black">
        <div class="w-48 p-4 truncate">
          {{ row.name }}
        </div>
        <div class="flex-1 text-right p-4 truncate" v-for="(attribute, index) in row.attributes" :key="index">
          {{ attribute }}
        </div>

        <div class="w-24 text-right p-4 relative" @click.stop="showRowMenu = row">
          <traffic-light-icon />
          <div class="absolute bg-black pin-r pin-t text-left text-white z-50 p-1" v-if="showRowMenu === row" v-on-clickaway="() => showRowMenu = null">
            <div class="flex items-center cursor-pointer p-3" @click.stop="editItem(row)">
              <edit-icon class="text-sm mr-2"/><span class="text-sm">Edit</span>
            </div>
            <div class="flex items-center cursor-pointer p-3" @click.stop="deleteItem(row)">
              <delete-icon class="text-sm mr-2"/><span class="text-sm">Delete</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="flex justify-center text-white text-base py-4" v-else>{{ emptyText }}</div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway2'
import EditIcon from '@/components/shared/icons/EditIcon'
import DeleteIcon from '@/components/shared/icons/DeleteIcon'
import TrafficLightIcon from '@/components/shared/icons/TrafficLightIcon'

export default {
    name: 'data-table',
    components: { EditIcon, DeleteIcon, TrafficLightIcon },
    mixins: [ clickaway ],
    props: {
        headers: {
            type: Array,
            required: true
        },
        rows: {
            type: Array,
            required: true
        },
        emptyText: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            showRowMenu: false
        }
    },
    computed: {
        rowOptions () {
            return [
                {
                    label: 'Edit',
                    icon: 'edit',
                    handler: (item) => { this.$emit('editItem', item) }
                },
                {
                    label: 'Delete',
                    icon: 'delete',
                    handler: (item) => { this.$emit('deleteItem', item) }
                }
            ]
        }
    },
    methods: {
        editItem (item) {
            this.$emit('editItem', item)
            this.showRowMenu = false
        },
        deleteItem (item) {
            this.$emit('deleteItem', item)
            this.showRowMenu = false
        }
    }
}
</script>
