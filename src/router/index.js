import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CreateClub from '@/views/CreateClub.vue'
import CreateEvent from '@/views/CreateEvent.vue'
import ClubsView from '@/views/ClubsView.vue'
import ClubDetailsView from '@/views/ClubDetailsView.vue'

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
      path: '/clubs',
      name: 'Clubs',
      component: ClubsView
    },
    {
      path: '/clubs/:clubId',
      name: 'ClubDetails',
      component: ClubDetailsView
    },
    {
      path: '/CreateEvent/:clubId',
      name: 'CreateEvent',
      props: true,
      component: CreateEvent,

    }
    
  ]
})

export default router