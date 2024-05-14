<template>
    <div class="create-event-form">
        <h1>Crear Evento</h1>
        <form @submit.prevent="submitForm">
            <label for="event_name">Nombre del Evento:</label>
            <input id="event_name" v-model="form.event_name" required>

            <label for="event_description">Descripción del Evento:</label>
            <textarea id="event_description" v-model="form.event_description" required></textarea>

            <label for="event_date">Fecha del Evento:</label>
            <input type="datetime-local" id="event_date" v-model="form.event_date" required>

            <label for="event_image">Imagen del Evento:</label>
            <input type="file" id="event_image" name="event_image" ref="fileInput" @change="onFileChange">

            <div v-for="(ticket, index) in form.tickets" :key="index">
                <label for="ticket_name">Nombre del Ticket:</label>
                <input v-model="ticket.ticket_name" required>

                <label for="ticket_price">Precio del Ticket:</label>
                <input type="number" v-model="ticket.ticket_price" required>

                <label for="ticket_quantity">Cantidad del Ticket:</label>
                <input type="number" v-model="ticket.ticket_quantity" required>
            </div>

            <button type="button" @click="addTicket">Añadir Ticket</button>

            <button type="submit">Crear Evento</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        clubId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            form: {
                event_name: '',
                event_description: '',
                event_date: '',
                event_image: null,
                tickets: []
            }
        };
    },
    methods: {
        async submitForm() {
    try {
        const formData = new FormData();
        formData.append('event_name', this.form.event_name);
        formData.append('event_description', this.form.event_description);
        formData.append('event_date', this.form.event_date);
        formData.append('event_image', this.form.event_image);
        formData.append('club_id', this.clubId);
        
        this.form.tickets.forEach((ticket, index) => {
            formData.append(`tickets[${index}]`, JSON.stringify(ticket));
        });

        const response = await fetch('http://localhost:3001/api/events', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        this.$router.push('/profile');
    } catch (error) {
        console.error(error);
    }
},

        onFileChange(event) {
            this.form.event_image = event.target.files[0];
        },
        addTicket() {
            this.form.tickets.push({
                ticket_name: '',
                ticket_price: 0,
                ticket_quantity: 0
            });
        }
    },
    created() {
    }
};
</script>

<style scoped>
.create-event-form {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

label {
    font-weight: bold;
    margin-top: 10px;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 5px 0;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
}

button[type="submit"] {
    width: 100%;
    padding: 10px;
    margin: 20px 0;
    font-family: 'Poppins', sans-serif;
    background-color: #FF008C;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
    background-color: #ff3399;
}
</style>
