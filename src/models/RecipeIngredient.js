import { get } from 'lodash'
import MacroModel from '@/models/MacroModel'

export default class extends MacroModel {
    constructor (recipe, ingredient) {
        const portions = get(recipe.ingredients, ingredient.id, 0)

        super(
            ingredient.id,
            ingredient.name,
            ingredient.macrosPerPortion.calories * portions,
            ingredient.macrosPerPortion.protein * portions,
            ingredient.macrosPerPortion.carbs * portions,
            ingredient.macrosPerPortion.fat * portions
        )

        this.portions = portions
        this.portionType = ingredient.portionType
    }

    get fullName () {
        return `${this.name} (${this.portions} ${this.portionType})`
    }
}
