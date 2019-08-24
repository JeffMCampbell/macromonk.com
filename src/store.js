import Vue from 'vue'
import Vuex from 'vuex'
import Ingredient from '@/models/Ingredient'
import Recipe from '@/models/Recipe'
import Meal from '@/models/Meal'
import Day from '@/models/Day'
import { find, map, filter, intersection, keys, flattenDeep, flatMap } from 'lodash'

Vue.use(Vuex)

const breakpoint = state => {
    const breakpoints = ['sm', 'md', 'lg', 'xl']

    const breakpointsMap = {
        xs: true,
        sm: breakpoints.indexOf(state.breakpoint) >= 1,
        md: breakpoints.indexOf(state.breakpoint) >= 2,
        lg: breakpoints.indexOf(state.breakpoint) >= 3
    }

    if (breakpointsMap.md) {
        return 'desktop'
    }

    return 'mobile'
}

export default new Vuex.Store({
    state: {
        id: null,
        name: null,
        email: null,
        provider: null,
        ingredients: [],
        recipes: [],
        meals: [],
        days: [],
        initialized: false,
        breakpoint: 'xs',
        dashboardLoading: false
    },
    mutations: {
        setId: (state, id) => { state.id = id },
        setName: (state, name) => { state.name = name },
        setEmail: (state, email) => { state.email = email },
        setProvider: (state, provider) => { state.provider = provider },
        setIngredients: (state, ingredients) => { state.ingredients = ingredients },
        setRecipes: (state, recipes) => { state.recipes = recipes },
        setMeals: (state, meals) => { state.meals = meals },
        setDays: (state, days) => { state.days = days },
        setInitialized: (state, initialized) => { state.initialized = initialized },
        setBreakpoint: (state, breakpoint) => { state.breakpoint = breakpoint },
        setDashboardLoading: (state, loading) => { state.dashboardLoading = loading }
    },
    getters: {
        isAuthenticated: (state) => !!state.id && !!state.name && !!state.email && !!state.provider,
        isSocialAuth: (state) => ['google.com', 'facebook.com'].includes(state.provider),

        isMobile: state => breakpoint(state) === 'mobile',
        isDesktop: state => breakpoint(state) === 'desktop',

        processedIngredients: (state) => state.ingredients.map(ingredient => new Ingredient(ingredient)),
        processedRecipes: (state) => state.recipes.map(recipe => new Recipe(recipe)),
        processedMeals: (state) => state.meals.map(meal => new Meal(meal)),
        processedDays: (state) => state.days.map(day => new Day(day)),

        getIngredient: (state, getters) => (ingredientId) => find(getters.processedIngredients, { id: ingredientId }),
        getRecipe: (state, getters) => (recipleId) => find(getters.processedRecipes, { id: recipleId }),
        getMeal: (state, getters) => (mealId) => find(getters.processedMeals, { id: mealId }),
        getDay: (state, getters) => (dayId) => find(getters.processedDays, { id: dayId }),

        // INGREDIENTS
        recipesForIngredient (state, getters) {
            return (ingredientId) => {
                return filter(getters.processedRecipes, (recipe) => {
                    return recipe.ingredients.hasOwnProperty(ingredientId)
                })
            }
        },
        mealsForIngredient (state, getters) {
            return (ingredientId) => {
                return filter(getters.processedMeals, (meal) => {
                    return meal.ingredients.hasOwnProperty(ingredientId)
                })
            }
        },
        mealsForIngredientIncludingRecipes (state, getters) {
            return (ingredientId) => {
                const recipesForIngredientIds = map(getters.recipesForIngredient(ingredientId), 'id')

                return filter(getters.processedMeals, (meal) => {
                    return meal.ingredients.hasOwnProperty(ingredientId) || recipesForIngredientIds.reduce((carry, id) => carry || meal.recipes.hasOwnProperty(id), false)
                })
            }
        },
        daysForIngredient (state, getters) {
            return (ingredientId) => {
                const mealIds = map(getters.mealsForIngredientIncludingRecipes(ingredientId), 'id')

                return getters.processedDays.filter((day) => {
                    return intersection(day.meals, mealIds).length > 0
                })
            }
        },

        // RECIPES
        ingredientsForRecipe (state, getters) {
            return (recipeId) => {
                const recipe = getters.getRecipe(recipeId)

                return filter(getters.processedIngredients, (ingredient) => {
                    return recipe.ingredients.hasOwnProperty(ingredient.id)
                })
            }
        },
        mealsForRecipe (state, getters) {
            return (recipeId) => {
                return filter(getters.processedMeals, (meal) => {
                    return meal.recipes.hasOwnProperty(recipeId)
                })
            }
        },
        daysForRecipe (state, getters) {
            return (recipeId) => {

            }
        },

        // MEALS
        ingredientsForMeal (state, getters) {
            return (mealId) => {
                const meal = getters.getMeal(mealId)

                return filter(getters.processedIngredients, (ingredient) => {
                    return meal.ingredients.hasOwnProperty(ingredient.id)
                })
            }
        },
        combinedIngredientsForMeal (state, getters) {
            return (mealId) => {
                const meal = getters.getMeal(mealId)

                const recipeIngredientIds = flatMap(getters.recipesForMeal(mealId), (recipe) => {
                    return keys(recipe.ingredients)
                })

                return filter(getters.processedIngredients, (ingredient) => {
                    return meal.ingredients.hasOwnProperty(ingredient.id) || recipeIngredientIds.includes(ingredient.id)
                })
            }
        },
        recipesForMeal (state, getters) {
            return (mealId) => {
                const meal = getters.getMeal(mealId)

                return filter(getters.processedRecipes, (recipe) => {
                    return meal.recipes.hasOwnProperty(recipe.id)
                })
            }
        },
        daysForMeal (state, getters) {
            return (mealId) => {
                return filter(getters.processedDays, (day) => {
                    return day.meals.includes(mealId)
                })
            }
        },

        // DAYS
        ingredientsForDay (state, getters) {
            return (dayId) => {
                const meals = getters.mealsForDay(dayId)

                const ingredientIds = flattenDeep(meals.map((meal) => {
                    const recipes = getters.recipesForMeal(meal.id)

                    const recipeIngredientIds = recipes.map((recipe) => {
                        return keys(recipe.ingredients)
                    })

                    return [keys(meal.ingredients), recipeIngredientIds]
                }))

                return filter(getters.processedIngredients, (ingredient) => {
                    return ingredientIds.includes(ingredient.id)
                })
            }
        },
        recipesForDay (state, getters) {
            return (dayId) => {
                const recipeIds = flatMap(getters.mealsForDay(dayId), (meal) => {
                    return keys(meal.recipes)
                })

                return filter(getters.processedRecipes, (recipe) => {
                    return recipeIds.includes(recipe.id)
                })
            }
        },
        mealsForDay (state, getters) {
            return (dayId) => {
                const day = getters.getDay(dayId)

                return map(day.meals, (mealId) => {
                    return find(getters.processedMeals, { id: mealId })
                })
            }
        }
    }
})
