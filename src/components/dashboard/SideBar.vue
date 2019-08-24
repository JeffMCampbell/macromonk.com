<template>
  <aside class="pt-5">
    <router-link class="flex items-center no-underline text-white text-md uppercase text-sm pl-8 py-5" :class="{ 'bg-theme-red-1': option.routesToMatch.includes($route.name) }" v-for="option in options" :key="option.route" :to="{ name: option.route }">
      <component :is="option.icon" class="w-5 h-5 fill-current mr-4"/> {{ option.label }}
    </router-link>
  </aside>
</template>

<script>
import IngredientIcon from '@/components/svg/IngredientIcon'
import MealIcon from '@/components/svg/MealIcon'
import DayIcon from '@/components/svg/DayIcon'

export default {
    name: 'side-bar',
    components: { IngredientIcon, MealIcon, DayIcon },
    data () {
        return {
            options: [
                { label: 'Ingredients', route: 'ingredients', icon: 'ingredient-icon', routesToMatch: ['ingredients', 'create-ingredient', 'edit-ingredient', 'view-ingredient'] },
                { label: 'Recipes', route: 'recipes', icon: 'meal-icon', routesToMatch: ['recipes', 'create-recipe', 'edit-recipe', 'view-recipe'] },
                { label: 'Meals', route: 'meals', icon: 'meal-icon', routesToMatch: ['meals', 'create-meal', 'edit-meal', 'view-meal'] },
                { label: 'Days', route: 'days', icon: 'day-icon', routesToMatch: ['days', 'create-day', 'edit-day', 'view-day'] }
            ]
        }
    }
}
</script>
