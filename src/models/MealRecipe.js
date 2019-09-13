import { get } from 'lodash'
import MacroModel from '@/models/MacroModel'

export default class extends MacroModel {
    constructor (recipe, meal) {
        const amount = get(meal.recipes, recipe.id, 0)

        super(
            recipe.id,
            recipe.name,
            recipe.calories * amount,
            recipe.protein * amount,
            recipe.carbs * amount,
            recipe.fat * amount
        )

        this.amount = amount
    }

    get fullName () {
        return `${this.name} (${this.amount})`
    }
}
