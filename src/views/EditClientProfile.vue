<template>
    <div class="editar-cliente">
        <h1>Editar Perfil de Cliente</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="clientNickname">Nickname:</label>
                <input id="clientNickname" v-model="client.client_nickname" type="text" class="input-field" required />
            </div>

            <div class="form-group">
                <label for="clientPassword">Contraseña:</label>
                <input id="clientPassword" v-model="client.client_password" type="password" class="input-field" required />
            </div>

            <div class="form-group">
                <label for="clientName">Nombre:</label>
                <input id="clientName" v-model="client.client_name" type="text" class="input-field" required />
            </div>

            <div class="form-group">
                <label for="clientImg">Imagen de Perfil:</label>
                <input id="clientImg" type="file" ref="fileInput" class="input-field" @change="onFileChange" />
            </div>

            <button type="submit" class="submit-button" :disabled="!formIsValid">Guardar Cambios</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'EditClientProfile',
    data() {
        return {
            client: {
                client_id: '',
                client_nickname: '',
                client_password: '',
                client_name: '',
                client_img: null,
            },
        };
    },
    computed: {
        formIsValid() {
            return (
                this.client.client_nickname &&
                this.client.client_password &&
                this.client.client_name
            );
        },
    },
    methods: {
        async submitForm() {
            const formData = new FormData();
            formData.append('client_nickname', this.client.client_nickname);
            formData.append('client_password', this.client.client_password);
            formData.append('client_name', this.client.client_name);
            formData.append('client_id', this.client.client_id);

            // Adjuntar la imagen si se ha seleccionado un nuevo archivo
            if (this.client.client_img) {
                formData.append('client_img', this.client.client_img);
            }

            try {
                const response = await fetch(`http://localhost:3001/api/clients/edit`, {
                    method: 'PUT',
                    body: formData,
                });
                const responseData = await response.json();
            } catch (error) {
                console.error(error);
            }
        },

        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.client.client_img = file;
            }
        },

        async fetchClientDetails() {
            try {
                const clientId = this.$route.params.client_id;
                const response = await fetch(`http://localhost:3001/api/clients/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const responseData = await response.json();
                this.client = responseData.body;
            } catch (error) {
                console.error(error);
            }
        },
    },
    created() {
        this.fetchClientDetails();
    },
};
</script>

<style scoped>
.editar-cliente {
    color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    max-width: 500px;
    margin-bottom: 10px;
}

.input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 5px 0;
    font-family: 'Poppins', sans-serif;
}
h1, label{
    color: #e3e3e3
}
label{
    font-weight: 600;
}
.submit-button {
    font-weight: 600;
    width: 50%;
    padding: 10px;
    margin: 20px auto;
    display: block;
    font-family: 'Poppins', sans-serif;
    background-color: #FF008C;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
}
</style>
