import MacroModel from '@/models/MacroModel'
import MacroCalculator from '@/services/macro-calculator'

export default class extends MacroModel {
    constructor (recipe) {
        const macros = MacroCalculator.forRecipe(recipe)
        super(recipe.id, recipe.name, macros.calories, macros.protein, macros.carbs, macros.fat)
        this.ingredients = recipe.ingredients
    }
}
