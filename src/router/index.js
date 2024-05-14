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
import EditEvent from '@/views/EditEvent.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import EditClub from '@/views/EditClub.vue'
import EditCompanyProfile from '@/views/EditCompanyProfile.vue'
import EditClientProfile from '@/views/EditClientProfile.vue'
import ReviewForm from '@/components/ReviewForm.vue'

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
    // },
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
    // {
    //   path: '/events/:eventId',
    //   name: 'EventDetails',
    //   component: EventDetailsView
    // },
    {
      path: '/checkout/:ticketName/:ticketQuantity/:ticketPrice',
      name: 'checkout',
      component: CheckoutView,
      props: true,
    },
    {
      path: '/profile/edit/:company_nif',
      name: 'EditCompany',
      component: EditCompanyProfile
    },
    {
      path: '/clubs/edit/:clubId',
      name: 'EditClub',
      component: EditClub,
      props: true
  },
  {
    path: '/profile/edit/client/:client_id',
    name: 'EditClient',
    component: EditClientProfile
  },
  {
    path: '/events/edit/:eventId',
    name: 'EditEvent',
    component: EditEvent,
    props: true
},
{
  path: '/review/form/:ticket_id/:client_id',
  name: 'ReviewForm',
  component: ReviewForm
}
  ]
})

export default router