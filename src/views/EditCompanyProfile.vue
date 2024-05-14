<template>
    <div class="editar-compania">
        <h1>Editar Compañía</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="companyName">Nombre de la Compañía:</label>
                <input id="companyName" v-model="company.company_name" type="text" class="input-field" required />
            </div>

            <div class="form-group">
                <label for="companyInfo">Información de la Compañía:</label>
                <textarea id="companyInfo" v-model="company.company_info" class="input-field" required></textarea>
            </div>

            <div class="form-group">
                <label for="companyLogo">Logo de la Compañía:</label>
                <input id="companyLogo" type="file" ref="fileInput" class="input-field" @change="onFileChange" />
            </div>

            <button type="submit" class="submit-button" :disabled="!formIsValid">Guardar Cambios</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'EditCompanyProfile',
    data() {
        return {
            company: {
                company_name: '',
                company_info: '',
                company_img: null,
            },
        };
    },
    computed: {
        formIsValid() {
            return (
                this.company.company_name &&
                this.company.company_info
            );
        },
    },
    methods: {
        async submitForm() {
            const formData = new FormData();
            formData.append('company_name', this.company.company_name);
            formData.append('company_info', this.company.company_info);

            if (this.company.company_img) {
                formData.append('company_img', this.company.company_img);
            }

            try {
                const companyId = this.$route.params.company_nif;
                const response = await fetch(`http://localhost:3001/api/company/edit/${companyId}`, {
                    method: 'PUT',
                    body: formData,
                });
                const responseData = await response.json();
                console.log(responseData);
                this.$router.push("/profile")
            } catch (error) {
                console.error(error);
            }
        },

        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.company.company_img = file;
            }
        },

        async fetchCompanyDetails() {
            try {
                const companyId = this.$route.params.companyId;
                const response = await fetch(`http://localhost:3001/api/company/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const responseData = await response.json();
                this.company = responseData.body;
            } catch (error) {
                console.error(error);
            }
        },
    },
    created() {
        this.fetchCompanyDetails();
    },
};
</script>

<style scoped>

h1{
    color: e3e3e3;
}
 
.editar-compania {
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
h1, label, #companyLogo{
    color: #e3e3e3
}
label{
    font-weight: 600;
}
.input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 5px 0;
    font-family: 'Poppins', sans-serif;
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