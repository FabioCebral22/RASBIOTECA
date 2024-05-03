<template>
    <div class="event-card">
        <div class="event-image">
            <img src="/public/img/discoteca.jpg" :alt="event.event_name">
        </div>
        <div class="event-details">
            <h1 class="event-name">{{ event.event_name }}</h1>
            <p class="event-description">{{ event.event_description }}</p>
            <div class="event-date-time">
                <h3>Fecha y Hora:</h3>
                <p>{{ event.event_date }} - {{ event.event_time }}</p>
            </div>
            <div class="ticket-type">
                <label for="ticketType">Tipo de entrada:</label>
                <select v-model="ticketType" id="ticketType">
                    <option default value='simple'>Entrada simple - 10€</option>
                    <option value='doble'>Entrada dos consumiciones - 15€</option>
                    <option value='premium'>Entrada premium - 20€</option>
                </select>
            </div>
            <div class="ticket-actions">
                <input type="number" v-model="ticketQuantity" min="1">
                <button @click="buyTickets">Comprar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { routerKey } from 'vue-router';

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
            ticketType: 'simple',
        };
    },
    methods: {
        buyTickets() {
            const eventId = this.event.event_id;
            const quantity = this.ticketQuantity;
            const ticketType = this.ticketType
            console.log(`Comprando ${quantity} ticket(s) ${ticketType} para el evento ${eventId}`);
            console.log(this.event)
            
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
</style>