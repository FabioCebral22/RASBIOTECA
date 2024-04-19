<template>
  <body>
    <div id="particles-js" class="snow"></div>

    <main>
      <div class="left-side"></div>

      <div class="right-side">
        <form @submit.prevent="login">
          <div class="logo-container btn-group">
            <img class="logotipo" src="/img/RASBIOTECA(4)(1)(1).png" alt="">
          </div>

          <label for="email">Email</label>
          <input type="email" v-model="email" placeholder="Introduce tu correo de empresa" name="email" required />

          <label for="password">Password</label>
          <input type="password" v-model="password" placeholder="Introduce tu contraseña" name="password" required />

          <button type="submit" class="login-btn">Sign in</button>
          <div class="links">
            <a href="#">Forgot password?</a>
            <a href="#">Do not have an account?</a>
          </div>
        </form>
      </div>
    </main>
  </body>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3001/api/company/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            company_email: this.email,
            company_password: this.password
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful');
          localStorage.setItem('token', data.body.token);
          this.$router.push('/home');
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>
  
  
<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  width: 100%;
  background: #222431;
  padding: 0;
  margin: 0;
}

/* Snow */

#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: #222431;

}

main {
  display: grid;
  grid-template-columns: 45% 55%;
  place-items: center;
  background: #000000;
  width: min(700px, 95%);
  border-radius: 20px;
}

/* Left Side */

.left-side {
  height: 100%;
  width: 100%;
  background-image: url(https://img.freepik.com/foto-gratis/amigos-tintinean-vasos-bebida-bar-moderno_1150-18971.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  pointer-events: none;
  border-radius: 20px 0 0 20px;
}

/* Right Side */

.right-side {
  padding: 60px;
}

/* Button Group */
.btn-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin-bottom: 32px0px;
}

.btn-group .btn {
  display: flex;
  align-items: center;
  column-gap: 4px;
  width: max-content;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 8px 6px;
  border: 2px solid #6b7280;
  border-radius: 5px;
  background-color: #f6f6f6;
  transform: scale(1);
  cursor: pointer;
  transition: transform 0.1s ease, background-color 0.5s, color 0.5s;
}

.btn-group .btn:focus {
  transform: scale(0.97);
}

.btn-group .btn:hover {
  background-color: #000;
  color: #eee;
}

.btn img {
  width: 16px;
  height: 16px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  border-radius: 50%;
  padding: 2px;
}

/* OR */

.or {
  position: relative;
  text-align: center;
  margin-bottom: 24px;
  font-size: 1rem;
  font-weight: 600;
}

.or::before,
.or::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #000;
}

.or::before {
  left: 0;
}

.or::after {
  right: 0;
}

/* Inputs and Labels */

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

/* Login Button */

.login-btn {
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

.login-btn:hover {
  background-color: #BD0068;
  color: #ffffff;
}

/* Links */

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
/* Centro del logo */
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