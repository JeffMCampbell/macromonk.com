import { map, omit, pick } from 'lodash'
import firestore from '@/firebase/firestore'

const RECIPE_KEYS = ['name', 'ingredients']

const listRecipes = function (userId) {
    return firestore.getSubCollection('users', userId, 'recipes')
}

const createRecipe = function (userId, data) {
    return firestore.addDocumentToSubCollection('users', userId, 'recipes', pick(data, RECIPE_KEYS))
}

const updateRecipe = async function (userId, recipeId, data) {
    const batch = firestore.firestore.batch()
    const recipeReference = firestore.firestore.collection('users').doc(userId).collection('recipes').doc(recipeId)
    batch.update(recipeReference, pick(data, RECIPE_KEYS))
    await batch.commit()
}

const deleteRecipe = async function (userId, recipeId, meals) {
    const batch = firestore.firestore.batch()

    const recipeReference = firestore.firestore.collection('users').doc(userId).collection('recipes').doc(recipeId)
    batch.delete(recipeReference)

    map(meals, (meal) => {
        const mealReference = firestore.firestore.collection('users').doc(userId).collection('meals').doc(meal.id)

        batch.update(mealReference, {
            recipes: omit(meal.recipes, recipeId)
        })
    })

    await batch.commit()
}

export default {
    listRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
}
