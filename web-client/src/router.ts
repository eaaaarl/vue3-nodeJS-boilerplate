import { createRouter, createWebHistory } from "vue-router";
import NonAuthLayout from "./layouts/nonAuthLayout.vue";
import AuthAdminLayout from "./layouts/authAdminLayout.vue";
import { useAuthStore } from "./stores/authStore";
import { useToast } from "vue-toastification";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: NonAuthLayout,
            children: [
                {
                    path: '',
                    name: 'login-page',
                    component: () => import('./pages/loginPage.vue')
                }
            ]
        },
        {
            path: "/",
            component: AuthAdminLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard-page',
                    component: () => import('./pages/dashboardPage.vue'),
                    meta: { requireAuth: true }
                },
                {
                    path: '/student',
                    name: 'student-page',
                    component: () => import('./pages/studentPage.vue'),
                    meta: { requireAuth: true }
                },
                {
                    path: '/form/:operation',
                    name: 'student-form-page',
                    component: () => import('./pages/studentFormPage.vue'),
                    meta: { requireAuth: true }
                }
            ]
        }
    ]
});

router.beforeEach(async (to, from, next) => {

    const toast = useToast();
    const authStore = useAuthStore();
    await authStore.checkAuth();

    const isProtectedRoute = to.matched.some((record) => record.meta.requireAuth);
    const isAuthenticated = authStore.isAuthenticated;

    if (isProtectedRoute && !isAuthenticated) {
        toast.error('Session Expired. Please login to proceed!');
        return next({ name: 'login-page' });
    }

    if (to.name !== "login-page") {
        document.body.classList.remove("login-page");
    } else {
        document.body.classList.add("login-page");
    }

    next();
});


export default router;
