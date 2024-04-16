<template>
  <header>
    <div class="logo-container">
      <img src="../../public/img/RASBIOTECA(4)(1)(1).png" alt="Logo" class="logo" />
    </div>
    <button class="Mobile" @click="toggleMenu">☰</button>
    <nav class="navMobile" :class="{ 'open': isOpen }">
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
  name: 'HeaderVue',
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    }
  }
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

.Mobile {
  display: none;
  font-size: 1.5rem;
  background-color: transparent;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
}

.Mobile:focus {
  outline: none;
}

.logo-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo {
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

@media (max-width: 768px) {
  
  .logo{
    width: 50%;
  }

  .Mobile {
    display: block;
  }
  
  .navMobile {
    display: none;
  }

  .navMobile ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0;
  }

  .navMobile li {
    margin: 0.5rem 0;
  }

  .navMobile a {
    font-size: 0.8rem;
  }

  .navMobile.open {
    display: flex;
  }
}
</style>
