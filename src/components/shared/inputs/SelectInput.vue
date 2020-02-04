<template>
  <select class="shadow appearance-none rounded py-1 px-2 bg-grey-darkest text-grey-lighter leading-tight focus:outline-none focus:shadow-outline" :value="value" @input="(newValue) => $emit('input', newValue.target.value)">
    <option disabled :value="null">Please select one</option>
    <option v-for="option in options" :value="option.value" :key="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
    name: 'select-input',
    props: {
        value: {
            required: true
        },
        options: {
            type: Array,
            required: true
        }
    }
}
</script>
