import { round } from 'lodash'

export default class {
    constructor (id, name, calories, protein, carbs, fat) {
        this.id = id
        this.name = name
        this.calories = round(calories, 2)
        this.protein = round(protein, 2)
        this.carbs = round(carbs, 2)
        this.fat = round(fat, 2)
    }

    get fullName () {
        return this.name
    }

    get proteinPercent () {
        return round((this.protein / this.totalMacroGrams) * 100)
    }

    get carbsPercent () {
        return round((this.carbs / this.totalMacroGrams) * 100)
    }

    get fatPercent () {
        return round((this.fat / this.totalMacroGrams) * 100)
    }

    get totalMacroGrams () {
        return this.protein + this.carbs + this.fat
    }
}
