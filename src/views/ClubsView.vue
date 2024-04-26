<template>
    <div class="body">
        <div class="content">
            <div class="clubs-list" v-if="clubs && clubs.length > 0">
                <h2>Clubs</h2>
                <ClubCard v-for="club in clubs" :key="club.club_id" :club="club" />
            </div>
            <div v-else>
                <p>No se encontraron clubs.</p>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import ClubCard from '@/components/ClubCard.vue';

export default {
    name: 'ClubsView',
    components: {
        ClubCard,
    },
    data() {
        return {
            clubs: null,
        };
    },
    methods: {
        async findAllClubs() {
            try {
                const response = await fetch('http://localhost:3001/api/findclubs');
                if (response.ok) {
                    const data = await response.json();
                    this.clubs = data.body;
                    console.log(this.clubs)
                } else {
                    console.error('Error al obtener los clubes propiedad de la compañía');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
    },
    created() {
        this.findAllClubs()
    }
}
</script>


<style scoped>
/* Estilos para PC y tablet */
.body {
    color: #E3E3E3;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
}

.header {
    position: relative;
}

.header-img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
}

.company-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
}

.profile-image {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin-right: 1rem;
    margin-left: 1rem;
}

.info {
    flex-grow: 1;
}

.info h1 {
    margin-bottom: 0.25rem;
}

.info h2 {
    margin-top: 0.25rem;
}

.email {
    font-size: 0.8rem;
}

.rose {
    color: #FF008C;
    font-size: 1.5rem;
    margin-top: 2rem;
    text-align: center;
}

.activities-reviews {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.activities,
.reviews {
    width: 100%;
    margin-top: 2rem;
}

.entries {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

/* Estilos para móvil */
@media screen and (max-width: 479px) {
    .profile-image {
        width: 6rem;
        height: 6rem;
    }

    .email {
        font-size: 0.7rem;
    }

    .rose {
        font-size: 1.2rem;
    }

    .activities,
    .reviews {
        margin-top: 1rem;
    }
}
</style>