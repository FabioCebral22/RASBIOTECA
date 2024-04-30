import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CreateClub from '@/views/CreateClub.vue'
import LoginAdmin from '@/components/LoginAdmin.vue'
import RegisterAdmin from '@/components/RegisterAdmin.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editarPerfil',
      name: 'editarPerfil',
      component: () => import('../views/EditarPerfil.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/CreateClub',
      name: 'CreateClub',
      component: CreateClub
    },
    {
      path: '/admin',
      name: 'admin',
      component: LoginAdmin
    },
    // {
    //   path: '/admin/register',
    //   name: 'adminRegister',
    //   component: RegisterAdmin
    // }
    {
      path: '/adminView',
      name: 'adminView',
      component: AdminView
    }
  ]
})

export default router