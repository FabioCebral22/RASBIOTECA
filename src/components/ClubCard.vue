<template>
    <router-link :to="{ name: 'ClubDetails', params: { clubId: club.club_id }}" class="club-link">
        <div class="club-card">
            <div class="club-image">
                <img src="/public/img/discoteca.jpg" :alt="club.club_name">
            </div>
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
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'ClubCard',
    props: {
        club: {
            type: Object,
            required: true,
        },
    }
};
</script>

<style scoped>
.club-link {
    text-decoration: none; /* Quitar el subrayado del enlace */
}

.club-card {
    display: flex;
    background-color: #1a1a1d;
    color: #FFFFFF;
    border-radius: 10px;
    overflow: hidden; /* Evitar que el enlace afecte al tamaño */
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
