<template>
  <aside class="pt-5">
    <router-link class="flex items-center no-underline text-white text-md uppercase text-sm pl-8 py-5" :class="{ 'bg-theme-red-1': option.routesToMatch.includes($route.name) }" v-for="option in options" :key="option.route" :to="{ name: option.route }">
      <component :is="option.icon" class="w-5 h-5 fill-current mr-4"/> {{ option.label }}
    </router-link>
  </aside>
</template>

<script>
import ScheduleIcon from '@/components/svg/ScheduleIcon'
import IngredientIcon from '@/components/svg/IngredientIcon'
import RecipeIcon from '@/components/svg/RecipeIcon'
import MealIcon from '@/components/svg/MealIcon'
import DayIcon from '@/components/svg/DayIcon'
import links from '@/resources/links'

export default {
    name: 'side-bar',
    components: { ScheduleIcon, IngredientIcon, MealIcon, RecipeIcon, DayIcon },
    data () {
        return {
            options: links
        }
    }
}
</script>
