<template>
    <div class="home">
        <div class="content">
        <button v-on:click="toggleClientForm">Cliente</button>
        <button v-on:click="toggleCompanyForm">Empresa</button>
        <LoginClient v-if="showLoginClient" />
        <LoginCompany v-if="showLoginCompany" />
        </div>
    </div>
</template>

<script>
import LoginClient from '../components/LoginClient.vue';
import LoginCompany from '../components/LoginCompany.vue';
export default {
    name: 'Login',
    components: {
        LoginClient,
        LoginCompany,
    },
    data() {
        return {
            showLoginClient: true,
            showLoginCompany: false,
        };
    },
    methods: {
        toggleClientForm() {
            if (!this.showLoginClient) {
                this.showLoginClient = true;
                this.showLoginCompany = false;
                return;
            }
        },
        toggleCompanyForm() {
            if (!this.showLoginCompany) {
                this.showLoginClient = false;
                this.showLoginCompany = true;
                return;
            }
        }
    }
};
</script>

<style scoped>

.home {
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