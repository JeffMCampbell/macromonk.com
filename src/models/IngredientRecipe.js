import MacroModel from '@/models/MacroModel'

export default class extends MacroModel {
    constructor (ingredient, recipe) {
        const ingredientRecipePortions = recipe.ingredients[ingredient.id]

        super(
            recipe.id,
            recipe.name,
            ingredient.macrosPerPortion.calories * ingredientRecipePortions,
            ingredient.macrosPerPortion.protein * ingredientRecipePortions,
            ingredient.macrosPerPortion.carbs * ingredientRecipePortions,
            ingredient.macrosPerPortion.fat * ingredientRecipePortions
        )

        this.portions = ingredientRecipePortions
        this.portionType = ingredient.portionType
    }

    get fullName () {
        return `${this.name} (${this.portions} ${this.portionType})`
    }

    get portionLabel () {
        return `${this.portions} ${this.portionType}`
    }
}
