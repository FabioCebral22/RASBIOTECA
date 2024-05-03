import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CreateClub from '@/views/CreateClub.vue'
import LoginAdmin from '@/components/LoginAdmin.vue'
import RegisterAdmin from '@/components/RegisterAdmin.vue'
import AdminView from '@/views/AdminView.vue'
import CreateEvent from '@/views/CreateEvent.vue'
import ClubsView from '@/views/ClubsView.vue'
import ClubDetailsView from '@/views/ClubDetailsView.vue'
import EventsView from '@/views/EventsView.vue'
import EventDetailsView from '@/views/EventDetailsView.vue'
import CheckoutView from '@/views/CheckoutView.vue'

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

    },
    {
      path: '/events',
      name: 'EventsView',
      component: EventsView
    },
    {
      path: '/events/:eventId',
      name: 'EventDetails',
      component: EventDetailsView
    },
    {
      path: '/checkout/:eventId/:quantity/:ticketType',
      name: 'checkout',
      component: CheckoutView,
      props: true, // Permite pasar los parámetros como props al componente
    },
  ]
})

export default router