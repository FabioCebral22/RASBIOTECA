<template>
  <div class="body">
    <div class="header">
      <img src="/public/img/discoteca.jpg" class="header-img">
      <div class="company-info" v-if="company">
        <img src="/public/img/discoteca.jpg" alt="Imagen de perfil" class="profile-image">
        <div class="info">
          <h1>{{ company.company_name }}</h1>
          <h2>({{ company.company_email }})</h2>
          <p class="email">{{ company.company_info }}</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="clubs-list" v-if="clubs && clubs.length > 0">
        <h2 class="next">Clubs que te pertenecen</h2> 
        <ClubCard v-for="club in clubs" :key="club.club_id" :club="club" />
      </div>
      <div v-else>
        <p>No se encontraron clubes para esta compañía.</p>
      </div>
    </div>
    <a href="/CreateClub" class="btn-create"><>AÑADIR</a>

  </div>
</template>

<script>
import router from '@/router';
import ClubCard from '@/components/ClubCard.vue';

export default {
  name: 'ProfileCompany',
  components: {
    ClubCard,
  },
  data() {
    return {
      company: null,
      clubs: null,
    };
  },
  methods: {
    async fetchOwnedClubs() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/companyclubs', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            this.clubs = data.body;
            console.log(this.clubs)
          } else {
            console.error('Error al obtener los clubes propiedad de la compañía');
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
            this.company = data.body;
          } else {
            console.error('Error al obtener los datos de la compañía');
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
        return payload.companyData && payload.companyData.isCompany === true;
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
      this.fetchCompanyData();
      this.fetchOwnedClubs();
    }
  },
};
</script>

<style scoped>
.btn-create {
  display: inline-block;
  background-color: #4CAF50; /* Color de fondo verde */
  color: white; /* Color del texto blanco */
  padding: 10px 20px; /* Espaciado interno */
  text-align: center; /* Alineación del texto */
  text-decoration: none; /* Sin subrayado */
  border-radius: 5px; /* Borde redondeado */
  transition: background-color 0.3s ease; /* Transición suave del color de fondo */
}

.btn-create:hover {
  background-color: #45a049; /* Cambio de color al pasar por encima */
}

.btn-create:active {
  background-color: #3e8e41; /* Cambio de color al hacer clic */
}
/* Estilos para PC y tablet */
.body {
  color: #E3E3E3;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}
.next{
  text-align: center;
}
.header {
  position: relative;
}

.header-img {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

.company-info {
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