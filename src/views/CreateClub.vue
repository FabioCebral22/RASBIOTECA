<template>
    <div class="club-form">
        <h1>Crear Club</h1>
        <form @submit.prevent="submitForm">

            <label for="club_img">Imagen del Club:</label>
            <input type="file" @change="onFileChange">
            <img v-if="imagePreview" :src="imagePreview" alt="Vista previa de la imagen" class="imagepreview">

            <br>

            <label for="company_nif">NIF de la Compañía:</label>
            <input id="company_nif" v-model="form.company_nif" required>

            <label for="club_name">Nombre del Club:</label>
            <input id="club_name" v-model="form.club_name" required>

            <label for="club_rules">Reglas del Club:</label>
            <textarea id="club_rules" v-model="form.club_rules" required></textarea>

            <label for="club_description">Descripción del Club:</label>
            <textarea id="club_description" v-model="form.club_description" required></textarea>

            <label for="club_schedule">Horario del Club:</label>
            <input id="club_schedule" v-model="form.club_schedule" required>

            <button type="submit">Crear Club</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                company_nif: '',
                club_name: '',
                club_rules: '',
                club_description: '',
                club_schedule: '',
                club_img: null
            },
            imagePreview: null
        };
    },
    methods: {
        async getCompanyNIF(token) {
            try {
                const tokenParts = token.split('.');
                const payLoad = JSON.parse(atob(tokenParts[1]));
                console.log(payLoad.company_email);
                const response = await fetch('http://localhost:3001/api/company/nif', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        company_email: payLoad.companyData.company_email
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                this.form.company_nif = data.company_nif;
            } catch (error) {
                console.error(error);
            }
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.form.club_img = file;
            this.imagePreview = URL.createObjectURL(file);
        },
        async submitForm() {
            const formData = new FormData();
            Object.keys(this.form).forEach(key => formData.append(key, this.form[key]));
            console.log(formData);
            try {
                const response = await fetch('http://localhost:3001/api/club', {
                    method: 'POST',
                    body: formDataa
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    },
    created() {
        const token = localStorage.getItem('token');
        this.getCompanyNIF(token);
    }
};
</script>

<style scoped>
.club-form {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.imagepreview{
    width: 15rem;
    height: 15rem;
    margin: 10px 0;
    border-radius: 10px;

}

label {
    font-weight: bold;
    margin-top: 10px;
}

input,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 5px 0;
    font-family: 'Poppins', sans-serif;
    box-sizing: border-box;
}

button[type="submit"] {
    width: 100%;
    padding: 10px;
    margin: 20px 0;
    font-family: 'Poppins', sans-serif;
    background-color: #FF008C;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
    background-color: #ff3399;
}
</style>