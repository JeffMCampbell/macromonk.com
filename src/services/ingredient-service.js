import { map, omit, pick } from 'lodash'
import firestore from '@/firebase/firestore'

const INGREDIENT_KEYS = ['name', 'portionAmount', 'portionType', 'calories', 'protein', 'carbs', 'fat']

const listIngredients = function (userId) {
    return firestore.getSubCollection('users', userId, 'ingredients')
}

const createIngredient = function (userId, data) {
    return firestore.addDocumentToSubCollection('users', userId, 'ingredients', pick(data, INGREDIENT_KEYS))
}

const updateIngredient = async function (userId, ingredientId, data) {
    const batch = firestore.firestore.batch()
    const ingredientReference = firestore.firestore.collection('users').doc(userId).collection('ingredients').doc(ingredientId)
    batch.update(ingredientReference, pick(data, INGREDIENT_KEYS))
    await batch.commit()
}

const deleteIngredient = async function (userId, ingredientId, recipes, meals) {
    const batch = firestore.firestore.batch()

    const ingredientReference = firestore.firestore.collection('users').doc(userId).collection('ingredients').doc(ingredientId)
    batch.delete(ingredientReference)

    map(recipes, (recipe) => {
        const recipeReference = firestore.firestore.collection('users').doc(userId).collection('recipes').doc(recipe.id)

        batch.update(recipeReference, {
            ingredients: omit(recipe.ingredients, ingredientId)
        })
    })

    map(meals, (meal) => {
        const mealReference = firestore.firestore.collection('users').doc(userId).collection('meals').doc(meal.id)

        batch.update(mealReference, {
            ingredients: omit(meal.ingredients, ingredientId)
        })
    })

    await batch.commit()
}

export default {
    listIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient
}
