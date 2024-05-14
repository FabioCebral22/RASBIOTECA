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
            <button v-if="isOwner" class="btn-action btn-delete" @click="deleteClub(club.club_id)">Eliminar Club</button>
            <button v-if="isOwner" @click="editClub" class="btn-action btn-edit">Editar Club</button>
            <router-link v-if="isOwner" :to="{ name: 'CreateEvent', params: { clubId: club.club_id } }" class="btn-action btn-add">Añadir Evento</router-link>


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
        editClub() {
        this.$router.push({ name: 'EditClub', params: { clubId: this.club.club_id } });
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
                this.isOwner=true
            } else {
            }
        } catch (error) {
            console.error('Error al verificar el club:', error);
        }
        }
    },
    created () {
        const token = localStorage.getItem('token');

        if(this.checkIsCompany(token)) {

            this.isCompany=true
            this.checkIsOwner(token)
}
    }

};
</script><style scoped>
.btn-action {
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1rem; 
}

.btn-delete {
    background-color: #BD0068;
}

.btn-delete:hover {
    background-color: #9C004D;
}

.btn-add {
    background-color: #007BFF;
}

.btn-add:hover {
    background-color: #0056b3;
}

.btn-edit {
    background-color: #28a745;
}

.btn-edit:hover {
    background-color: #218838;
}

.btn-add {
    display: inline-block;
    background-color: #36c6ff; 
    text-decoration: none; 
    padding: 0.3rem 1rem; 
    border-radius: 5px;
    transition: background-color 0.3s ease;
    font-size: 0.9rem;
}

.btn-add:hover {
    background-color: #1b4edb; 
}

.btn-edit {
    background-color: #2ecc71; 
}

.btn-edit:hover {
    background-color: #24a04a;
}

.club-link {
    text-decoration: none; 
}

.club-card {
    display: flex;
    background-color: #1a1a1d;
    color: #FFFFFF;
    border-radius: 10px;
    overflow: hidden; 
    margin: 20px;
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