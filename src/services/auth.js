import store from '@/store'
import { DefaultSchedule } from '@/models/User'
import UserService from '@/services/user-service'

import {
    onAuthStateChanged,
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updatePassword
} from '@/firebase/auth'

const init = async function init () {
    const account = await onAuthStateChanged()

    if (account) {
        try {
            await refreshAll(account)
        } catch (error) {
            await logout()
        }
    }

    store.commit('setInitialized', true)
}

const refreshAll = async function (account) {
    await store.dispatch('refreshUser', { uid: account.uid, email: account.email })
    await store.dispatch('refreshMacros')
}

const oauthLogin = async function (response) {
    if (response.additionalUserInfo.isNewUser) {
        await createUserForAccount(response.user)
    }

    await refreshAll(response.user)
}

const createUserForAccount = function (account) {
    return UserService.setUser(account.uid, {
        name: account.displayName,
        schedule: DefaultSchedule
    })
}

const googleLogin = async function () {
    await oauthLogin(await signInWithGoogle())
}

const facebookLogin = async function () {
    await oauthLogin(await signInWithFacebook())
}

const emailLogin = async function (email, password) {
    const response = await signInWithEmailAndPassword(email, password)
    refreshAll(response.user)
}

const createEmailAccount = async function (name, email, password) {
    const response = await createUserWithEmailAndPassword(email, password) // whats name?
    await createUserForAccount(response.user)
    refreshAll(response.user)
}

const logout = async function () {
    await signOut()
    store.commit('setUser', null)
}


const updateMyPassword = function (currentPassword, newPassword) {
    return updatePassword(currentPassword, newPassword)
}

export default {
    init,
    googleLogin,
    facebookLogin,
    emailLogin,
    createEmailAccount,
    updateMyPassword,
    logout
}
