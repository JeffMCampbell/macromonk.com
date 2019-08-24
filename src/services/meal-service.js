import { map, without } from 'lodash'
import store from '@/store'
import firestore from '@/firebase/firestore'
import dayService from '@/services/day-service'

const refreshMeals = async function () {
    const ingredients = await firestore.getSubCollection('users', store.state.id, 'meals')
    store.commit('setMeals', ingredients)
}

const addMeal = async function (data) {
    const meal = await firestore.addDocumentToSubCollection('users', store.state.id, 'meals', data)
    await refreshMeals()
    return meal
}

const updateMeal = async function (mealId, data) {
    const batch = firestore.firestore.batch()

    const mealReference = firestore.firestore.collection('users').doc(store.state.id).collection('meals').doc(mealId)
    batch.update(mealReference, Object.assign({}, data))

    await batch.commit()
    await refreshMeals()
}

const deleteMeal = async function (mealId) {
    const batch = firestore.firestore.batch()

    const mealReference = firestore.firestore.collection('users').doc(store.state.id).collection('meals').doc(mealId)
    batch.delete(mealReference)

    const days = store.getters.daysForMeal(mealId)

    map(days, (day) => {
        const dayReference = firestore.firestore.collection('users').doc(store.state.id).collection('days').doc(day.id)

        batch.update(dayReference, {
            meals: without(day.meals, mealId)
        })
    })

    await batch.commit()
    await dayService.refreshDays()
    await refreshMeals()
}

export default {
    refreshMeals,
    addMeal,
    updateMeal,
    deleteMeal
}
