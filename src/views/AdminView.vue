<template>
    <div>
        <h2>Clientes</h2>
        <div class="row">
            <div class="col-4" v-for="client in visibleClients" :key="client.id">
                <h3>{{ client.client_name }}</h3>
                <button @click="toggleClientState(client)">{{ client.activeText }}</button>
            </div>
        </div>
        <button v-if="clients.length > visibleClientsCount" @click="showMoreClients">Ver más</button>

        <h2>Clubs</h2>
        <div class="row">
            <div class="col-4" v-for="club in visibleClubs" :key="club.id">
                <h3>{{ club.club_name }}</h3>
                <div class="club-image">
                    <img :src='"http://localhost:3001" + club.club_img' :alt="club.club_name">
                </div>
                <button @click="deleteClub(club.id)">Eliminar</button>
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
        await this.fetchClients();
        await this.fetchClubs();
        console.log(this.clubs)
    },
    methods: {
        async fetchClients() {
            try {
                const response = await fetch('http://localhost:3001/api/clients/all');
                const data = await response.json();
                this.clients = data.map(client => ({
                    ...client,
                    activeText: client.client_state ? 'Desactivar' : 'Activar',
                }));
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        },
        async fetchClubs() {
            try {
                const response = await fetch('http://localhost:3001/api/club/all');
                const data = await response.json();
                this.clubs = data;
            } catch (error) {
                console.error('Error fetching clubs:', error);
            }
        },
        async toggleClientState(client) {
            try {
                const response = await fetch('http://localhost:3001/api/clients/toggle-state', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ client_id: client.client_id }),
                });
                if (response.ok) {
                    // Cambiar el estado del cliente localmente
                    client.client_state = !client.client_state;
                    // Cambiar el texto del botón
                    client.activeText = client.client_state ? 'Desactivar' : 'Activar';
                } else {
                    console.error('Error toggling client state:', response.statusText);
                }
            } catch (error) {
                console.error('Error toggling client state:', error);
            }
        },
        async deleteClub(id) {
            try {
                await fetch('http://localhost:3001/api/club/delete', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ club_id: id })
                });
                this.clubs = this.clubs.filter(club => club.id !== id);
            } catch (error) {
                console.error('Error deleting club:', error);
            }
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