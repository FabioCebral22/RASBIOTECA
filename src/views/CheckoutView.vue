<template>
  <div class="mainscreen">
    <div class="card">
      <div class="leftside">
        <img src="../../public/img/rasbioteca-big-white.png" class="product" alt="Shoes" />
      </div>
      <div class="rightside">
        <form @submit.prevent="handleSubmit">
          <h1>CheckOut</h1>
          <h2>Payment Information</h2>
          <p>Ticket: {{ $route.params.ticketName }}</p>
          <p>Ticket ID: {{ ticketId }}</p>
          <p>Cardholder Name</p>
          <input type="text" class="inputbox" v-model="cardHolderName" required />
          <p>Card Number</p>
          <input type="number" class="inputbox" v-model="cardNumber" required />
          <p>Card Type</p>
          <select class="inputbox" v-model="cardType" required>
            <option value="">--Select a Card Type--</option>
            <option value="Visa">Visa</option>
            <option value="RuPay">RuPay</option>
            <option value="MasterCard">MasterCard</option>
          </select>
          <div class="expcvv">
            <p class="expcvv_text">Expiry</p>
            <input type="date" class="inputbox" v-model="expiryDate" required />
            <p class="expcvv_text2">CVV</p>
            <input type="password" class="inputbox" v-model="cvv" required />
          </div>
          <p>Total Price: {{ totalPrice }}€</p>
          <button type="submit" class="button">CheckOut</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticketId: null,
      totalPrice: 0,
      cardHolderName: '',
      cardNumber: '',
      cardType: '',
      expiryDate: '',
      cvv: ''
    };
  },
  methods: {
    async loadTicketId() {
      try {
        const response = await fetch('http://localhost:3001/api/ticketsid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ticketName: this.$route.params.ticketName }), 
        });
        const data = await response.json();
        this.ticketId = data.ticketId; 
      } catch (error) {
        console.error('Error al obtener el ticket ID:', error);
      }
    },
    async handleSubmit() {
      try {
        const token = localStorage.getItem("token");
        const tokenParts = token.split('.');

const payload = JSON.parse(atob(tokenParts[1]));
        const response = await fetch('http://localhost:3001/api/add-sell', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_email: payload.clientData.client_email, 
            sell_total_price: this.totalPrice,
            ticket_id: this.ticketId,
            qr_guests: this.$route.params.ticketQuantity,
            cardHolderName: this.cardHolderName,
            cardNumber: this.cardNumber,
            cardType: this.cardType,
            expiryDate: this.expiryDate,
            cvv: this.cvv
          }), 
        });
        const data = await response.json();
        this.$router.push('/profile');
      } catch (error) {
        console.error('Error al realizar el checkout:', error);
      }

    }
  },
  created() {
    this.loadTicketId();
    this.totalPrice = this.$route.params.ticketQuantity * this.$route.params.ticketPrice;
  }
}
</script>
<style>body {
  font-family: 'Roboto', sans-serif!important;
margin:0;
padding:0;
box-sizing: border-box;
}

.mainscreen
{
min-height: 100vh;
width: 100%;
display: flex;
  flex-direction: column;
  background-color: #DFDBE5;
  background-image: url("https://wallpaperaccess.com/full/3063067.png");
  color:#302c2e;
}

.card {
width: 60rem;
  margin: auto;
  background: white;
  position:center;
  align-self: center;
  top: 50rem;
  border-radius: 1.5rem;
  box-shadow: 4px 3px 20px #3535358c;
  display:flex;
  flex-direction: row;
  
}

.leftside {
background: #030303;
width: 25rem;
display: inline-flex;
  align-items: center;
  justify-content: center;
border-top-left-radius: 1.5rem;
  border-bottom-left-radius: 1.5rem;
}

.product {
  object-fit: cover;
width: 20em;
  height: 20em;
  border-radius: 100%;
}

.rightside {
  background-color: #ffffff;
width: 35rem;
border-bottom-right-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  padding: 1rem 2rem 3rem 3rem;
}

p{
  display:block;
  font-size: 1.1rem;
  font-weight: 400;
  margin: .8rem 0;
}

.inputbox
{
  color:#030303;
width: 100%;
  padding: 0.5rem;
  border: none;
  border-bottom: 1.5px solid #ccc;
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  font-family: 'Roboto', sans-serif;
  color: #615a5a;
  font-size: 1.1rem;
  font-weight: 500;
outline:none;
}

.expcvv {
  display:flex;
  justify-content: space-between;
  padding-top: 0.6rem;
}

.expcvv_text{
  padding-right: 1rem;
}
.expcvv_text2{
  padding:0 1rem;
}

.button{
  background: linear-gradient(
135deg
, #353234 0%, #298096 100%);
  padding: 15px;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 400;
  font-size: 1.2rem;
  margin-top: 10px;
  width:100%;
  letter-spacing: .11rem;
  outline:none;
}

.button:hover
{
transform: scale(1.05) translateY(-3px);
  box-shadow: 3px 3px 6px #38373785;
}

@media only screen and (max-width: 1000px) {
  .card{
      flex-direction: column;
      width: auto;
    
  }

  .leftside{
      width: 100%;
      border-top-right-radius: 0;
      border-bottom-left-radius: 0;
    border-top-right-radius:0;
    border-radius:0;
  }

  .rightside{
      width:auto;
      border-bottom-left-radius: 1.5rem;
      padding:0.5rem 3rem 3rem 2rem;
    border-radius:0;
  }
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #312e30;
  }
  
}</style>