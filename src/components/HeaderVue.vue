<template>
  <header>
    <div class="logo-container">
      <img src="../../public/img/RASBIOTECA(4)(1)(1).png" alt="Logo" class="logo" />
    </div>
    <nav>
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Clubs</a></li>
        <li><a href="#">Entradas</a></li>
        <li><a href="#">Perfil</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderVue'
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

header {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #1A1919;
}

.logo-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo{
  width: 20%;
}

nav ul {
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
}

nav li {
  margin: 0 10px;
}

nav a {
  font-size: 1.3rem;
  color: #FFFFFF;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;
}

nav a:hover, nav a.active {
  border-bottom-color: #FF008C;
}
</style>