import store from '@/store'
import firestore from '@/firebase/firestore'

const refreshDays = async function () {
    const days = await firestore.getSubCollection('users', store.state.id, 'days')
    store.commit('setDays', days)
}

const addDay = async function (data) {
    await firestore.addDocumentToSubCollection('users', store.state.id, 'days', data)
    await refreshDays()
}

const getDays = function () {
    return firestore.getSubCollection('users', store.state.id, 'days')
}

const updateDay = async function (dayId, data) {
    await firestore.updateDocumentFromSubCollection('users', store.state.id, 'days', dayId, Object.assign({}, data))
    await refreshDays()
}

const deleteDay = async function (dayId) {
    await firestore.deleteDocumentFromSubCollection('users', store.state.id, 'days', dayId)
    await refreshDays()
}

export default {
    refreshDays,
    addDay,
    getDays,
    updateDay,
    deleteDay
}
