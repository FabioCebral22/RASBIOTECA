<template>
  <div class="home">
    <div class="content">
      <h1>¡Bienvenido a RASBIOTECA, el futuro de la vida nocturna comienza aquí!</h1>
      <router-link to="/events"><button>Entradas</button></router-link>
      <router-link to="/">
        <button v-on:click="handleLogout">LogOut</button>
      </router-link>
    </div>
  </div>
      <EventsView></EventsView>
</template>

<script>
import EventsView from './EventsView.vue';
export default {
  name: 'HomeView',
  components: {
    EventsView
  },
  data() {
    return {
      user: null,
      company: null,
      events: null,
    };
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$router.push("/");
    },
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://raul-argemi-7e6.alwaysdata.net/api/clients/profile', {
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
          this.handleTokenError();
        }
      } catch (error) {
        console.error('Error:', error);
        this.handleTokenError();
      }
    },
    async fetchCompanyData() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://raul-argemi-7e6.alwaysdata.net/api/company/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          this.company = data.body;
        } else {
          console.error('Error fetching company data');
          this.handleTokenError();
        }
      } catch (error) {
        console.error('Error:', error);
        this.handleTokenError();
      }
    },
    checkToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.handleTokenError();
        return;
      }
      if (this.checkIsCompany(token)) {
        this.fetchCompanyData();
      } else {
        this.fetchUserData();
      }
    },
    checkIsCompany(token) {
      try {
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload.companyData && payload.companyData.isCompany === true;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    },
    handleTokenError() {
      localStorage.removeItem('token');
      this.$router.push("/");
    },
  },
  created() {
    this.checkToken();
  }
};
</script>



<style scoped>
.home {
  background: url('/img/discoteca1.jpg') no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h2{
    text-align: center;
    color: #E3E3E3;

  }

.content {
  text-align: center;
}

.content h1 {
  font-size: 3rem;
  color: #FFFFFF;
}

button {
  padding: 20px 40px;
  font-size: 1.5em;
  margin-top: 20px;
  background-color: #FFFFFF;
  color: #FF008C;
  border: none;
  border-radius: 50px;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 1.5rem;
  cursor: pointer;
}

button:hover {
  background-color: #FF008C;
  color: #FFFFFF;
}

.upcoming {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #FFFFFF;
  background-color: #333337;
}

.upcoming h2 {
  font-size: 3rem;
  margin-bottom: 2rem;
}


@media screen and (max-width: 479px) {
  .home {
    height: 100%;
  }

  .content h1 {
    font-size: 2rem;
  }

  button {
    display: none;
    padding: 10px 20px;
    font-size: 1rem;
  }

  .upcoming h2 {
    font-size: 2rem;
  }
}
</style>