<template>
    <div class="editar-club">
      <h1>Editar Club</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="clubName">Nombre del Club:</label>
          <input id="clubName" v-model="club.club_name" type="text" class="input-field" required />
        </div>
  
        <div class="form-group">
          <label for="clubRules">Reglas del Club:</label>
          <textarea id="clubRules" v-model="club.club_rules" class="input-field" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="clubDescription">Descripción del Club:</label>
          <textarea id="clubDescription" v-model="club.club_description" class="input-field" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="clubSchedule">Horario del Club:</label>
          <input id="clubSchedule" v-model="club.club_schedule" type="text" class="input-field" required />
        </div>
  
        <div class="form-group">
          <label for="clubLogo">Logo del Club:</label>
          <input id="clubLogo" type="file" ref="fileInput" class="input-field" @change="onFileChange" />
        </div>
  
        <button type="submit" class="submit-button" :disabled="!formIsValid">Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'EditClub',
    data() {
      return {
        club: {
          club_name: '',
          club_rules: '',
          club_description: '',
          club_schedule: '',
          club_img: null,
        },
      };
    },
    computed: {
      formIsValid() {
        return (
          this.club.club_name &&
          this.club.club_rules &&
          this.club.club_description &&
          this.club.club_schedule
        );
      },
    },
    methods: {
        async submitForm() {
  const formData = new FormData();
  formData.append('club_name', this.club.club_name);
  formData.append('club_rules', this.club.club_rules);
  formData.append('club_description', this.club.club_description);
  formData.append('club_schedule', this.club.club_schedule);
  
  if (this.club.club_img) {
    formData.append('club_img', this.club.club_img);
  }
  
  try {
    const clubId = this.$route.params.clubId;
    const response = await fetch(`http://localhost:3001/api/clubs/edit/${clubId}`, {
      method: 'PUT',
      body: formData,
    });
    const responseData = await response.json();
  } catch (error) {
    console.error(error);
  }
},

      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.club.club_img = file;
        }
      },
      async fetchClubDetails() {
        try {
          const clubId = this.$route.params.clubId;
          const response = await fetch(`http://localhost:3001/api/clubDetails`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clubId }),
          });
          const responseData = await response.json();
          this.club = responseData.body;
        } catch (error) {
          console.error(error);
        }
      },
    },
    created() {
      this.fetchClubDetails();
    },
  };
  </script>
  
  <style scoped>
  .editar-club {
    color: #000000;
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
    color: #FFFFFF;
    border: none;
    cursor: pointer;
  }
  </style>
  