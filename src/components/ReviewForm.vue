<template>
    <div>
      <h2>Añadir Review</h2>
      <p>Ticket ID: {{ $route.params.ticket_id }}</p>
      <p>Client ID: {{ $route.params.client_id }}</p>
      <form @submit.prevent="submitReview">
        <div>
          <label for="reviewData">Review Data:</label>
          <input type="text" id="reviewData" v-model="reviewData" required>
        </div>
        <div>
          <label for="reviewValue">Review Value:</label>
          <div class="rating">
            <span
              v-for="(star, index) in 5"
              :key="index"
              @click="setRating(index + 1)"
              :class="{ 'filled': index < reviewValue }"
            >
              ★
            </span>
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReviewForm',
    data() {
      return {
        reviewData: '',
        reviewValue: 0,
        ticketId: this.$route.params.ticket_id,
        clientId: this.$route.params.client_id
      };
    },
    methods: {
      async submitReview() {
        try {
          const response = await fetch('http://raul-argemi-7e6.alwaysdata.net/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              review_data: this.reviewData,
              review_value: this.reviewValue,
              client_id: this.clientId,
              ticket_id: this.ticketId
            })
          });
          if (response.ok) {
            this.reviewData = '';
            this.reviewValue = 0;
          } else {
            console.error('Error creating review');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      setRating(rating) {
        this.reviewValue = rating;
      }
    }
  };
  </script>
  
  <style scoped>
  .rating {
    unicode-bidi: bidi-override;
    direction: rtl;
    text-align: center;
  }
  .rating span {
    display: inline-block;
    position: relative;
    width: 1.1em;
  }
  .rating span:before {
    content: '★';
    position: absolute;
  }
  .rating .filled:before {
    color: gold;
  }
  </style>
  
  
  
  