import { get } from 'lodash'
import MacroModel from '@/models/MacroModel'

export default class extends MacroModel {
    constructor (ingredient, meal) {
        const mealIngredientPortions = get(meal.ingredients, ingredient.id, 0)

        super(
            meal.id,
            meal.name,
            ingredient.macrosPerPortion.calories * mealIngredientPortions,
            ingredient.macrosPerPortion.protein * mealIngredientPortions,
            ingredient.macrosPerPortion.carbs * mealIngredientPortions,
            ingredient.macrosPerPortion.fat * mealIngredientPortions
        )

        this.portions = mealIngredientPortions
        this.portionType = ingredient.portionType
    }

    get fullName () {
        return `${this.name} (${this.portions} ${this.portionType})`
    }
}
