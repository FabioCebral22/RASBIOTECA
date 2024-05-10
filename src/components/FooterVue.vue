<template>
    <div class="footer">
        <div>
            <img src="/img/rasbioteca-big-white.png">
        </div>
        <div>
            <p class="copy">© 2022 - 2023 - Todos los derechos reservados</p>
        </div>
        <div class="rrss">
            <img src="/img/instagram.png">
            <img src="/img/facebook.png">
            <img src="/img/twitter.png">
            <img src="/img/tik-tok.png">
        </div>
        <div class="legal">
            <a>Política de Privacidad</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FooterVue'
}
</script>
<style scoped>
img {
    max-height: 50px;
    max-width: 50px;
}

.footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: black;
    color: white;
    padding: 2% 0 2% 0;
    bottom: 0;
    width: 100%;
}

.legal a {
    margin-right: 10px;
}

/* For tablets */
@media (max-width: 1024px) {
    .footer {
        flex-direction: column;
    }

    .legal a {
        margin-right: 0;
        margin-bottom: 10px;
    }

    .copy {
        font-size: 1rem;
    }
}

/* For mobile phones */
@media (max-width: 768px) {
    .footer {
        padding: 5% 0 5% 0;
    }

    .legal a {
        font-size: 14px;
    }

    .copy {
        font-size: 0.8rem;
    }
}

/* For smaller mobile phones */
@media (max-width: 480px) {
    .footer {
        padding: 10% 0 10% 0;
    }

    .legal a {
        font-size: 12px;
    }

    .copy {
        font-size: 0.8rem;
    }
}
</style>