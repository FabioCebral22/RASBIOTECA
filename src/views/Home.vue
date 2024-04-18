<template>
  <div class="home">
    <div class="content">
      <h1>
        ¡Bienvenido a RASBIOTECA, el futuro de la vida nocturna comienza aquí!</h1>
      <button>Entradas</button>
     <RouterLink to="/"> 
      <button v-on:click="handleLogout">LogOut</button>

     </RouterLink> 

    </div>
  </div>
  <div class="upcoming">
    <h2>Próximamente</h2>
    <EntradaVue />
    <EntradaVue />
    <EntradaVue />

  </div>
</template>

<script>
import EntradaVue from '../components/EntradaVue.vue'

export default {
  name: 'HomeView',
  components: {
    EntradaVue,
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      console.log("Sesión Cerrada")
    }
  }
}
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