import store from '@/store'
import MacroModel from '@/models/MacroModel'
import IngredientMeal from './IngredientMeal'

export default class extends MacroModel {
    constructor (ingredient, day) {
        const macros = store.getters['mealsForDay'](day.id)
            .map((meal) => new IngredientMeal(ingredient, meal))
            .reduce((carry, ingredientMeal) => {
                return {
                    portions: carry.portions + ingredientMeal.portions,
                    calories: carry.calories + ingredientMeal.calories,
                    protein: carry.protein + ingredientMeal.protein,
                    carbs: carry.carbs + ingredientMeal.carbs,
                    fat: carry.fat + ingredientMeal.fat
                }
            }, { portions: 0, calories: 0, protein: 0, carbs: 0, fat: 0 })

        super(
            day.id,
            day.name,
            macros.calories,
            macros.protein,
            macros.carbs,
            macros.fat
        )

        this.nameWithPortions = `${day.name} (${macros.portions} ${ingredient.portionType})`
        this.portions = macros.portions
        this.portionType = ingredient.portionType
    }

    get fullName () {
        return `${this.name} (${this.portions} ${this.portionType})`
    }
}
