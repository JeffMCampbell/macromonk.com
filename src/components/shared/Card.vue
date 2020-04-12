<template>
  <div class="w-full">
    <div class="flex justify-between p-4 bg-theme-color-1">
      <label v-if="title" class="block text-white font-bold" :class="{'underline cursor-pointer': selectable}" @click="() => selectable && $emit('select')">{{ title | capitalize }}</label>
      <options-menu v-if="showOptionsMenu" :options="options" background="bg-theme-color-3"/>
      <tool-tip v-if="toolTip" :message="toolTip">
        <info-icon class="text-white"/>
      </tool-tip>
    </div>
    <div class="p-4">
      <slot/>
    </div>
  </div>
</template>

<script>
import OptionsMenu from '@/components/shared/OptionsMenu'
import InfoIcon from '@/components/shared/icons/InfoIcon'
import ToolTip from '@/components/shared/ToolTip'
import capitalize from '@/filters/capitalize'

export default {
    components: { InfoIcon, ToolTip, OptionsMenu },
    filters: { capitalize },
    props: {
        title: {
            type: String,
            required: false,
            default: null
        },
        selectable: {
            type: Boolean,
            required: false,
            default: false
        },
        editable: {
            type: Boolean,
            required: false,
            default: false
        },
        deletable: {
            type: Boolean,
            required: false,
            default: false
        },
        toolTip: {
            type: String,
            required: false,
            default: null
        }
    },
    computed: {
        showOptionsMenu () {
            return this.editable && this.deletable
        },
        options () {
            return [
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
    }
}
</script>
