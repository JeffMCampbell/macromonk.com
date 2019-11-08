import { get } from 'lodash'
import store from '@/store'
import MacroModel from '@/models/MacroModel'
import IngredientRecipe from '@/models/IngredientRecipe'

export default class extends MacroModel {
    constructor (ingredient, meal) {
        const mealIngredientPortions = get(meal.ingredients, ingredient.id, 0)

        const macros = Object.keys(meal.recipes).reduce((carry, recipeId) => {
            const ingredientRecipe = new IngredientRecipe(ingredient, store.getters['getRecipe'](recipeId))
            const mealRecipePortions = get(meal.recipes, recipeId, 0)

            return {
                portions: carry.portions + (mealRecipePortions * ingredientRecipe.portions),
                calories: carry.calories + (ingredientRecipe.calories * mealRecipePortions),
                protein: carry.protein + (ingredientRecipe.protein * mealRecipePortions),
                carbs: carry.carbs + (ingredientRecipe.carbs * mealRecipePortions),
                fat: carry.fat + (ingredientRecipe.fa * mealRecipePortions)
            }
        }, { portions: 0, calories: 0, protein: 0, carbs: 0, fat: 0 })

        super(
            meal.id,
            meal.name,
            macros.calories + (ingredient.macrosPerPortion.calories * mealIngredientPortions),
            macros.protein + (ingredient.macrosPerPortion.protein * mealIngredientPortions),
            macros.carbs + (ingredient.macrosPerPortion.carbs * mealIngredientPortions),
            macros.fat + (ingredient.macrosPerPortion.fat * mealIngredientPortions)
        )

        this.portions = mealIngredientPortions + macros.portions
        this.portionType = ingredient.portionType
    }

    get fullName () {
        return `${this.name} (${this.portions} ${this.portionType})`
    }
}
