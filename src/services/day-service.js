import { mapValues, pick } from 'lodash'
import firestore from '@/firebase/firestore'

const DAY_KEYS = ['name', 'meals']

const listDays = function (userId) {
    return firestore.getSubCollection('users', userId, 'days')
}

const createDay = function (userId, data) {
    return firestore.addDocumentToSubCollection('users', userId, 'days', pick(data, DAY_KEYS))
}

const updateDay = function (userId, dayId, data) {
    return firestore.updateDocumentFromSubCollection('users', userId, 'days', dayId, pick(data, DAY_KEYS))
}

const deleteDay = async function (userId, dayId, schedule) {
    const newSchedule = mapValues(schedule, (id) => {
        return id === dayId ? null : id
    })

    if (newSchedule !== schedule) {
        await firestore.updateDocument('users', userId, { schedule: newSchedule })
    }

    return firestore.deleteDocumentFromSubCollection('users', userId, 'days', dayId)
}

export default {
    listDays,
    createDay,
    updateDay,
    deleteDay
}
