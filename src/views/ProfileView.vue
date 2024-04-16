<template>
  <div>
    <h1>PERFIL</h1>
    <div v-if="user">
      <p>Nombre: {{ user.client_name }}</p>
      <p>Nickname: {{ user.client_nickname }}</p>
      <p>Email: {{ user.client_email }}</p>
    </div>
    <div v-else>
      <p>Cargando...</p>
    </div>
    <FooterVue />
  </div>
</template>
<script>
import FooterVue from '@/components/FooterVue.vue';
export default {
  name: 'ProfileView',
  components: {
    FooterVue,
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/clients/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            this.user = data.body;
          } else {
            console.error('Error fetching user data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }
}
</script>