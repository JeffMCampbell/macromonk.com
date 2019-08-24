import { reduce, isEmpty } from 'lodash'

export default {
    computed: {
        formIsValid () {
            if (isEmpty(this.fields)) {
                return false
            }

            const keys = Object.keys(this.fields)

            return !!reduce(keys, (carry, field) => {
                return carry && this.fields[field] && this.fields[field].valid
            }, true)
        },
        isFormValid () {
            return this.formIsValid
        },
        isFormDirty () {
            return Object.keys(this.fields).some(this.isFieldDirty)
        }
    },
    methods: {
        onFieldChanged (callback) {
            Object.keys(this.fields).map((field) => {
                this.$watch(field, callback)
            })
        },
        validateForm () {
            return this.$validator.validate()
        },
        fieldHasError (field) {
            return this.isFieldDirty(field) && this.errors.has(field)
        },
        getFieldError (field) {
            return this.errors.first(field)
        },
        isFieldDirty (field) {
            if (isEmpty(this.fields)) {
                return false
            }

            return this.fields[field] && this.fields[field].dirty
        }
    }
}
