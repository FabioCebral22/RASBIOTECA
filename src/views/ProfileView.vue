<template>
  <div class="body">
    <div class="header">
      <img src="/public/img/discoteca.jpg" class="header-img">
      <div class="user-info" v-if="user">
        <img src="/public/img/discoteca.jpg" alt="Profile image" class="profile-image">
        <div class="info">
          <h1>{{ user.client_name }}</h1>
          <h2>({{ user.client_nickname }})</h2>
          <p class="email">{{ user.client_email }}</p>
        </div>
      </div>
      <div class="company-info" v-if="company">
        <img src="/public/img/discoteca.jpg" alt="Profile image" class="profile-image">
        <div class="info">
          <h1>{{ company.company_name }}</h1>
          <h2>({{ company.company_email }})</h2>
          <p class="email">{{ company.company_info }}</p>
          <button v-on:click="mostrarModal">AÑADIR CLUB</button>
          <ClubFormModal :show="this.showModal" @close="showModal = false" />
        </div>
      </div>
    </div>

    <div class="activities-reviews">
      <section class="activities">
        <h1 class="rose">Actividades Recientes</h1>
        <div class="entries">
          <EntradaVue />
        </div>
      </section>

      <section class="reviews">
        <h1 class="rose">Reviews</h1>
      </section>
    </div>


    <ClubFormModal :show="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import EntradaVue from '@/components/EntradaVue.vue';
import router from '@/router';
import ClubFormModal from '../components/ClubForm.vue';

export default {
  name: 'ProfileView',
  components: {
    EntradaVue,
    ClubFormModal,
  },
  data() {
    return {
      user: null,
      company: null,
      showModal: false,
    };
  },
  methods: {
    mostrarModal() {
      this.showModal = true;
      console.log("Se ejecuto en : " + this.showModal)
    },

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
      } else {
        console.log("No hay token");
        router.push("/");
      }
    },
    async fetchCompanyData() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/company/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            this.company = data.body
          } else {
            console.error('Error fetching company data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.log("No hay token");
        router.push("/");
      }
    },
    checkIsCompany(token) {
      try {
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        if (payload.companyData.isCompany === true) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    }
  },
  created() {
    const token = localStorage.getItem('token');

    if (this.checkIsCompany(token)) {
      console.log('El token contiene la propiedad isCompany en true.');
      this.fetchCompanyData()
    } else {
      console.log('El token no contiene la propiedad isCompany en true.');
      this.fetchUserData();
    }
  },
};
</script>

<style scoped>
/* Estilos para PC y tablet */
.body {
  color: #E3E3E3;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}

.header {
  position: relative;
}

.header-img {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

.user-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}

.profile-image {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-right: 1rem;
  margin-left: 1rem;
}

.info {
  flex-grow: 1;
}

.info h1 {
  margin-bottom: 0.25rem;
}

.info h2 {
  margin-top: 0.25rem;
}

.email {
  font-size: 0.8rem;
}

.rose {
  color: #FF008C;
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
}

.activities-reviews {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.activities,
.reviews {
  width: 100%;
  margin-top: 2rem;
}

.entries {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* Estilos para móvil */
@media screen and (max-width: 479px) {
  .profile-image {
    width: 6rem;
    height: 6rem;
  }

  .email {
    font-size: 0.7rem;
  }

  .rose {
    font-size: 1.2rem;
  }

  .activities,
  .reviews {
    margin-top: 1rem;
  }
}
</style>