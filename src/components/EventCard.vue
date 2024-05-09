<template>
    <div class="event-card">
        <div class="event-image">
            <img :src='"http://localhost:3001" + event.event_image' :alt="event.event_name">
        </div>
        <div class="event-details">
            <h1 class="event-name">{{ event.event_name }}</h1>
            <p class="event-description">{{ event.event_description }}</p>
            <div class="event-date-time">
                <h3>Fecha y Hora:</h3>
                <p>{{ event.event_date }} - {{ event.event_time }}</p>
            </div>
            <div class="ticket-type">
                <label for="ticketType" class="ticket-label">Tipo de entrada:</label>
                <select v-model="ticketType" id="ticketType" class="ticket-select">
                    <option v-if="tickets.length === 0" value="no-tickets">No hay tickets disponibles</option>
                    <option v-else v-for="ticket in tickets" :value="ticket.ticket_type" :key="ticket.ticket_type">
                        {{ ticket.ticket_name }} - {{ ticket.ticket_price }}€
                    </option>
                </select>
            </div>
            <div class="ticket-actions">
                <input type="number" v-model="ticketQuantity" min="1">
                <button v-on:click="buyTickets">Comprar</button>
            </div>
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
        };
    },
    mounted() {
        this.loadTickets();
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



    },
};
</script>


<style scoped>
/* Estilos para el contenedor principal */
.event-card {
    display: flex;
    flex-direction: column;
    background-color: #1a1a1d;
    color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    margin: 20px;
}

/* Estilos para la imagen del evento */
.event-image {
    flex: 0 0 auto;
    overflow: hidden;
    border-radius: 10px 10px 0 0;
    height: 15rem;
}

.event-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Estilos para los detalles del evento */
.event-details {
    flex: 1;
    padding: 1rem;
}

/* Estilos para el nombre del evento */
.event-name {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

/* Estilos para la descripción del evento */
.event-description {
    font-size: 1rem;
    margin-bottom: 1rem;
}

/* Estilos para la fecha y hora del evento */
.event-date-time h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.event-date-time p {
    font-size: 1rem;
}

/* Estilos para el campo de entrada de cantidad de tickets y el botón de compra */
.ticket-actions {
    display: flex;
    align-items: center;
}

.ticket-actions input[type="number"] {
    width: 60px;
    margin-right: 10px;
}

.ticket-actions button {
    background-color: #FF008C;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
}

/* Estilos para tablet */
@media screen and (max-width: 1023px) {
    .event-card {
        margin: 10px;
    }

    .event-details {
        padding: 0.5rem;
    }

    .event-date-time h3 {
        font-size: 1rem;
    }
}

/* Estilos para móvil */
@media screen and (max-width: 479px) {
    .event-name {
        font-size: 1.5rem;
    }

    .event-description {
        font-size: 0.9rem;
    }

    .event-date-time h3 {
        font-size: 1rem;
    }

    .event-date-time p {
        font-size: 0.8rem;
    }
}

.ticket-type {
    margin-top: 20px;
    text-align: center;
}

.ticket-label {
    color: #f5ecec;
    /* Color principal */
    font-weight: bold;
    font-size: 16px;
    margin-right: 1rem;
}

.ticket-select {
    padding: 8px;
    border: 2px solid #FF008C;
    /* Color principal */
    border-radius: 5px;
    font-size: 16px;
    color: #FFFFFF;
    /* Fuente blanca */
    background-color: #000000;
    /* Negro */
}

/* Estilos para los options del select */
.ticket-select option {
    background-color: #000000;
    /* Negro */
    color: #FFFFFF;
    /* Fuente blanca */
}
</style>