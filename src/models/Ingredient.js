import MacroModel from '@/models/MacroModel'
import portionTypes from '@/resources/portion-types'
import { get, find } from 'lodash'

export default class extends MacroModel {
    constructor (ingredient) {
        super(ingredient.id, ingredient.name, ingredient.calories, ingredient.protein, ingredient.carbs, ingredient.fat)
        this.portionAmount = ingredient.portionAmount
        this.portionType = ingredient.portionType
    }

    get fullName () {
        return this.nameWithPortionLabel(this.portionAmount)
    }

    get portionTypeAbbr () {
        return get(find(portionTypes, { value: this.portionType }), 'abbr')
    }

    portionLabel (amount = 1) {
        return amount + ' ' + this.portionType
    }

    nameWithPortionLabel (amount = 1) {
        return this.name + ' (' + this.portionLabel(amount) + ')'
    }

    get macrosPerPortion () {
        return {
            calories: this.calories / this.portionAmount,
            protein: this.protein / this.portionAmount,
            carbs: this.carbs / this.portionAmount,
            fat: this.fat / this.portionAmount
        }
    }
}
