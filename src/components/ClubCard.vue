<template>

    <div class="club-card">
        <router-link :to="{ name: 'ClubDetails', params: { clubId: club.club_id } }" class="club-link">
            <div class="club-image">
                <img :src='"http://localhost:3001" + club.club_img' :alt="club.club_name">
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
            <button v-if="isOwner" class="btn-delete" @click="deleteClub(club.club_id)">Eliminar Club</button>
            <router-link v-if="isOwner" :to="{ name: 'CreateEvent', params: { clubId: club.club_id } }" class="btn-add">
  Añadir Evento
</router-link>

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
    data() {
        return {
            isCompany:false,
            isOwner: false,
        };
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
        },
        checkIsCompany(token) {
            try {
                if (token) {
                    const tokenParts = token.split('.');
                    const payload = JSON.parse(atob(tokenParts[1]));
                    console.log('-------'+ payload.companyData.company_email)
                    return payload.companyData && payload.companyData.isCompany === true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error('Error decoding the token:', error);
                return false;
            }
        },
        async checkIsOwner(token) {
            try {
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log('-------'+ payload.companyData.company_email)
            const response = await fetch('http://localhost:3001/api/check-club', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company_email: payload.companyData.company_email,
                    company_nif: this.club.company_nif
                })
            });
            const data = await response.json();
            if (data.exists) {
                console.log('El club existe para esta empresa.');
                this.isOwner=true
            } else {
                console.log('El club no existe para esta empresa.');
            }
        } catch (error) {
            console.error('Error al verificar el club:', error);
        }
        }
    },
    created () {
        const token = localStorage.getItem('token');

        if(this.checkIsCompany(token)) {
    console.log('El token contiene la propiedad isCompany en true.');

            this.isCompany=true
            this.checkIsOwner(token)
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
    cursor: pointer;
    /* Cursor al pasar por encima */
    transition: background-color 0.3s ease;
    /* Transición suave del color de fondo */
}

.btn-delete:hover {
    background-color: #d60000;
    /* Cambio de color al pasar por encima */
}

.btn-add {
    background-color: #36c6ff;
    /* Color de fondo rojo */
    color: white;
    /* Color del texto blanco */
    padding: 0.5rem 1rem;
    /* Espaciado interno */
    border: none;
    /* Sin borde */
    border-radius: 5px;
    cursor: pointer;
    /* Cursor al pasar por encima */
    transition: background-color 0.3s ease;
    /* Transición suave del color de fondo */
}

.btn-add:hover {
    background-color: #1b4edb;
    /* Cambio de color al pasar por encima */
}

.club-link {
    text-decoration: none; /* Quitar el subrayado del enlace */
}

.club-card {
    display: flex;
    background-color: #1a1a1d;
    color: #FFFFFF;
    border-radius: 10px;
    overflow: hidden; /* Evitar que el enlace afecte al tamaño */
    margin: 20px
}

.club-image {
    flex: 0 0 15rem;
    overflow: hidden;
    border-radius: 10px 0 0 10px;
    height: 23rem;
    width: 17rem;
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
