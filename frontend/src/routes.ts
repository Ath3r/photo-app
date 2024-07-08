import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { useStore } from 'vuex'
// Import layout
import MainLayout from './components/layout/MainLayout.vue'

// Import views
import HomeView from "./views/Home.vue"
import UsersView from "./views/Users.vue"
import NotFoundView from "./views/404.vue"
import LoginView from "./views/Login.vue"
import SignupView from "./views/Signup.vue"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
        meta: {
          requiresAuth: true,
          title: 'Dashboard'
        },
      },
      {
        path: 'users',
        name: 'Users',
        component: UsersView,
        meta: {
          requiresAuth: true,
          permission: 'user:readAll',
          title: 'User Management'
        },
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      requiresAuth: false,
      title: 'Login'
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    meta: {
      requiresAuth: false,
      title: 'Sign Up'
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      requiresAuth: false,
      title: '404 Not Found'
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const store = useStore()

  // Check authentication
  const isAuthenticated = store.state.user?.user?.id && localStorage.getItem('token') 

  // Check permissions
  const hasPermission = (permission: string) => {
    const userPermissions = store?.state?.user?.user?.role?.permission || []
    console.log(userPermissions)
    return true
    // return userPermissions.includes(permission)
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.permission && !hasPermission(to.meta.permission as string)) {
    next('/404')
  } else {
    document.title = `${to.meta.title}`
    next()
  }
})

export default router