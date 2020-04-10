<template>
  <div class="bg-theme-color-1 text-white p-4">
    <div :class="{'flex justify-between': hasAction}">
      <label v-if="item.fullName" @click="$emit('view')" class="block text-white underline text-sm font-bold mb-6 cursor-pointer">{{ item.fullName }}</label>
      <options-menu v-if="showOptionsMenu" :options="options" background="bg-theme-color-3"/>
      <template v-else>
        <delete-icon v-if="deletable" class="text-md" @click.native="$emit('delete')"/>
      </template>
    </div>
    <macro-bar :class="{ 'mb-4': $slots.footer }" :calories="item.calories" :protein="item.protein" :carbs="item.carbs" :fat="item.fat"/>
    <slot class="mt-4" name="footer"/>
  </div>
</template>

<script>
import OptionsMenu from '@/components/shared/OptionsMenu'
import TrafficLightIcon from '@/components/shared/icons/TrafficLightIcon'
import MacroBar from '@/components/shared/macro_items/MacroBar'
import DeleteIcon from '@/components/shared/icons/DeleteIcon'

export default {
    name: 'macro-item',
    components: { MacroBar, DeleteIcon, OptionsMenu, TrafficLightIcon },
    props: {
        item: {
            type: Object,
            required: true
        },
        deletable: {
            type: Boolean,
            required: false,
            default: false
        },
        editable: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            options: [
                {
                    label: 'Edit',
                    icon: 'edit',
                    handler: () => { this.$emit('edit') }
                },
                {
                    label: 'Delete',
                    icon: 'delete',
                    handler: () => { this.$emit('delete') }
                }
            ]
        }
    },
    computed: {
        hasAction () {
            return this.editable || this.deletable
        },
        showOptionsMenu () {
            return this.editable && this.deletable
        }
    }
}
</script>
