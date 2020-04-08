import User from '@/models/User'
import UserService from '@/services/user-service'
import IngredientService from '@/services/ingredient-service'
import RecipeService from '@/services/recipe-service'
import MealService from '@/services/meal-service'
import DayService from '@/services/day-service'

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
        MealService.listMeals(state.user.id),
        DayService.listDays(state.user.id)
    ])

    commit('setIngredients', macros[0])
    commit('setRecipes', macros[1])
    commit('setMeals', macros[2])
    commit('setDays', macros[3])
}


export async function refreshIngredients ({ commit, state }) {
    commit('setIngredients', await IngredientService.listIngredients(state.user.id))
}

export async function createIngredient ({ dispatch, state }, data) {
    const ingredient = await IngredientService.createIngredient(state.user.id, data)
    await dispatch('refreshIngredients')
    return ingredient
}

export async function updateIngredient ({ dispatch, state }, ingredient) {
    await IngredientService.updateIngredient(state.user.id, ingredient.id, ingredient)
    await dispatch('refreshIngredients')
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

export async function createRecipe ({ dispatch, state }, data) {
    const recipe = await RecipeService.createRecipe(state.user.id, data)
    await dispatch('refreshRecipes')
    return recipe
}

export async function updateRecipe ({ dispatch, state }, recipe) {
    await RecipeService.updateRecipe(state.user.id, recipe.id, recipe)
    await dispatch('refreshRecipes')
}

export async function deleteRecipe ({ dispatch, state, getters }, id) {
    await RecipeService.deleteRecipe(
        state.user.id,
        id,
        getters['mealsForRecipe'](id)
    )

    await dispatch('refreshRecipes')
    await dispatch('refreshMeals')
}

export async function refreshMeals ({ commit, state }) {
    const meals = await MealService.listMeals(state.user.id)
    commit('setMeals', meals)
}

export async function createMeal ({ dispatch, state }, data) {
    const meal = await MealService.createMeal(state.user.id, data)
    await dispatch('refreshMeals')
    return meal
}

export async function updateMeal ({ dispatch, state }, meal) {
    await MealService.updateMeal(state.user.id, meal.id, meal)
    await dispatch('refreshMeals')
}

export async function deleteMeal ({ dispatch, state, getters }, id) {
    await MealService.deleteMeal(
        state.user.id,
        id,
        getters['daysForMeal'](id)
    )

    await dispatch('refreshMeals')
    await dispatch('refreshDays')
}

export async function refreshDays ({ commit, state }) {
    commit('setDays', await DayService.listDays(state.user.id))
}

export async function createDay ({ dispatch, state }, data) {
    const day = await DayService.createDay(state.user.id, data)
    await dispatch('refreshDays')
    return day
}

export async function updateDay ({ dispatch, state }, day) {
    await DayService.updateDay(state.user.id, day.id, day)
    await dispatch('refreshDays')
}

export async function deleteDay ({ dispatch, state }, id) {
    await DayService.deleteDay(state.user.id, id, state.user.schedule)
    await dispatch('refreshDays')
    await dispatch('refreshUser', { uid: state.user.id, email: state.user.email })
}
