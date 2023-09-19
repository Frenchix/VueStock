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
    {
        path: "/profil",
        name: "Profil",
        component: () => import('../views/Profil.vue')
    },
    {
        path: "/resetPassword",
        name: "ResetPassword",
        component: () => import('../views/ResetPassword.vue')
    },
  ]
});

router.beforeEach(async (to, from) => {
    const store = useUserStore();
    const { updateUser } = store;
    try {
        const user = await getCurrentUser();
        if (!user) {
            if (to.name !== 'Login' && to.name !== 'Signup' && to.name !== 'ResetPassword'){
                throw new Error("Besoin de s'identifier");
            }
        } else {
            if (to.name === 'Login' || to.name === 'Signup' || to.name === 'ResetPassword') {
                return { name : 'Home' }
            }
            updateUser(user.displayName, user.email, user.emailVerified)
        }
        return true
    } catch (error) {
        console.log(error);
        return { name : 'Login' }
    }
  })

export default router

