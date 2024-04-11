<template>
      <HeaderVue />
  <div class="home">
    <div class="content">
      <h1>
¡Bienvenido a RASBIOTECA, el futuro de la vida nocturna comienza aquí!</h1>
      <button>Entradas</button>
    </div>
  </div>
</template>

<script>
import HeaderVue from '../components/HeaderVue.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderVue
  }
}
</script>

<style scoped>
.home {
  background: url('../../public/img/discoteca1.jpg') no-repeat center center scroll; 
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
}

button:hover {
  background-color: #FF008C;
  color: #FFFFFF;
}
</style>