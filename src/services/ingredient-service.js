import { map, omit } from 'lodash'
import store from '@/store'
import firestore from '@/firebase/firestore'
import recipeService from '@/services/recipe-service'
import mealService from '@/services/meal-service'

const refreshIngredients = async function () {
    const ingredients = await firestore.getSubCollection('users', store.state.id, 'ingredients')
    store.commit('setIngredients', ingredients)
}

const addIngredient = async function (data) {
    const ingredient = await firestore.addDocumentToSubCollection('users', store.state.id, 'ingredients', data)
    await refreshIngredients()
    return ingredient
}

const updateIngredient = async function (ingredientId, data) {
    const batch = firestore.firestore.batch()

    const ingredientReference = firestore.firestore.collection('users').doc(store.state.id).collection('ingredients').doc(ingredientId)
    batch.update(ingredientReference, Object.assign({}, data))
    await batch.commit()

    await refreshIngredients()
}

const deleteIngredient = async function (ingredientId) {
    const batch = firestore.firestore.batch()

    const ingredientReference = firestore.firestore.collection('users').doc(store.state.id).collection('ingredients').doc(ingredientId)
    batch.delete(ingredientReference)

    const recipes = store.getters['recipesForIngredient'](ingredientId)

    map(recipes, (recipe) => {
        const recipeReference = firestore.firestore.collection('users').doc(store.state.id).collection('recipes').doc(recipe.id)

        batch.update(recipeReference, {
            ingredients: omit(recipe.ingredients, ingredientId)
        })
    })

    const meals = store.getters['mealsForIngredient'](ingredientId)

    map(meals, (meal) => {
        const mealReference = firestore.firestore.collection('users').doc(store.state.id).collection('meals').doc(meal.id)

        batch.update(mealReference, {
            ingredients: omit(meal.ingredients, ingredientId)
        })
    })

    await batch.commit()
    await mealService.refreshMeals()
    await recipeService.refreshRecipes()
    await refreshIngredients()
}

export default {
    refreshIngredients,
    addIngredient,
    updateIngredient,
    deleteIngredient
}
