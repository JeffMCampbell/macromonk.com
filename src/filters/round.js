import { round } from 'lodash'

export default function (value, precision = 2) {
    return round(value, precision)
}
