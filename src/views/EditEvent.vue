<template>
  <div class="editar-evento">
    <h1>Editar Evento</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="eventName">Nombre del Evento:</label>
        <input id="eventName" v-model="event.event_name" type="text" class="input-field" required />
      </div>

      <div class="form-group">
        <label for="eventDescription">Descripción del Evento:</label>
        <textarea id="eventDescription" v-model="event.event_description" class="input-field" required></textarea>
      </div>

      <div class="form-group">
        <label for="eventDate">Fecha del Evento:</label>
        <input id="eventDate" v-model="event.event_date" type="date" class="input-field" required />
      </div>

      <div class="form-group">
        <label for="eventTime">Hora del Evento:</label>
        <input id="eventTime" v-model="event.event_time" type="time" class="input-field" required />
      </div>

      <div class="form-group">
        <label for="eventImage">Imagen del Evento:</label>
        <input id="eventImage" type="file" ref="fileInput" class="input-field" @change="onFileChange" />
        <p class="aviso">No adjuntes imagen si deseas continuar con la que ya hay*</p>
      </div>

      <button type="submit" class="submit-button" :disabled="!formIsValid">Guardar Cambios</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'EditEvent',
  data() {
    return {
      event: {
        event_name: '',
        event_description: '',
        event_date: '',
        event_time: '',
        event_image: null,
      },
    };
  },
  computed: {
    formIsValid() {
      return (
        this.event.event_name &&
        this.event.event_description &&
        this.event.event_date &&
        this.event.event_time
      );
    },
  },
  methods: {
    async submitForm() {
      const formData = new FormData();
      formData.append('event_name', this.event.event_name);
      formData.append('event_description', this.event.event_description);
      formData.append('event_date', this.event.event_date);
      formData.append('event_time', this.event.event_time);

      if (this.event.event_image) {
        formData.append('event_image', this.event.event_image);
      }

      try {
        const eventId = this.$route.params.eventId;
        const response = await fetch(`http://raul-argemi-7e6.alwaysdata.net/api/events/edit/${eventId}`, {
          method: 'PUT',
          body: formData,
        });
        const responseData = await response.json();
        console.log(responseData);
          this.$router.push('/profile');
        
      } catch (error) {
        console.error(error);
      }
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.event.event_image = file;
      }
    },

    async fetchEventDetails() {
  try {
    const eventId = this.$route.params.eventId;
    const response = await fetch(`http://raul-argemi-7e6.alwaysdata.net/api/eventDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventId })
    });
    const responseData = await response.json();
    if (response.ok) {
      this.event = responseData.body;
    } else {
      console.error('Error al obtener los detalles del evento:', responseData.error);
    }
  } catch (error) {
    console.error('Error al obtener los detalles del evento:', error);
  }
},
  },
  created() {
    this.fetchEventDetails();
  },
};
</script>

<style scoped>
/* Estilos para el formulario de edición */
.editar-evento {
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

h1,
label,
#eventImage {
  color: #e3e3e3;
}

label {
  font-weight: 600;
}

.aviso {
  color: #e3e3e3;
  font-size: 0.7rem;
}

.submit-button {
  font-weight: 600;
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