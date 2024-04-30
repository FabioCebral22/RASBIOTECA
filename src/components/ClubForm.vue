<template>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <form @submit.prevent="submitClubData">
          <div class="logo-container btn-group">
            <img class="logotipo" src="/img/RASBIOTECA(4)(1)(1).png" alt="">
          </div>
  
          <label for="club_name">Club Name</label>
          <input type="text" v-model="clubData.club_name" placeholder="Enter club name" name="club_name" required />
  
          <label for="club_rules">Club Rules</label>
          <textarea v-model="clubData.club_rules" placeholder="Enter club rules" name="club_rules" required></textarea>
  
          <label for="club_description">Club Description</label>
          <textarea v-model="clubData.club_description" placeholder="Enter club description" name="club_description" required></textarea>
  
          <label for="company_nif">Company NIF</label>
          <input type="text" v-model="clubData.company_nif" placeholder="Enter company NIF" name="company_nif" required />
  
          <button type="submit" class="submit-btn">Submit</button>
          <button @click="closeModal" class="close-btn">Close</button> 
        
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        clubData: {
          club_name: '',
          club_rules: '',
          club_description: '',
          company_nif: ''
        }
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      submitClubData() {
  // Datos del club a enviar
  const clubDataToSend = {
    club_name: this.clubData.club_name,
    club_rules: this.clubData.club_rules,
    club_description: this.clubData.club_description,
    company_nif: this.clubData.company_nif,
    club_schedule: this.clubData.club_schedule
  };

  // Opciones de la solicitud HTTP
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clubDataToSend) // Convierte los datos del club a JSON
  };

  fetch('/api/clubs', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Club data sent successfully:', data);
    })
    .catch(error => {
      console.error('There was a problem with the request:', error);
    });
}

    },
  };
  </script>
  
  <style scoped>
  /* Estilos para el modal */
  .modal {
    display: none; /* Oculta el modal de forma predeterminada */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .modal-content input,
  .modal-content textarea {
    width: 100%;
    padding: 10px;
    margin: 5px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .modal-content button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  .modal-content button:hover {
    background-color: #45a049;
  }
  
  /* Estilos adicionales para el modal según sea necesario */
  .close-btn {
    background-color: #f44336;
  }
  
  .close-btn:hover {
    background-color: #d32f2f;
  }
  </style>
  