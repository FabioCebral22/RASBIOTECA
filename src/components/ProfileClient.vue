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
              <p class="date">Fecha de la actividad: {{ formatDate(sell.sell_date) }}</p>
              <p class="price">Precio total de la compra: {{ sell.sell_total_price }}€</p>
              <p class="ticket">Ticket: {{ sell.ticket_name }}</p>
              <p class="event">Evento: {{ sell.event.event_name }}</p>
              <img :src="sell.qr_code_image" alt="QR Code" class="qr-code"><br>
              <router-link
                :to="{ name: 'ReviewForm', params: { ticket_id: sell.ticket_id, client_id: user.client_id }}"
                class="btn-add-review"
              >
                Añadir Review
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <section class="reviews">
        <h1 class="rose">Reviews</h1>
        <div v-if="reviews.length === 0">
          <p>No se han encontrado reviews para este usuario.</p>
        </div>
        <div v-else>
          <div v-for="review in reviews" :key="review.review_id" class="review-entry card">
            <div class="card-content">
              <p class="date">Fecha de la review: {{ formatDate(review.createdAt) }}</p>
              <p class="review-data">{{ review.review_data }}</p>
              <div class="star-rating">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= review.review_value }">
                  &#9733;
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import router from '@/router';
import QRCode from 'qrcode';

export default {
  name: 'ProfileClient',
  data() {
    return {
      user: null,
      sells: [],
      reviews: [], 
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return date.toLocaleDateString(undefined, options);
    },
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
            body: JSON.stringify({ client_email: this.user.client_email }) 
          });
          if (response.ok) {
            const sells = await response.json();
            await this.fetchSellDetails(sells);
          } else {
            console.error('Error fetching user sells');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
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
            body: JSON.stringify({ ticket_id: sell.ticket_id })
          });
          if (response.ok) {
            const data = await response.json();
            sell.ticket_name = data.ticket_name;
            sell.event = data.event;
            sell.qr_code_image = await this.generateQRCode(sell.qr_code);
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
            await this.fetchReviews(); 
          } else {
            console.error('Error fetching user data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        router.push("/");
      }
    },
    async fetchReviews() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/client-reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ client_email: this.user.client_email }) 
          });
          if (response.ok) {
            const data = await response.json();
            this.reviews = data.reviews; 
          } else {
            console.error('Error fetching user reviews');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        router.push("/");
      }
    },
    async generateQRCode(text) {
      try {
        const url = await QRCode.toDataURL(text);
        return url;
      } catch (err) {
        console.error(err);
        return null;
      }
    }
  },
  created() {
    this.fetchUserData();
  }
}
</script>


<style scoped>
.star {
  font-size: 2rem;
  color: #d3d3d3;
  cursor: pointer;
}
.star.filled {
  color: #ffc107;
}
.btn-add-review {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add-review:hover {
  background-color: #0056b3;
}
</style>

  
  

<style scoped>
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
    background-color: #131010; 
    color: #fff; 
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