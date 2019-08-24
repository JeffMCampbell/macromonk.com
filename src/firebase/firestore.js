import firebase from '@/firebase/firebase'

const firestore = firebase.firestore()

const getDocument = async function (collection, id) {
    const documentReference = firestore.collection(collection).doc(id)

    return unpackDocumentReference(documentReference)
}

const getCollection = async function (collection) {
    const collectionRef = firestore.collection(collection)

    let querySnapshot = null

    try {
        querySnapshot = await collectionRef.get()
    } catch (error) {
        throw error
    }

    const results = []

    querySnapshot.forEach(function (document) {
        results.push({ id: document.id, ...document.data() })
    })

    return results
}

const getSubCollection = async function (collection, id, subCollection) {
    const collectionRef = firebase.firestore().collection(collection).doc(id).collection(subCollection)

    let querySnapshot = null

    try {
        querySnapshot = await collectionRef.get()
    } catch (error) {
        throw error
    }

    const results = []

    querySnapshot.forEach(function (document) {
        results.push({ id: document.id, ...document.data() })
    })

    return results
}

const addDocument = async function (collection, data) {
    await firebase.firestore().collection(collection).add(data)
}

const addDocumentToSubCollection = async function (collection, id, subCollection, data) {
    const documentReference = await firebase.firestore().collection(collection).doc(id).collection(subCollection).add(data)

    return unpackDocumentReference(documentReference)
}

const setDocument = async function (collection, id, data) {
    await firebase.firestore().collection(collection).doc(id).set(data)
}

const updateDocument = async function (collection, id, data) {
    await firebase.firestore().collection(collection).doc(id).update(data)
}

const deleteDocument = async function (collection, id) {
    await firebase.firestore().collection(collection).doc(id).delete()
}

const updateDocumentFromSubCollection = async function (collection, id, subCollection, subId, data) {
    await firebase.firestore().collection(collection).doc(id).collection(subCollection).doc(subId).update(data)
}

const deleteDocumentFromSubCollection = async function (collection, id, subCollection, subId) {
    await firebase.firestore().collection(collection).doc(id).collection(subCollection).doc(subId).delete()
}

const unpackDocumentReference = async function (documentReference) {
    let document = null

    try {
        document = await documentReference.get()
    } catch (error) {
        throw error
    }

    if (!document.exists) {
        return null
    }

    return { id: document.id, ...document.data() }
}

export default {
    firestore,
    getDocument,
    getCollection,
    addDocument,
    setDocument,
    updateDocument,
    deleteDocument,
    getSubCollection,
    addDocumentToSubCollection,
    updateDocumentFromSubCollection,
    deleteDocumentFromSubCollection
}
