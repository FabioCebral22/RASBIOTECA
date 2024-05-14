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
    </div>
    <div class="club-events">
      <h2 class="next">Eventos próximos</h2>
      <div class="event-list">
        <EventCard v-for="event in clubEvents" :key="event.event_id" :event="event" />
      </div>
    </div>
    
    <div class="club-reviews">
      <h2 class="rose">Reviews del Club</h2>
      <div v-if="reviews.length === 0">
        <p>No se han encontrado reviews para este club.</p>
      </div>
      <div v-else>
        <div v-for="review in reviews" :key="review.review_id" class="review-entry card">
          <div class="card-content">
            <p class="date">Fecha de la review: {{ review.createdAt }}</p>
            <p class="review-data">{{ review.review_data }}</p>
            <div class="star-rating">
              <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= review.review_value }">
                ★
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';

export default {
  name: 'ClubDetailsView',
  data() {
    return {
      clubDetails: null,
      clubEvents: null,
      reviews: [],
    };
  },
  created() {
    this.fetchClubDetails();
    this.fetchClubEvents();
    this.fetchClubReviews();
  },
  methods: {
    async fetchClubDetails() {
      const club_id = this.$route.params.clubId;
      try {
        const response = await fetch('http://localhost:3001/api/clubDetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clubId: club_id }),
        });
        if (response.ok) {
          const data = await response.json();
          this.clubDetails = data.body;
        } else {
          console.error('Error al obtener los detalles del club');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async fetchClubEvents() {
      const club_id = this.$route.params.clubId;
      try {
        const response = await fetch(`http://localhost:3001/api/clubEvents/${club_id}`);
        if (response.ok) {
          const data = await response.json();
          this.clubEvents = data.body;
        } else {
          console.error('Error al obtener los eventos del club');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async fetchClubReviews() {
      const club_id = this.$route.params.clubId;
      try {
        const response = await fetch('http://localhost:3001/api/club-reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ club_id: club_id }),
        });
        if (response.ok) {
          const data = await response.json();
          this.reviews = data.reviews;
        } else {
          console.error('Error al obtener las reviews del club');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
  components: {
    EventCard,
  },
};
</script>
<style scoped>
.rose {
  text-align: center;
  color: #E3E3E3;
}
.star-rating {
  display: flex;
  color: #ffc107;
}

.star {
  font-size: 1.5rem;
  margin-right: 0.1rem;
}

.star.filled {
  color: #ffc107;
}
.club-details-container {
    width: 100%;
    max-width: 100%; 
    margin: 0 auto; /* Centrar contenido */
    padding: 0 1rem;
    box-sizing: border-box; /* Incluye el padding en el ancho total */
}

.club-header {
    position: relative;
    background-color: #1a1a1d;
    color: #FFFFFF;
}
.next{
    text-align: center;

  color: #E3E3E3;

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
.club-reviews{
}
.card-content {
  padding: 1.2rem;
  margin: 0.4rem;
  color: #E3E3E3;
}
.review-entry {
  margin-bottom: 1rem;
  background-color: #1a1a1d;
}

</style>
