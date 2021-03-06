import Ingredient from '@/models/Ingredient'
import Recipe from '@/models/Recipe'
import Meal from '@/models/Meal'
import { find, map, filter, keys, flatMap } from 'lodash'

export function isAuthenticated (state) { return !!state.user }

export function isSocialAuth (state) { return ['google.com', 'facebook.com'].includes(state.user.provider) }

const breakpoint = state => {
    const breakpoints = ['sm', 'md', 'lg', 'xl']
    const breakpointsMap = { xs: true, sm: breakpoints.indexOf(state.breakpoint) >= 1, md: breakpoints.indexOf(state.breakpoint) >= 2, lg: breakpoints.indexOf(state.breakpoint) >= 3 }
    return breakpointsMap.md ? 'desktop' : 'mobile'
}

export function isMobile (state) { return breakpoint(state) === 'mobile' }
export function isDesktop (state) { return breakpoint(state) === 'desktop' }

export function processedIngredients (state) { return state.ingredients.map(ingredient => new Ingredient(ingredient)) }
export function processedRecipes (state) { return state.recipes.map(recipe => new Recipe(recipe)) }
export function processedMeals (state) { return state.meals.map(meal => new Meal(meal)) }

export function getIngredient (state, getters) { return (ingredientId) => find(getters.processedIngredients, { id: ingredientId }) }
export function getRecipe (state, getters) { return (recipleId) => find(getters.processedRecipes, { id: recipleId }) }
export function getMeal (state, getters) { return (mealId) => find(getters.processedMeals, { id: mealId }) }

// INGREDIENTS
export function recipesForIngredient (state, getters) {
    return (ingredientId) => filter(getters.processedRecipes, (recipe) => recipe.ingredients.hasOwnProperty(ingredientId))
}

export function mealsForIngredient (state, getters) {
    return (ingredientId) => filter(getters.processedMeals, (meal) => meal.ingredients.hasOwnProperty(ingredientId))
}

export function mealsForIngredientIncludingRecipes (state, getters) {
    return (ingredientId) => {
        const recipesForIngredientIds = map(getters.recipesForIngredient(ingredientId), 'id')

        return filter(getters.processedMeals, (meal) => {
            return meal.ingredients.hasOwnProperty(ingredientId) || recipesForIngredientIds.reduce((carry, id) => carry || meal.recipes.hasOwnProperty(id), false)
        })
    }
}

// RECIPES
export function ingredientsForRecipe (state, getters) {
    return (recipeId) => {
        const recipe = getters.getRecipe(recipeId)

        return filter(getters.processedIngredients, (ingredient) => recipe.ingredients.hasOwnProperty(ingredient.id))
    }
}

export function mealsForRecipe (state, getters) {
    return (recipeId) => filter(getters.processedMeals, (meal) => meal.recipes.hasOwnProperty(recipeId))
}

// MEALS
export function ingredientsForMeal (state, getters) {
    return (mealId) => {
        const meal = getters.getMeal(mealId)

        return filter(getters.processedIngredients, (ingredient) => meal.ingredients.hasOwnProperty(ingredient.id))
    }
}

export function combinedIngredientsForMeal (state, getters) {
    return (mealId) => {
        const meal = getters.getMeal(mealId)

        const recipeIngredientIds = flatMap(getters.recipesForMeal(mealId), (recipe) => keys(recipe.ingredients))

        return filter(getters.processedIngredients, (ingredient) => meal.ingredients.hasOwnProperty(ingredient.id) || recipeIngredientIds.includes(ingredient.id))
    }
}

export function recipesForMeal (state, getters) {
    return (mealId) => {
        const meal = getters.getMeal(mealId)

        return filter(getters.processedRecipes, (recipe) => meal.recipes.hasOwnProperty(recipe.id))
    }
}
