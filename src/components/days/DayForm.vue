<template>
  <div class="w-full">
    <div class="flex-1 self-start mr-2">
      <card class="bg-theme-black-2 mb-4" title="Basic Info">
        <form-field input-type="text" v-model="name" label="Name" placeholder="Name" name="name" :validation-error="getFieldError('name')" v-validate="'required'" data-vv-delay="500"/>
      </card>
      <card class="bg-theme-black-2 mb-4" title="Meals">
        <macro-item v-for="(meal, index) in selectedMeals" :key="index" :item="meal" :deletable="true" @delete="deleteMeal(index)"/>
        <div class="flex justify-center">
          <add-button label="Meal" @click.native="showModal = true" :disabled="!availableMeals.length"/>
        </div>
      </card>
      <v-button class="w-full" @click.native="() => $emit('save')" :disabled="!isValid">{{ saveText }}</v-button>
    </div>
    <picker-modal v-if="showModal" title="Available Meals" search-text="Search Days..." :macro-models="availableMeals" @select="selectMeal" @close="showModal = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { find } from 'lodash'
import FormMixin from '@/mixins/form'
import Card from '@/components/shared/Card'
import MacroItem from '@/components/shared/macro_items/MacroItem'
import VButton from '@/components/shared/Button'
import AddButton from '@/components/shared/buttons/AddButton'
import PickerModal from '@/components/shared/modals/PickerModal'
import Day from '@/models/Day'
import FormField from '@/components/shared/forms/FormField'

export default {
    name: 'day-form',
    components: { PickerModal, AddButton, Card, VButton, MacroItem, FormField },
    mixins: [ FormMixin ],
    props: {
        value: {
            type: Object,
            required: true
        },
        saveText: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            id: null,
            name: null,
            meals: [],
            showModal: false
        }
    },
    computed: {
        ...mapGetters(['processedMeals']),
        selectedMeals () {
            return this.meals.map((mealId) => find(this.processedMeals, { id: mealId }))
        },
        availableMeals () {
            return this.processedMeals
        },
        isValid () {
            return this.formIsValid && this.selectedMeals.length > 0
        }
    },
    watch: {
        isValid: function () {
            this.$emit('validation', this.isValid)
        }
    },
    async created () {
        this.id = this.value.id
        this.name = this.value.name
        this.meals = this.value.meals

        await this.validateForm()

        this.onFieldChanged(this.update)
    },
    methods: {
        selectMeal (meal) {
            this.meals.push(meal.id)
            this.update()
            this.showModal = false
        },
        deleteMeal (index) {
            this.meals.splice(index, 1)
            this.update()
        },
        update () {
            this.$emit('input', new Day({
                id: this.id,
                name: this.name,
                meals: this.meals
            }))
        }
    }
}
</script>
