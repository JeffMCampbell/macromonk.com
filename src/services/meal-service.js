import { map, without, pick } from 'lodash'
import firestore from '@/firebase/firestore'

const MEAL_KEYS = ['name', 'ingredients', 'recipes']

const listMeals = function (userId) {
    return firestore.getSubCollection('users', userId, 'meals')
}

const createMeal = function (userId, data) {
    return firestore.addDocumentToSubCollection('users', userId, 'meals', pick(data, MEAL_KEYS))
}

const updateMeal = async function (userId, mealId, data) {
    const batch = firestore.firestore.batch()
    const mealReference = firestore.firestore.collection('users').doc(userId).collection('meals').doc(mealId)
    batch.update(mealReference, pick(data, MEAL_KEYS))
    await batch.commit()
}

const deleteMeal = async function (userId, mealId, days) {
    const batch = firestore.firestore.batch()

    const mealReference = firestore.firestore.collection('users').doc(userId).collection('meals').doc(mealId)
    batch.delete(mealReference)

    map(days, (day) => {
        const dayReference = firestore.firestore.collection('users').doc(userId).collection('days').doc(day.id)

        batch.update(dayReference, {
            meals: without(day.meals, mealId)
        })
    })

    await batch.commit()
}

export default {
    listMeals,
    createMeal,
    updateMeal,
    deleteMeal
}
