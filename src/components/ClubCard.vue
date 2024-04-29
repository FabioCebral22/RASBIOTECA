<template>

    <div class="club-card">
        <router-link :to="{ name: 'ClubDetails', params: { clubId: club.club_id } }" class="club-link">
        <div class="club-image">
            <img src="/public/img/discoteca.jpg" :alt="club.club_name">
        </div>
        </router-link>

        <div class="club-details">
            <h1 class="club-name">{{ club.club_name }}</h1>
            <p class="club-description">{{ club.club_description }}</p>
            <div class="club-schedule">
                <h3>Horario:</h3>
                <p>{{ club.club_schedule }}</p>
            </div>
            <div class="club-rules">
                <h3>Normas del club:</h3>
                <p>{{ club.club_rules }}</p>
            </div>
            <button class="btn-delete" @click="deleteClub(club.club_id)">Eliminar Club</button>

        </div>
    </div>

</template>

<script>
export default {
    name: 'ClubCard',
    props: {
        club: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async deleteClub(clubId) {
            try {
                const response = await fetch('http://localhost:3001/api/club/delete', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ club_id: clubId })
                });
                console.log("HOLA" + clubId)
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(errorMessage || 'Error al eliminar el club');
                }

                window.location.reload();

            } catch (error) {
                console.error('Error al eliminar el club:', error.message);
                throw error;
            }
        }

    }
};
</script>

<style scoped>
.btn-delete {
    background-color: #ff4136;
    /* Color de fondo rojo */
    color: white;
    /* Color del texto blanco */
    padding: 0.5rem 1rem;
    /* Espaciado interno */
    border: none;
    /* Sin borde */
    border-radius: 5px;
    /* Borde redondeado */
    cursor: pointer;
    /* Cursor al pasar por encima */
    transition: background-color 0.3s ease;
    /* Transición suave del color de fondo */
}

.btn-delete:hover {
    background-color: #d60000;
    /* Cambio de color al pasar por encima */
}

.club-link {
    text-decoration: none;
    /* Quitar el subrayado del enlace */
}

.club-card {
    display: flex;
    background-color: #1a1a1d;
    color: #FFFFFF;
    border-radius: 10px;
    overflow: hidden;
    /* Evitar que el enlace afecte al tamaño */
}

.club-image {
    flex: 0 0 15rem;
    overflow: hidden;
    border-radius: 10px 0 0 10px;
}

.club-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.club-details {
    flex: 1;
    padding: 1rem;
}

.club-name {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.club-description {
    font-size: 1rem;
    margin-bottom: 1rem;
}

.club-schedule h3,
.club-rules h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.club-schedule p,
.club-rules p {
    font-size: 1rem;
}
</style>
