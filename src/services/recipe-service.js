import { map, omit } from 'lodash'
import store from '@/store'
import firestore from '@/firebase/firestore'
import mealService from '@/services/meal-service'

const refreshRecipes = async function () {
    const recipes = await firestore.getSubCollection('users', store.state.id, 'recipes')
    store.commit('setRecipes', recipes)
}

const addRecipe = async function (data) {
    const recipe = await firestore.addDocumentToSubCollection('users', store.state.id, 'recipes', data)
    await refreshRecipes()
    return recipe
}

const updateRecipe = async function (recipeId, data) {
    const batch = firestore.firestore.batch()

    const recipeReference = firestore.firestore.collection('users').doc(store.state.id).collection('recipes').doc(recipeId)
    batch.update(recipeReference, Object.assign({}, data))

    await batch.commit()
    await refreshRecipes()
}

const deleteRecipe = async function (recipeId) {
    const batch = firestore.firestore.batch()

    const recipeReference = firestore.firestore.collection('users').doc(store.state.id).collection('recipes').doc(recipeId)
    batch.delete(recipeReference)

    const meals = store.getters['mealsForRecipe'](recipeId)

    map(meals, (meal) => {
        const mealReference = firestore.firestore.collection('users').doc(store.state.id).collection('meals').doc(meal.id)

        batch.update(mealReference, {
            recipes: omit(meal.recipes, recipeId)
        })
    })

    await batch.commit()
    await mealService.refreshMeals()
    await refreshRecipes()
}

export default {
    refreshRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe
}
