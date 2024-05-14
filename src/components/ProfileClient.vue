<template>
    <div class="body">
      <div class="header">
        <img src="/img/discoteca.jpg" class="header-img">
        <div class="user-info" v-if="user">
          <img :src='"http://localhost:3001" + user.client_img' alt="Profile image" class="profile-image">
          <div class="info">
            <h1>{{ user.client_name }}</h1>
            <h2>({{ user.client_nickname }})</h2>
            <p class="email">{{ user.client_email }}</p>
            <router-link :to="{ name: 'EditClient', params: { client_id: user.client_id } }"
            class="btn-edit">Editar perfil</router-link>
          </div>
        </div>
      </div>
  
      <div class="activities-reviews">
        <section class="activities">
            <h1 class="rose">Actividades Recientes</h1>
            <div class="entries">
              <div v-for="sell in sells" :key="sell._id" class="activity-entry card">
                <div class="card-content">
                  <p class="date">Fecha de la actividad:   {{ sell.sell_date }}</p>
                  <p class="price">Precio total de la compra:   {{ sell.sell_total_price }}€</p>
                  <p class="ticket">Ticket: {{ sell.ticket_name }}</p>
                  <p class="event">Evento: {{ sell.event.event_name }}</p>
                </div>
              </div>
            </div>
          </section>
  
        <section class="reviews">
          <h1 class="rose">Reviews</h1>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  
  export default {
    name: 'ProfileClient',
    data() {
      return {
        user: null,
        sells: [], // Array para almacenar las ventas del usuario
      };
    },
    methods: {
      async fetchSells() {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await fetch('http://localhost:3001/api/sells-by-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ client_email: this.user.client_email }) // Envía el email del usuario al servidor
            });
            if (response.ok) {
              const sells = await response.json();
              // Llama a la función para obtener la información adicional de cada venta
              await this.fetchSellDetails(sells);
            } else {
              console.error('Error fetching user sells');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        } else {
          console.log("No hay token");
          router.push("/");
        }
      },
      async fetchSellDetails(sells) {
        for (const sell of sells) {
          try {
            const response = await fetch('http://localhost:3001/api/sells-by-ticket', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ticket_id: sell.ticket_id }) // Envía el ticket_id al servidor
            });
            if (response.ok) {
              const data = await response.json();
              console.log(data)
              // Agrega la información adicional a la venta
              sell.ticket_name = data.ticket_name;
              sell.event = data.event;
            } else {
              console.error('Error fetching sell details');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        }
        this.sells = sells;
      },
      async fetchUserData() {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await fetch('http://localhost:3001/api/clients/profile', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (response.ok) {
              const data = await response.json();
              this.user = data.body;
              await this.fetchSells(); 
            } else {
              console.error('Error fetching user data');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        } else {
          console.log("No hay token");
          router.push("/");
        }
      }
    },
    created() {
      this.fetchUserData();
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
.btn-edit {
  display: inline-block;
  background-color: #BD0068;
  color: rgb(219, 219, 219);
  padding: 2px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.btn-edit:hover {
  background-color: #960153;
}

.btn-edit:active {
  background-color: #910050;
}
.user-info {
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
.card {
    border: 1px solid #363434;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
    padding: 16px;
    background-color: #131010; /* Fondo gris */
    color: #fff; /* Fuente blanca */
  }
  
  .card-content {
    margin: 0;
  }
  
  .date {
    font-weight: bold;
  }
  
  .price {
    margin-top: 8px;
  }
  
  .ticket {
    margin-top: 8px;
  }
  
  .event {
    margin-top: 8px;
  }
  
</style>