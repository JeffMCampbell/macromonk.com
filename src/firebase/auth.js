import firebase from '@/firebase/firebase'
import providers from '@/firebase/providers'

export const onAuthStateChanged = function () {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((account) => {
            unsubscribe()
            resolve(account)
        })
    })
}

export const signInWithPopup = async function (provider) {
    return firebase.auth().signInWithPopup(provider)
}

export const signInWithGoogle = function () {
    return signInWithPopup(new firebase.auth.GoogleAuthProvider())
}

export const signInWithFacebook = function () {
    return signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

export const signInWithEmailAndPassword = function (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
}

export const createUserWithEmailAndPassword = function (email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const signOut = function () {
    return firebase.auth().signOut()
}

export const getCurrentUser = function () {
    return firebase.auth().currentUser
}


export const updatePassword = async function (currentPassword, newPassword) {
    await emailReauthenticate(currentPassword)
    const user = getCurrentUser()
    await user.updatePassword(newPassword)
}

export const emailReauthenticate = async function (password) {
    const user = getCurrentUser()
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password)
    await user.reauthenticateAndRetrieveDataWithCredential(credential)
}

export const socialReauthenticate = async function () {
    const user = getCurrentUser()
    const providerId = user.providerData[0].providerId
    const provider = new (providers.getAuthProvider(providerId))()
    await user.reauthenticateWithPopup(provider)
}
