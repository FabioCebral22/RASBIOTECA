<template>
    <div class="entrada">
        <img src="/img/discoteca1.jpg" alt="Discoteca">
        <div class="texto">
            <div class="dia-hora">
                <div class="dia">
                    <p>Viernes 15 de marzo</p>
                </div>
                <p class="hora">00:00 - 06:00</p>
            </div>
            <h1 class="titulo">VIERNES 15 DE MARZO - HOT DISCO NIGHT</h1>
        </div>
    </div>
</template>

<script scoped>
export default {
    name: 'EntradaVue'
}
</script>

<style scoped>

/* Estilos para PC */
.entrada {
    display: flex;
    width: 70%;
    height: 17rem;
    align-items: center;
    background-color: #56565a;
    color: #FFFFFF;
    border-radius: 10px;
    margin: 1rem;
}

img {
    width: 15rem;
    height: 17rem;
    border-radius: 10px;
    margin-right: 1rem;
}

.texto {
    flex-direction: column;
}

.titulo {
    font-size: 3rem;
    width: 90%;
}

.dia-hora {
    display: flex;
    align-items: center;
    margin-top: 2.5rem;
}

.dia {
    text-align: center;
    background-color: #FF008C;
    color: #FFFFFF;
    border-radius: 20px;
    padding: 0.3rem;
}

.hora {
    font-size: 0.9rem;
    margin-left: 1rem;
    margin-top: 1.1rem;
}

/* Estilos para tablet */
@media screen and (max-width: 1023px) {
    .entrada {
        width: 80%;
        height: auto;
        flex-direction: column;
        margin: 1rem auto;
    }

    img {
        width: 100%;
        height: auto;
        margin-right: 0;
        border-radius: 10px 10px 0 0;
    }

    .texto {
        padding: 1rem;
    }

    .titulo {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .hora {
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }
}

/* Estilos para móvil */
@media screen and (max-width: 479px) {
    .entrada {
        width: 90%;
    }

    img {
        border-radius: 10px 10px 0 0;
    }

    .titulo {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }

    .hora {
        font-size: 0.8rem;
        margin-top: 0.3rem;
    }
}
</style>
