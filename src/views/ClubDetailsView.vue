<template>
    <div class="club-details-container">
        <div class="club-header">
            <img src="/public/img/discoteca.jpg" class="club-header-img">
            <div class="club-header-info" v-if="clubDetails">
                <img :src="clubDetails.club_img" alt="Imagen del club" class="club-profile-image">
                <div class="club-header-details">
                    <h1>{{ clubDetails.club_name }}</h1>
                    <p>{{ clubDetails.club_schedule }}</p>
                </div>
            </div>
        </div>
        <div class="club-content">
            <div class="club-description">
                <h2>Descripción:</h2>
                <p>{{ clubDetails.club_description }}</p>
            </div>
            <div class="club-rules">
                <h2>Normas del club:</h2>
                <p>{{ clubDetails.club_rules }}</p>
            </div>
            <!-- Puedes agregar más detalles aquí -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClubDetailsView',
    data() {
        return {
            clubDetails: null,
        };
    },
    created() {
        this.fetchClubDetails();
    },
    methods: {
        async fetchClubDetails() {
            const club_id = this.$route.params.clubId; // Obtener el ID del club de la ruta
            try {
                const response = await fetch('http://localhost:3001/api/clubDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ clubId: club_id }), // Usar el ID del club obtenido de la ruta
                });
                if (response.ok) {
                    const data = await response.json();
                    this.clubDetails = data.body;
                    console.log('Detalles del club:', this.clubDetails);
                } else {
                    console.error('Error al obtener los detalles del club');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    },
};
</script>

<style scoped>
.club-details-container {
    width: 100%;
    max-width: 100%; 
    margin: 0 auto; /* Centrar contenido */
    padding: 20px;
    box-sizing: border-box; /* Incluye el padding en el ancho total */
}

.club-header {
    position: relative;
    background-color: #1a1a1d;
    color: #FFFFFF;
}

.club-header-img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
}

.club-header-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
}

.club-profile-image {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin-right: 1rem;
}

.club-header-details {
    flex-grow: 1;
}

.club-header-details h1 {
    margin-bottom: 0.25rem;
}

.club-content {
    background-color: #1a1a1d;
    color: #FFFFFF;
    padding: 20px;
}

.club-description,
.club-rules {
    margin-bottom: 20px;
}

.club-description h2,
.club-rules h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.club-description p,
.club-rules p {
    font-size: 1rem;
}
</style>
