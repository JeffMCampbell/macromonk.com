<template>
  <div class="w-full p-4">
    <div class="flex justify-between">
      <label v-if="title" class="block text-white text-sm font-bold mb-6">{{ title | capitalize }}</label>
      <tool-tip v-if="toolTip" :message="toolTip">
        <info-icon class="text-white text-sm"/>
      </tool-tip>
    </div>
    <slot/>
  </div>
</template>

<script>
import InfoIcon from '@/components/shared/icons/InfoIcon'
import ToolTip from '@/components/shared/ToolTip'
import capitalize from '@/filters/capitalize'

export default {
    components: { InfoIcon, ToolTip },
    filters: { capitalize },
    props: {
        title: {
            type: String,
            required: false,
            default: null
        },
        toolTip: {
            type: String,
            required: false,
            default: null
        }
    }
}
</script>
