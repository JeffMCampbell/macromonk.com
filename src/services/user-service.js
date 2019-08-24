import firestore from '@/firebase/firestore'

const getUser = function (id) {
    return firestore.getDocument('users', id)
}

const setUser = function (id, data) {
    return firestore.setDocument('users', id, data)
}

const updateUser = function (id, data) {
    return firestore.updateDocument('users', id, data)
}

const deleteUser = function (id) {
    return firestore.deleteDocument('users', id)
}

export default {
    getUser,
    setUser,
    updateUser,
    deleteUser
}
