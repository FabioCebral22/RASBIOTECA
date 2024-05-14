<template>
  <div>
    <button @click="openCamera">Abrir cámara</button>
    <video ref="video" autoplay></video>
    <canvas ref="canvas" style="display: none;"></canvas>
    <div v-if="qrResult !== null">
      <p>QR Detectado: {{ qrResult }}</p>
      <button @click="checkQRCode">Comprobar código</button>
      <p v-if="loading">Comprobando código...</p>
      <p v-if="result !== null">Resultado: {{ result }}</p>
    </div>
    <div class="header">
      <img src="/public/img/discoteca.jpg" class="header-img">
      <div class="company-info" v-if="company">
        <img :src='"http://localhost:3001" + company.company_img' alt="Imagen de perfil" class="profile-image">
        <div class="info">
          <h1>{{ company.company_name }}</h1>
          <h2>({{ company.company_email }})</h2>
          <p class="email">{{ company.company_info }}</p>
          <router-link :to="{ name: 'EditCompany', params: { company_nif: company.company_nif } }"
            class="btn-edit">Editar perfil</router-link>
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
    <a href="/CreateClub" class="btn-create">
      AÑADIR NUEVO CLUB
    </a>
  </div>
</template>

<script>
import router from '@/router';
import ClubCard from '@/components/ClubCard.vue';
import Quagga from 'quagga';

export default {
  name: 'ProfileCompany',
  components: {
    ClubCard,
  },
  data() {
    return {
      company: null,
      clubs: null,
      qrResult: null,
      loading: false,
      result: null,
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
          } else {
            console.error('Error al obtener los clubes propiedad de la compañía');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
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
    },
    openCamera() {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: this.$refs.video,
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader", "2of5_reader", "code_93_reader"],
        },
      }, function(err) {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected((result) => {
        if (!this.qrResult) {
          this.qrResult = result.codeResult.code;
          Quagga.stop();
        }
      });
    },
    checkQRCode() {
  this.loading = true;
  const tokenParts = token.split('.');
  const payload = JSON.parse(atob(tokenParts[1]));
  const requestBody = {
    qr_code: this.qrResult, 
    company_email: payload.companyData.company_email,
  };

  fetch('/checkqr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al verificar el código QR');
    }
    return response.json();
  })
  .then(data => {
    this.result = 'El código existe en la base de datos.';
  })
  .catch(error => {
    console.error('Error al verificar el código QR:', error);
    this.result = 'El código no existe en la base de datos.';
  })
  .finally(() => {
    this.loading = false; 
  });
},

  },
  created() {
    const token = localStorage.getItem('token');
    if (this.checkIsCompany(token)) {
      this.fetchCompanyData();
      this.fetchOwnedClubs();
    }
  },
};
</script>


<style scoped>
.btn-edit {
  display: inline-block;
  background-color: #BD0068;
  color: rgb(219, 219, 219);
  padding: 2px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.btn-edit:hover {
  background-color: #960153;
}

.btn-edit:active {
  background-color: #910050;
}

.btn-create {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-create:hover {
  background-color: #45a049;
}

.btn-create:active {
  background-color: #3e8e41;
}

.body {
  color: #E3E3E3;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}

.next {
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