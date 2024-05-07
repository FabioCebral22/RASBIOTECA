<template>
    <div>
        <div class="titles">
            <!-- Clientes -->
            <h2 @click="toggleTable('clients')" :class="{ 'active': showTables.clients }">Clientes</h2>

            <!-- Compañías -->
            <h2 @click="toggleTable('companies')" :class="{ 'active': showTables.companies }">Compañías</h2>

            <!-- Clubs -->
            <h2 @click="toggleTable('clubs')" :class="{ 'active': showTables.clubs }">Clubs</h2>

            <!-- Eventos -->
            <h2 @click="toggleTable('events')" :class="{ 'active': showTables.events }">Eventos</h2>
        </div>

        <table v-show="showTables.clients">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="client in clients" :key="client.client_id">
                    <td>{{ client.client_name }}</td>
                    <td>{{ client.client_email }}</td>
                    <td>
                        <button @click="toggleClientState(client)">{{ client.activeText }}</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <table v-show="showTables.companies">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>NIF</th>
                    <th>Email</th>
                    <th>Información</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="company in companies" :key="company.company_nif">
                    <td>{{ company.company_name }}</td>
                    <td>{{ company.company_nif }}</td>
                    <td>{{ company.company_email }}</td>
                    <td>{{ company.company_info }}</td>
                    <td>
                        <button @click="toggleCompanyState(company.company_nif, company.company_status)">
                            {{ company.activeText }}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <table v-show="showTables.clubs">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Reglas</th>
                    <th>Descripción</th>
                    <th>Horario</th>
                    <th>Company_NIF</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="club in clubs" :key="club.club_id">
                    <td>{{ club.club_id }}</td>
                    <td>{{ club.club_name }}</td>
                    <td>{{ club.club_rules }}</td>
                    <td>{{ club.club_description }}</td>
                    <td>{{ club.club_schedule }}</td>
                    <td>{{ club.company_nif }}</td>
                    <td>
                        <button @click="toggleClubState(club)">
                            {{ club.activeText }}
                        </button>
                        <button @click="showEvents(club.club_id)">Ver Eventos</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <table v-show="showTables.events">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="event in events" :key="event.event_id">
                    <td>{{ event.event_name }}</td>
                    <td>{{ event.event_description }}</td>
                    <td>{{ event.event_date }}</td>
                    <td>
                        <button @click="toggleEventState(event)">{{ event.activeText }}</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showTables: {
                clients: false,
                companies: false,
                clubs: false,
                events: false
            },
            clients: [],
            companies: [],
            clubs: [],
            events: []
        };
    },
    async created() {
        await this.fetchClients();
        await this.fetchCompanies();
        await this.fetchClubs();
        await this.fetchEvents();
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
        async fetchCompanies() {
            try {
                const response = await fetch('http://localhost:3001/api/companies/');
                const data = await response.json();
                this.companies = data.body.map(company => ({
                    ...company,
                    activeText: company.company_status ? 'Desactivar' : 'Activar',
                }));
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        },
        async fetchClubs() {
            try {
                const response = await fetch('http://localhost:3001/api/club/all');
                const data = await response.json();
                this.clubs = data.map(club => ({
                    ...club,
                    activeText: club.club_status ? 'Desactivar' : 'Activar',
                }));
            } catch (error) {
                console.error('Error fetching clubs:', error);
            }
        },
        async fetchEvents() {
            try {
                const response = await fetch('http://localhost:3001/api/events/');
                const data = await response.json();
                this.events = data.map(event => ({
                    ...event,
                    activeText: event.event_state ? 'Desactivar' : 'Activar',
                }));
            } catch (error) {
                console.error('Error fetching events:', error);
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
                    client.client_state = !client.client_state;
                    client.activeText = client.client_state ? 'Desactivar' : 'Activar';
                } else {
                    console.error('Error toggling client state:', response.statusText);
                }
            } catch (error) {
                console.error('Error toggling client state:', error);
            }
        },
        async toggleCompanyState(company_nif, currentStatus) {
            try {
                const response = await fetch('http://localhost:3001/api/companies/toggle-state', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ company_nif: company_nif }),
                });

                if (response.ok) {
                    const updatedCompanies = this.companies.map(company => {
                        if (company.company_nif === company_nif) {
                            company.company_status = !currentStatus;
                            company.activeText = company.company_status ? 'Desactivar' : 'Activar';
                        }
                        return company;
                    });
                    this.companies = updatedCompanies;
                } else {
                    console.error('Error toggling company state:', response.statusText);
                }
            } catch (error) {
                console.error('Error toggling company state:', error);
            }
        },
        async toggleClubState(club) {
            try {
                const response = await fetch('http://localhost:3001/api/clubs/toggle-state', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ club_id: club.club_id }),
                });

                if (response.ok) {
                    club.club_status = !club.club_status;
                    club.activeText = club.club_status ? 'Desactivar' : 'Activar';
                } else {
                    console.error('Error toggling club state:', response.statusText);
                }
            } catch (error) {
                console.error('Error toggling club state:', error);
            }
        },
        async toggleEventState(event) {
            try {
                console.log(event.event_id)
                const response = await fetch('http://localhost:3001/api/event/toggle-state', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ event_id: event.event_id }),
                });

                if (response.ok) {
                    event.client_state = !event.client_state
                    event.activeText = event.client_state ? 'Desactivar' : 'Activar';
                } else {
                    console.error('Error toggling event state:', response.statusText);
                }
            } catch (error) {
                console.error('Error toggling event state:', error);
            }
        },
        async showEvents(clubId) {
            console.log("CLUBID", clubId); 
            try {
                const response = await fetch(`http://localhost:3001/api/clubs/events`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ club_id: clubId }) 
                });
                const data = await response.json();
                this.events = data; 
                console.log(this.events)
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        },
        async toggleTable(tableName) {
            for (const key in this.showTables) {
                if (key === tableName) {
                    this.showTables[key] = true;
                } else {
                    this.showTables[key] = false;
                }
            }
        }
    }
};
</script>








<style scoped>
*{
    color: #ddd;
}
.titles {
    text-align: center;
    /* Centra el texto */

}

/* Estilos CSS para titulos */
h2 {
    color: white;
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    text-align: center;
    /* Centra el texto */

}

/* Estilos CSS para tablas */
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #ff008ca9;
}

tr:hover {
    background-color: #ff008c81 ;
}

button {
    padding: 8px 12px;
    background-color: #ff008c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #bd0068;
}

.active {
    color: #ff008c;
    /* Cambia el color del título cuando la tabla está desplegada */
}
</style>
