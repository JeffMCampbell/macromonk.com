import MacroModel from '@/models/MacroModel'
import MacroCalculator from '@/services/macro-calculator'

export default class extends MacroModel {
    constructor (day) {
        const macros = MacroCalculator.forDay(day)
        super(day.id, day.name, macros.calories, macros.protein, macros.carbs, macros.fat)
        this.meals = day.meals
    }
}
