import { get, has } from 'lodash'
import firebase from '@/firebase/firebase'

const socialProviders = {
    'google.com': firebase.auth.GoogleAuthProvider,
    'facebook.com': firebase.auth.FacebookAuthProvider
}

const getAuthProvider = function (providerId) {
    return get(socialProviders, providerId)
}

const isSoicalProvider = function (providerId) {
    return has(socialProviders, providerId)
}

export default {
    getAuthProvider,
    isSoicalProvider
}
