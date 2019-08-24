import MacroModel from '@/models/MacroModel'
import MacroCalculator from '@/services/macro-calculator'

export default class extends MacroModel {
    constructor (meal) {
        const macros = MacroCalculator.forMeal(meal)
        super(meal.id, meal.name, macros.calories, macros.protein, macros.carbs, macros.fat)
        this.ingredients = meal.ingredients
        this.recipes = meal.recipes
    }
}
