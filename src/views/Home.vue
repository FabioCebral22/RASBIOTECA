<template>
  <div class="home">
    <div class="content">
      <h1>
        ¡Bienvenido a RASBIOTECA, el futuro de la vida nocturna comienza aquí!</h1>
      <button>Entradas</button>
    </div>
  </div>
  <div class="upcoming">
    <h2>Próximamente</h2>
  </div>
</template>
<script>

export default {
  name: 'HomeView',
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

.content h1{
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

.entry {
  display: flex;
  align-items: center;
  background-color: #808080;
  width: 80%; 
  height: 12.5rem;
  border-radius: 1rem; 
  margin-bottom: 2rem;
  padding: 1rem;
}

.entry-image {
  width: 100px; 
  height: 100px;
  border-radius: 50%;
  margin-right: 2rem;
}

.entry-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.entry-date-time {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.entry-date, .entry-time {
  background-color: #FF008C;
  color: #FFFFFF;
  font-size: 0.8rem;
  padding: 0.3125rem;
  border-radius: 0.3125rem;
}

.entry-title {
  font-size: 1.5rem;
}
</style>