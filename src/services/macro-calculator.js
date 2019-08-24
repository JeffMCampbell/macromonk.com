import store from '@/store'
import { reduce, find } from 'lodash'

export default {
    forRecipe (recipe) {
        const ingredients = store.getters['processedIngredients']

        return reduce(recipe.ingredients, (carry, portions, ingredientId) => {
            const ingredient = find(ingredients, { id: ingredientId })

            if (!ingredient) {
                return carry
            }

            return {
                calories: carry.calories + (ingredient.macrosPerPortion.calories * portions),
                protein: carry.protein + (ingredient.macrosPerPortion.protein * portions),
                carbs: carry.carbs + (ingredient.macrosPerPortion.carbs * portions),
                fat: carry.fat + (ingredient.macrosPerPortion.fat * portions)
            }
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
    },
    forMeal (meal) {
        const ingredients = store.getters['processedIngredients']
        const recipes = store.getters['processedRecipes']

        const ingredientMacros = reduce(Object.keys(meal.ingredients), (carry, ingredientId) => {
            const ingredient = find(ingredients, { id: ingredientId })

            if (!ingredient) {
                return carry
            }

            const portions = meal.ingredients[ingredient.id]
            carry.calories += (ingredient.calories / ingredient.portionAmount) * portions
            carry.protein += (ingredient.protein / ingredient.portionAmount) * portions
            carry.carbs += (ingredient.carbs / ingredient.portionAmount) * portions
            carry.fat += (ingredient.fat / ingredient.portionAmount) * portions
            return carry
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 })

        return reduce(Object.keys(meal.recipes), (carry, recipeId) => {
            const recipe = find(recipes, { id: recipeId })

            if (!recipe) {
                return carry
            }

            const portions = meal.recipes[recipe.id]
            carry.calories += recipe.calories * portions
            carry.protein += recipe.protein * portions
            carry.carbs += recipe.carbs * portions
            carry.fat += recipe.fat * portions
            return carry
        }, ingredientMacros)
    },
    forDay (day) {
        const meals = store.getters['processedMeals']

        return reduce(day.meals, (carry, mealId) => {
            const meal = find(meals, { id: mealId })

            if (!meal) {
                return carry
            }

            return {
                calories: carry.calories + meal.calories,
                protein: carry.protein + meal.protein,
                carbs: carry.carbs + meal.carbs,
                fat: carry.fat + meal.fat
            }
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
    },
    ingredientMacrosForRecipe (recipe, ingredients) {
        return ingredients.map((ingredient) => {
            return {
                id: ingredient.id,
                name: ingredient.nameWithPortionLabel(recipe.ingredients[ingredient.id]),
                calories: (ingredient.calories / ingredient.portionAmount) * recipe.ingredients[ingredient.id],
                protein: (ingredient.protein / ingredient.portionAmount) * recipe.ingredients[ingredient.id],
                carbs: (ingredient.carbs / ingredient.portionAmount) * recipe.ingredients[ingredient.id],
                fat: (ingredient.fat / ingredient.portionAmount) * recipe.ingredients[ingredient.id]
            }
        })
    }
}
