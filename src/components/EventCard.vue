<template>
    <div class="event-card">
      <div class="event-image">
        <img :src="'http://localhost:3001' + event.event_image" :alt="event.event_name">
      </div>
      <div class="event-details">
        <h1 class="event-name">{{ event.event_name }}</h1>
        <p class="event-description">{{ event.event_description }}</p>
        <div class="event-date-time">
          <h3>Fecha y Hora:</h3>
          <p>{{ event.event_date }} - {{ event.event_time }}</p>
        </div>
        <div class="ticket-actions">
          <div class="ticket-type">
            <label for="ticketType" class="ticket-label">Tipo de entrada:</label>
            <select v-model="ticketType" id="ticketType" class="ticket-select">
              <option v-if="tickets.length === 0" value="no-tickets">No hay tickets disponibles</option>
              <option v-else v-for="ticket in tickets" :value="ticket.ticket_type" :key="ticket.ticket_type">
                {{ ticket.ticket_name }} - {{ ticket.ticket_price }}€
              </option>
            </select>
          </div>
          <div class="ticket-quantity">
            <input type="number" v-model="ticketQuantity" min="1" class="ticket-quantity-input">
            <button v-on:click="buyTickets" class="btn-action btn-buy">Comprar</button>
          </div>
        </div>
        <button v-if="isOwner" class="btn-action btn-delete" @click="deleteEvent(event.event_id)">Eliminar Evento</button>
        <button v-if="isOwner" @click="editEvent(event.event_id)" class="btn-action btn-edit">Editar Evento</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventCard',
    props: {
      event: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        ticketQuantity: 1,
        ticketType: null,
        tickets: [],
        isOwner: false,
      };
    },
    mounted() {
      this.loadTickets();
      this.checkEventOwner();
    },
    methods: {
      async loadTickets() {
        try {
          const eventId = this.event.event_id;
          const response = await fetch(`http://localhost:3001/api/tickets`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventId }),
          });
          const data = await response.json();
          this.tickets = data.filter(ticket => ticket.ticket_quantity > 0);
          if (this.tickets.length > 0) {
            this.ticketType = this.tickets[0].ticket_type;
          }
        } catch (error) {
          console.error('Error al cargar los tickets:', error);
        }
      },
      async buyTickets() {
        try {
          const selectedTicket = this.tickets.find(ticket => ticket.ticket_type === this.ticketType);
          if (!selectedTicket) {
            console.error('No se ha seleccionado un ticket válido.');
            return;
          }
  
          this.$router.push({
            name: 'checkout',
            params: {
              ticketName: selectedTicket.ticket_name,
              ticketQuantity: this.ticketQuantity,
              ticketPrice: selectedTicket.ticket_price
            }
          });
        } catch (error) {
          console.error('Error al comprar los tickets:', error);
        }
      },
      async deleteEvent(eventId) {
        try {
          const response = await fetch('http://localhost:3001/api/event/delete', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ event_id: eventId })
          });
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || 'Error al eliminar el evento');
          }
          window.location.reload();
        } catch (error) {
          console.error('Error al eliminar el evento:', error.message);
        }
      },
      editEvent(eventId) {
        this.$router.push({ name: 'EditEvent', params: { eventId: eventId } });
      },
      async checkEventOwner() {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
  
          const response = await fetch('http://localhost:3001/api/check-event', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ eventId: this.event.event_id })
          });
          const data = await response.json();
          this.isOwner = data.isOwner;
        } catch (error) {
          console.error('Error al verificar el propietario del evento:', error);
        }
      }
    },
  };
  </script>
  
  <style scoped>
.event-card {
  display: flex;
  background-color: #1a1a1d;
  color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px;
}

.event-image {
  flex: 0 0 15rem;
  overflow: hidden;
  border-radius: 10px 0 0 10px;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom; /* La imagen ocupa todo el espacio vertical */
}

.event-details {
  flex: 1;
  padding: 1rem;
}

.event-name {
  font-size: 1.5rem; /* Reducción del tamaño del nombre del evento */
  margin-bottom: 0.5rem;
}

.event-description {
  font-size: 1rem; /* Reducción del tamaño de la descripción */
  margin-bottom: 1rem;
}

.event-date-time h3 {
  font-size: 1rem; /* Reducción del tamaño de la fecha y hora */
  margin-bottom: 0.5rem;
}

.event-date-time p {
  font-size: 0.9rem; /* Reducción del tamaño del texto de fecha y hora */
}

.ticket-actions {
  display: flex;
  flex-direction: column; /* Cambio a columna para móviles */
  align-items: flex-start; /* Alineación a la izquierda */
  margin-top: 1rem; /* Añadido margen superior */
}

.ticket-type {
  margin-bottom: 0.5rem; /* Ajuste de espacio entre elementos */
}

.ticket-label {
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
}

.ticket-select {
  padding: 8px;
  border: 2px solid #FF008C;
  border-radius: 5px;
  font-size: 16px;
  color: #ffffff;
  background-color: #000000;
}

.ticket-select option {
  background-color: #000000;
  color: #ffffff;
}

.ticket-quantity-input {
  width: 60px;
  margin-right: 10px;
}

.btn-action {
  background-color: #FF008C;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem; /* Ajuste de espacio superior */
}

@media screen and (max-width: 767px) {
  .event-card {
    flex-direction: column;
  }

  .event-image {
    flex: 1 0 auto;
    border-radius: 10px 10px 0 0;
    margin-bottom: 1rem;
  }

  .event-details {
    flex: 1;
  }

  .ticket-actions {
    align-items: center; /* Alinear elementos al centro */
  }
}
  </style>  