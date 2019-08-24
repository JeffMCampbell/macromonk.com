import store from '@/store'
import firebase from '@/firebase/firebase'
import providers from '@/firebase/providers'
import userService from '@/services/user-service'
import ingredientService from '@/services/ingredient-service'
import recipeService from '@/services/recipe-service'
import mealService from '@/services/meal-service'
import dayService from '@/services/day-service'

const init = async function init () {
    return new Promise((resolve) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async function (account) {
            unsubscribe()

            if (account) {
                try {
                    const userData = await getUserData(account.uid)
                    storeUser(account.uid, userData.name, account.email, account.providerData[0].providerId)
                    await refreshData()
                } catch (error) {
                    await logout()
                }
            }

            store.commit('setInitialized', true)
            resolve()
        })
    })
}

const getUserData = async function (id) {
    const data = await userService.getUser(id)

    return {
        name: data.name
    }
}

const refreshData = async function () {
    await ingredientService.refreshIngredients()
    await recipeService.refreshRecipes()
    await mealService.refreshMeals()
    await dayService.refreshDays()
}

const storeUser = function (id, name, email, provider) {
    store.commit('setId', id)
    store.commit('setName', name)
    store.commit('setEmail', email)
    store.commit('setProvider', provider)
}

const oauthLogin = async function (provider) {
    const response = await firebase.auth().signInWithPopup(provider)

    if (response.additionalUserInfo.isNewUser) {
        await userService.setUser(response.user.uid, {
            name: response.user.displayName
        })
    }

    const userData = await getUserData(response.user.uid)
    storeUser(response.user.uid, userData.name, response.user.email, response.user.providerData[0].providerId)
    await refreshData()
}

const googleLogin = async function () {
    await oauthLogin(new firebase.auth.GoogleAuthProvider())
}

const facebookLogin = async function () {
    await oauthLogin(new firebase.auth.FacebookAuthProvider())
}

const emailLogin = async function (email, password) {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    const userData = await getUserData(response.user.uid)

    storeUser(response.user.uid, userData.name, response.user.email, response.user.providerData[0].providerId)

    await refreshData()
}

const createEmailAccount = async function (name, email, password) {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
    await userService.setUser(response.user.uid, { name })
    const userData = await getUserData(response.user.uid)

    storeUser(response.user.uid, userData.name, response.user.email, response.user.providerData[0].providerId)

    await refreshData()
}

const logout = async function () {
    await firebase.auth().signOut()
    storeUser(null, null, null, null, null)
}

const updateMyName = async function (name) {
    const user = firebase.auth().currentUser
    await userService.updateUser(user.uid, { name })
    store.commit('setName', name)
}

const updateMyEmail = async function (email, password) {
    await emailReauthenticate(password)
    const user = firebase.auth().currentUser
    await user.updateEmail(email)
    store.commit('setEmail', email)
}

const updateMyPassword = async function (currentPassword, newPassword) {
    await emailReauthenticate(currentPassword)
    const user = firebase.auth().currentUser
    await user.updatePassword(newPassword)
}

const deleteMyAccount = async function () {
    const user = firebase.auth().currentUser
    await user.delete()
    await userService.deleteUser(user.uid)
}

const emailReauthenticate = async function (password) {
    const user = firebase.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password)
    await user.reauthenticateAndRetrieveDataWithCredential(credential)
}

const socialReauthenticate = async function () {
    const user = firebase.auth().currentUser
    const providerId = user.providerData[0].providerId
    const provider = new (providers.getAuthProvider(providerId))()
    await user.reauthenticateWithPopup(provider)
}

export default {
    init,
    googleLogin,
    facebookLogin,
    emailLogin,
    createEmailAccount,
    emailReauthenticate,
    socialReauthenticate,
    updateMyName,
    updateMyEmail,
    updateMyPassword,
    logout,
    deleteMyAccount
}
