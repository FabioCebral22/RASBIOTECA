<template>
    <div class="home">
        <div class="content">
            <h2>REGISTRATE COMO:</h2>
        <button v-on:click="toggleClientForm">Cliente</button>
        <button v-on:click="toggleCompanyForm">Empresa</button>
        <RegisterClient v-if="showRegisterClient" />
        <RegisterCompany v-if="showRegisterCompany" />
    </div>
    </div>
</template>

<script>
import RegisterClient from '../components/RegisterClient.vue';
import RegisterCompany from '../components/RegisterCompany.vue';
export default {
    name: 'Register',
    components: {
        RegisterClient,
        RegisterCompany,
    },
    data() {
        return {
            showRegisterClient: true,
            showRegisterCompany: false,
        };
    },
    methods: {
        toggleClientForm() {
            if (!this.showRegisterClient) {
                this.showRegisterClient = true;
                this.showRegisterCompany = false;
                return;
            }
        },
        toggleCompanyForm() {
            if (!this.showRegisterCompany) {
                this.showRegisterClient = false;
                this.showRegisterCompany = true;
                return;
            }
        }
    }
};
</script>

<style scoped>
h2{
    color:#BD0068
}
.home {
    padding-top: 2rem;
    background: #222431;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    margin-top: 0;
    padding-top: 0;
}
.content {
  text-align: center;
}
button {
  width: 20%;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 10px;
  margin: 12px 10px 24px;
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
</style>