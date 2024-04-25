<template>
  <div class="editar-perfil">
    <h1>Información de Usuario</h1>
    <img src="/img/discoteca1.jpg" alt="Image" class="profile-image" />
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input id="name" v-model="profile.name" type="text" class="input-field" />
      </div>

      <div class="form-group">
        <label for="birthdate">Fecha de nacimiento:</label>
        <input id="birthdate" v-model="profile.birthdate" type="date" class="input-field" />
      </div>

      <div class="form-group">
        <label for="phone">Teléfono:</label>
        <input id="phone" v-model="profile.phone" type="tel" class="input-field" />
      </div>

      <div class="form-group">
        <label for="city">Ciudad:</label>
        <input id="city" v-model="profile.city" type="text" class="input-field" />
      </div>

      <div class="form-group">
        <label for="favoriteClub">Discoteca favorita:</label>
        <input id="favoriteClub" v-model="profile.favoriteClub" type="text" class="input-field" />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="profile.email" type="email" class="input-field" />
      </div>

      <div class="form-group">
        <label for="aboutMe">Acerca de mí:</label>
        <textarea id="aboutMe" v-model="profile.aboutMe" class="input-field"></textarea>
      </div>

      <button type="submit" class="submit-button">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditarPerfil',
  data() {
    return {
      profile: {
        name: '',
        birthdate: '',
        phone: '',
        city: '',
        favoriteClub: '',
        email: '',
        aboutMe: ''
      }
    }
  },
  methods: {
    submitForm() {

    }
  }
}
</script>

<style scoped>
.editar-perfil {
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh;
}


.form-group {
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  max-width: 500px;
  margin-bottom: 10px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px 0;
  font-family: 'Poppins', sans-serif;
}

.submit-button {
  width: 50%;
  padding: 10px;
  margin: 20px auto;
  display: block;
  font-family: 'Poppins', sans-serif;
  background-color: #FF008C;
  color: #000000;
  border: none;
  cursor: pointer;
}

.profile-image {
  width: 15rem;
  height: 15rem;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
}
</style>