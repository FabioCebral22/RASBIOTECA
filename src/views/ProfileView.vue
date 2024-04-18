<template>
  <div class="body">
    <div class="header">
      <img src="/public/img/discoteca.jpg" class="header-img">
      <div class="user-info" v-if="user">
        <img :src="user.profile_image" alt="Profile image" class="profile-image">
        <div class="info">
          <h1>{{ user.client_name }}</h1>
          <h2>({{ user.client_nickname }})</h2>
          <p>{{ user.client_email }}</p>
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
  </div>
</template>

<script>
import EntradaVue from '@/components/EntradaVue.vue';
import router from '@/router';

export default {
  name: 'ProfileView',
  components: {
    EntradaVue,
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
      } else {
        console.log("No hay token");
        router.push("/");
      }
    }
  }
}
</script>


<style scoped>
.body {
  color: #E3E3E3;
  display: flex;
  flex-direction: column;
}

.user{
  height: 40rem;
}

.headerimg {
  width: 100%;
  height: 15rem;
  object-fit: cover;
  position: relative;
}

.infouser {
  text-align: center;
  width: 33%;
}

.usuario {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


.profile-image {
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  position: absolute;
  top: calc(15rem - -1rem);
  left: 6%;
  display: block;
  border: 1rem solid #333337;
}


.img1{
  width: 33%;
}

.email {
  font-size: 1rem;
  width: 33%;
  margin: auto;
  text-align: center;
}

.rose {
  color: #FF008C;
  font-size: 2rem;
}

.act-rev{
  width: 100%;
  margin-top: 15rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.actividades{
  width: 100%;
  margin: auto;
}

.entradas{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 2rem;
  align-items: center;
}

</style>