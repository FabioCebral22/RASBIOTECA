<template>
    <div>
      <input v-model="admin_name" type="text" placeholder="Admin username">
      <input v-model="admin_email" type="email" placeholder="Admin Email">
      <input v-model="admin_password" type="password" placeholder="Admin Password">
      <button @click="register">Register</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        admin_name: '',
        admin_email: '',
        admin_password: ''
      }
    },
    methods: {
      async register() {
        try {
          const response = await fetch('http://raul-argemi-7e6.alwaysdata.net/api/admin/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              admin_name: this.admin_name,
              admin_email: this.admin_email,
              admin_password: this.admin_password
            })
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
  
          if (data.ok) {
            alert('Admin registered successfully');
            this.admin_name = '';
            this.admin_email = '';
            this.admin_password = '';
          }
        } catch (error) {
          console.error('Error registering admin:', error);
        }
      }
    }
  }
  </script>

<style scoped>
h1{
    color: white;
    text-align: center;
}

input {
    width: 100%;
    padding: 12px 20px;
    border: 2px solid #ccc;
    outline: 0;
    border-radius: 5px;
    background-color: transparent;
    margin: 4px 0 18px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.5s;
    color: #E3E3E3;
}

input:focus {
    border: 2px solid #BD0068;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: #000;
    transition: background-color 5000s ease-in-out 0s;
}

label {
    font-weight: 600;
    font-size: 0.9rem;
}


button {
    width: 100%;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 8px 24px;
    margin: 12px 0 24px;
    border: 2px solid #6b7280;
    border-radius: 5px;
    background-color: #000;
    cursor: pointer;
    transition: all 0.5s;
    color: #e3e3e3;
}

button {
    background-color: #BD0068;
    color: #ffffff;
}


.links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

a:link,
a:visited,
a:hover,
a:active {
    text-decoration: none;
}

a {
    color: #ff008c;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: -1px;
    transition: all 0.4s ease;
}

a:hover {
    color: white;
}

.logotipo {
    height: 3rem;
    width: 15rem;
}

.logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 32px;
}

@media only screen and (max-width: 600px) {
    main {
        grid-template-columns: 100%;
        border-radius: 0;
    }

    .left-side {
        display: none;
    }

    .right-side {
        width: 100%;
        padding: 20px;
    }
}

@media only screen and (min-width: 601px) and (max-width: 1024px) {
    main {
        width: 90%;
    }
}

@media only screen and (min-width: 1025px) {
    main {
        width: 80%;
    }
}
</style>