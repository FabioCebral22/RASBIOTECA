<template>
    <div class="checkout-view">
      <h2>Resumen de la compra</h2>
      <p>Evento: {{ event.event_name }}</p>
      <p>Descripción: {{ event.event_description }}</p>
      <p>Fecha y hora: {{ event.event_date }}</p>
      <p>Cantidad de tickets: {{ quantity }}</p>
      <div class="payment-form">
        <h3>Información de pago</h3>
        <form @submit.prevent="processPayment">
          <label for="cardNumber">Número de tarjeta:</label>
          <input type="text" id="cardNumber" v-model="cardNumber" required>
  
          <label for="expiryDate">Fecha de vencimiento:</label>
          <input type="text" id="expiryDate" v-model="expiryDate" required>
  
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" v-model="cvv" required>
  
          <button type="submit">Pagar</button>
        </form>
      </div>
        <div v-if="paymentStatus" class="payment-status">
        <p>{{ paymentStatus }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CheckoutView',
    props: {
        eventId: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        event: {
            type: Object,
            required: true,
        },
    },
    data() {
      return {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        paymentStatus: '', // Para mostrar mensajes de estado después de realizar el pago
      };
    },
    methods: {
      processPayment() {
        // Aquí puedes agregar la lógica para procesar el pago, por ejemplo, enviar los detalles del pago al servidor
        // y mostrar un mensaje de éxito o error según la respuesta del servidor
        // En este ejemplo, simularemos un pago exitoso después de 2 segundos
        setTimeout(() => {
          this.paymentStatus = 'Pago exitoso. Gracias por tu compra.';
        }, 2000);
      },
    },
    created(){
        console.log(this.event)
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para la vista de pago */
  .checkout-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .payment-form {
    margin-top: 20px;
  }
  
  .payment-form label {
    display: block;
    margin-bottom: 5px;
  }
  
  .payment-form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }
  
  .payment-form button {
    background-color: #FF008C;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .payment-status {
    margin-top: 20px;
    padding: 10px;
    background-color: #e6f7ff;
    border: 1px solid #b3e0ff;
    border-radius: 5px;
  }
  </style>
  