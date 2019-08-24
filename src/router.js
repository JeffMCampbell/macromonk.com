import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing.vue'
import Dashboard from './views/Dashboard.vue'
import Account from './views/Account.vue'
import IngredientList from './views/ingredients/IngredientsList.vue'
import CreateIngredient from './views/ingredients/CreateIngredient.vue'
import EditIngredient from './views/ingredients/EditIngredient.vue'
import ViewIngredient from './views/ingredients/ViewIngredient.vue'
import RecipeList from './views/recipes/RecipesList.vue'
import CreateRecipe from './views/recipes/CreateRecipe.vue'
import EditRecipe from './views/recipes/EditRecipe.vue'
import ViewRecipe from './views/recipes/ViewRecipe.vue'
import MealList from './views/meals/MealList.vue'
import CreateMeal from './views/meals/CreateMeal.vue'
import EditMeal from './views/meals/EditMeal.vue'
import ViewMeal from './views/meals/ViewMeal.vue'
import DayList from './views/days/DayList.vue'
import CreateDay from './views/days/CreateDay.vue'
import EditDay from './views/days/EditDay.vue'
import ViewDay from './views/days/ViewDay.vue'
import Logout from './views/Logout.vue'
import store from '@/store'
import authService from '@/services/auth'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'landing',
            component: Landing,
            meta: { requiresGuest: true }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/ingredients',
                    name: 'ingredients',
                    component: IngredientList,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/ingredients/create',
                    name: 'create-ingredient',
                    component: CreateIngredient,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/ingredients/:ingredientId/edit',
                    name: 'edit-ingredient',
                    component: EditIngredient,
                    props: true,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/ingredients/:ingredientId',
                    name: 'view-ingredient',
                    component: ViewIngredient,
                    props: true,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/recipes',
                    name: 'recipes',
                    component: RecipeList,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/recipes/create',
                    name: 'create-recipe',
                    component: CreateRecipe,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/recipes/:recipeId/edit',
                    name: 'edit-recipe',
                    component: EditRecipe,
                    props: true,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/recipes/:recipeId',
                    name: 'view-recipe',
                    component: ViewRecipe,
                    props: true,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/meals',
                    name: 'meals',
                    component: MealList,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/meals/create',
                    name: 'create-meal',
                    component: CreateMeal,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/meals/:mealId/edit',
                    name: 'edit-meal',
                    component: EditMeal,
                    props: true,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/meals/:mealId',
                    name: 'view-meal',
                    component: ViewMeal,
                    props: true,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/days',
                    name: 'days',
                    component: DayList,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/days/create',
                    name: 'create-day',
                    component: CreateDay,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/days/:dayId',
                    name: 'view-day',
                    component: ViewDay,
                    props: true,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/days/:dayId/edit',
                    name: 'edit-day',
                    component: EditDay,
                    props: true,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/account',
                    name: 'account',
                    component: Account,
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    if (!store.state.initialized) {
        try {
            await authService.init()
        } catch (error) {
            return
        }
    }

    if (to.meta.requiresGuest && store.getters['isAuthenticated']) {
        next({ name: 'ingredients' })
        return
    }

    if (to.meta.requiresAuth && !store.getters['isAuthenticated']) {
        next({ name: 'landing' })
        return
    }

    next()
})

export default router
