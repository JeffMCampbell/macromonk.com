import User from '@/models/User'
import UserService from '@/services/user-service'
import IngredientService from '@/services/ingredient-service'
import RecipeService from '@/services/recipe-service'
import MealService from '@/services/meal-service'

export async function refreshUser ({ commit }, { uid, email }) {
    const { name, schedule } = await UserService.getUser(uid)
    commit('setUser', new User({ uid, email }, { name, schedule }))
}

export async function updateUserName ({ dispatch, state }, name) {
    await UserService.updateUser(state.user.id, { name })
    await dispatch('refreshUser', { uid: state.user.id, email: state.user.email })
}

export async function updateSchedule ({ dispatch, state }, schedule) {
    await UserService.updateUser(state.user.id, { schedule })
    await dispatch('refreshUser', { uid: state.user.id, email: state.user.email })
}

export async function refreshMacros ({ commit, state }) {
    const macros = await Promise.all([
        IngredientService.listIngredients(state.user.id),
        RecipeService.listRecipes(state.user.id),
        MealService.listMeals(state.user.id)
    ])

    commit('setIngredients', macros[0])
    commit('setRecipes', macros[1])
    commit('setMeals', macros[2])
}


export async function refreshIngredients ({ commit, state }) {
    commit('setIngredients', await IngredientService.listIngredients(state.user.id))
}

export async function createIngredient ({ commit, dispatch, state }, data) {
    commit('setUpdatingMacros', true)
    const ingredient = await IngredientService.createIngredient(state.user.id, data)
    await dispatch('refreshIngredients')
    commit('setUpdatingMacros', false)
    return ingredient
}

export async function updateIngredient ({ commit, dispatch, state }, ingredient) {
    commit('setUpdatingMacros', true)
    await IngredientService.updateIngredient(state.user.id, ingredient.id, ingredient)
    await dispatch('refreshIngredients')
    commit('setUpdatingMacros', false)
}

export async function deleteIngredient ({ commit, dispatch, state, getters }, id) {
    commit('setUpdatingMacros', true)

    await IngredientService.deleteIngredient(
        state.user.id,
        id,
        getters['recipesForIngredient'](id),
        getters['mealsForIngredient'](id)
    )

    await dispatch('refreshIngredients')
    await dispatch('refreshRecipes')
    await dispatch('refreshMeals')

    commit('setUpdatingMacros', false)
}

export async function refreshRecipes ({ commit, state }) {
    commit('setRecipes', await RecipeService.listRecipes(state.user.id))
}

export async function createRecipe ({ commit, dispatch, state }, data) {
    commit('setUpdatingMacros', true)
    const recipe = await RecipeService.createRecipe(state.user.id, data)
    await dispatch('refreshRecipes')
    commit('setUpdatingMacros', false)
    return recipe
}

export async function updateRecipe ({ commit, dispatch, state }, recipe) {
    commit('setUpdatingMacros', true)
    await RecipeService.updateRecipe(state.user.id, recipe.id, recipe)
    await dispatch('refreshRecipes')
    commit('setUpdatingMacros', false)
}

export async function deleteRecipe ({ commit, dispatch, state, getters }, id) {
    commit('setUpdatingMacros', true)

    await RecipeService.deleteRecipe(
        state.user.id,
        id,
        getters['mealsForRecipe'](id)
    )

    await dispatch('refreshRecipes')
    await dispatch('refreshMeals')

    commit('setUpdatingMacros', false)
}

export async function refreshMeals ({ commit, state }) {
    const meals = await MealService.listMeals(state.user.id)
    commit('setMeals', meals)
}

export async function createMeal ({ commit, dispatch, state }, data) {
    commit('setUpdatingMacros', true)
    const meal = await MealService.createMeal(state.user.id, data)
    await dispatch('refreshMeals')
    commit('setUpdatingMacros', false)
    return meal
}

export async function updateMeal ({ commit, dispatch, state }, meal) {
    commit('setUpdatingMacros', true)
    await MealService.updateMeal(state.user.id, meal.id, meal)
    await dispatch('refreshMeals')
    commit('setUpdatingMacros', false)
}

export async function deleteMeal ({ commit, dispatch, state, getters }, id) {
    commit('setUpdatingMacros', true)
    await MealService.deleteMeal(state.user.id, id)
    await dispatch('refreshMeals')
    commit('setUpdatingMacros', false)
}
