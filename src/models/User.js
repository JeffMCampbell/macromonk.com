export const DefaultSchedule = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null
}

export default class User {
    constructor (account, userData) {
        this.account = account
        this.userData = userData
    }

    get id () { return this.account.uid }

    get email () { return this.account.email }

    get providerId () { return this.account.providerData[0].providerId }

    get name () { return this.userData.name }

    get schedule () { return this.userData.schedule }
}
