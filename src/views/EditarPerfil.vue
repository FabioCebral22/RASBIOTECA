<template>
  <div class="editar-perfil">
    <h1>Información de Usuario</h1>
    <img :src="profile.client_img" alt="Image" class="profile-image" />
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="profile.client_email" type="email" class="input-field" />
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input id="password" v-model="profile.client_password" type="password" class="input-field" />
      </div>

      <div class="form-group">
        <label for="nickname">Apodo:</label>
        <input id="nickname" v-model="profile.client_nickname" type="text" class="input-field" />
      </div>

      <div class="form-group">
        <label for="profilePicture">Foto de Perfil:</label>
        <input id="profilePicture" type="file" @change="onFileChange" class="input-field" />
      </div>

      <button type="submit" class="submit-button">Enviar</button>
    </form>

    <div>
      <h2>Datos no editables</h2>
      <p>Nombre: {{ profile.client_name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditarPerfil',
  data() {
    return {
      profile: {
        client_id: '',
        client_email: '',
        client_password: '',
        client_nickname: '',
        client_img: '',
        client_name: ''
      }
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.profile.client_img = URL.createObjectURL(file);
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('client_email', this.profile.client_email);
      formData.append('client_password', this.profile.client_password);
      formData.append('client_nickname', this.profile.client_nickname);
      formData.append('client_img', this.profile.client_img);

      try {
        const response = await fetch(`/clients/edit/${this.profile.client_id}`, {
          method: 'PUT',
          body: formData
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  async created() {
    try {
      const response = await fetch('/clients/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      this.profile = data.body;
    } catch (error) {
      console.error('Error fetching client:', error);
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