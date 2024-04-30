<template>
    <div>
        <h2>Clientes</h2>
        <div class="row">
            <div class="col-4" v-for="client in visibleClients" :key="client.id">
                <h3>{{ client.client_name }}</h3>
                <button @click="deleteClient(client.id)">Delete</button>
            </div>
        </div>
        <button v-if="clients.length > visibleClientsCount" @click="showMoreClients">Ver más</button>

        <h2>Clubs</h2>
        <div class="row">
            <div class="col-4" v-for="club in visibleClubs" :key="club.id">
                <h3>{{ club.club_name }}</h3>
                <img :src="'http://localhost:3001' + club.club_img" alt="Club image">
                <button @click="deleteClub(club.id)">Delete</button>
            </div>
        </div>
        <button v-if="clubs.length > visibleClubsCount" @click="showMoreClubs">Ver más</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            clients: [],
            clubs: [],
            visibleClientsCount: 6,
            visibleClubsCount: 6,
        };
    },
    computed: {
        visibleClients() {
            return this.clients.slice(0, this.visibleClientsCount);
        },
        visibleClubs() {
            return this.clubs.slice(0, this.visibleClubsCount);
        },
    },
    async created() {
        this.clients = await this.fetchClients();
        this.clubs = await this.fetchClubs();
    },
    methods: {
        async fetchClients() {
            const response = await fetch('http://localhost:3001/api/clients/all');
            const data = await response.json();
            return data;
        },
        async fetchClubs() {
            const response = await fetch('http://localhost:3001/api/club/all');
            const data = await response.json();
            return data;
        },
        async deleteClient(id) {
            await fetch('http://localhost:3001/api/clients/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ client_id: id })
            });
            this.clients = this.clients.filter(client => client.id !== id);
        },
        async deleteClub(id) {
            await fetch('http://localhost:3001/api/club/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ club_id: id })
            });
            this.clubs = this.clubs.filter(club => club.id !== id);
        },
        showMoreClients() {
            this.visibleClientsCount = this.clients.length;
        },
        showMoreClubs() {
            this.visibleClubsCount = this.clubs.length;
        },
    },
};
</script>

<style scoped>
.row {
    display: flex;
    flex-wrap: wrap;
}

.col-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
}
</style>