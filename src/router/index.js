import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useUserStore } from '@/store/user'
import { getCurrentUser } from '../database/firebase'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('../views/Login.vue')
    },
    {
        path: "/signup",
        name: "Signup",
        component: () => import('../views/Signup.vue')
    },
  ]
});

router.beforeEach(async (to, from) => {
    const store = useUserStore();
    const { updateUser } = store;
    try {
        const user = await getCurrentUser();
        updateUser(user.displayName, user.email)
        if (to.name === 'Login') {
            return { name : 'Home' }
        }
        return true
    } catch (error) {
        console.log(error);
        return { name : 'Login' }
    }
  })

export default router

