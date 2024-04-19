<template>
  <body>
    <div id="particles-js" class="snow"></div>

    <main>
      <div class="left-side"></div>

      <div class="right-side">
        <form @submit.prevent="registerCompany">
          <div class="logo-container btn-group">
            <img class="logotipo" src="/img/RASBIOTECA(4)(1)(1).png" alt="">
          </div>
          <label for="company-name">Nombre de la Empresa</label>
          <input type="text" v-model="companyName" placeholder="Introduce el nombre de la empresa" required />

          <label for="company-nif">NIF</label>
          <input type="text" v-model="companyNif" placeholder="Introduce el NIF de la empresa" required />

          <label for="company-info">Información de la Empresa</label>
          <textarea v-model="companyInfo" placeholder="Introduce la información de la empresa" required></textarea>

          <label for="company-email">Email</label>
          <input type="email" v-model="companyEmail" placeholder="Introduce el correo de la empresa" required />

          <label for="company-password">Password</label>
          <input type="password" v-model="companyPassword" placeholder="Introduce la contraseña" required />
          <span class="error" v-if="formError && !validatePassword()">La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número</span>

          <label for="confirm-password">Confirmar Password</label>
          <input type="password" v-model="confirmPassword" placeholder="Confirma tu contraseña" required />
          <span class="error" v-if="formError && companyPassword !== confirmPassword">Las contraseñas no coinciden</span>

          <button type="submit" class="login-btn">Registrarse</button>
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
import router from '@/router';

export default {
  name: 'RegisterCompany',
  data() {
    return {
      companyName: '',
      companyNif: '',
      companyEmail: '',
      companyPassword: '',
      confirmPassword: '',
      companyInfo: '',
      formError: false
    };
  },
  methods: {
    validatePassword() {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(this.companyPassword);
    },
    async registerCompany() {
      if (!this.validatePassword() || this.companyPassword !== this.confirmPassword) {
        this.formError = true;
        return;
      }
      try {
        const response = await fetch('http://localhost:3001/api/companies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            company_name: this.companyName,
            company_nif: this.companyNif,
            company_email: this.companyEmail,
            company_password: this.companyPassword,
            company_info: this.companyInfo
          })
        });

        if (response.ok) {
          console.log('Registro exitoso');
          router.push("/")
        } else {
          console.error('Error al registrar');
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
    min-height: 100vh;
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
    margin-bottom: 32px;
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
  
  .error {
    color: #ff008c;
    font-size: 0.8rem;
    margin-top: 4px;
  }
  </style>  