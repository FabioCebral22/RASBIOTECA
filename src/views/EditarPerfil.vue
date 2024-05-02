<template>
  <div class="editar-perfil">
    <h1>Información de Usuario</h1>
    <img :src='"http://localhost:3001" + user.client_img' >

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input id="password" v-model="profile.client_password" type="password" class="input-field" required />
      </div>

      <div class="form-group">
        <label for="nickname">Apodo:</label>
        <input id="nickname" v-model="profile.client_nickname" type="text" class="input-field" required />
      </div>

      <div class="form-group">
        <label for="profilePicture">Foto de Perfil:</label>
        <input id="profilePicture" type="file" ref="fileInput" class="input-field" @change="onFileChange" />
      </div>

      <button type="submit" class="submit-button" :disabled="!formIsValid">Enviar</button>
    </form>

    <div>
      <h2>Datos no editables</h2>
      <p v-if="user">Nombre: {{ user.client_name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditarPerfil',
  data() {
    return {
      user: null,
      profile: {
        client_email: '',
        client_password: '',
        client_nickname: '',
        client_img: '',
      },
    };
  },
  computed: {
    formIsValid() {
      return (
        this.profile.client_password &&
        this.profile.client_nickname &&
        this.profile.client_img &&
        this.user
      );
    },
  },
  methods: {
    async submitForm() {
      const data = {
        client_id: this.user.client_id,
        client_password: this.profile.client_password,
        client_nickname: this.profile.client_nickname,
        client_img: this.profile.client_img,
      };
      console.log(data)

      try {
        const response = await fetch("http://localhost:3001/api/clients/edit", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profile.client_img = file;
      }
    },
  },
  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch('http://localhost:3001/api/clients/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
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
  },
};
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