<template>
    <div class="footer">
    <div>
        <img src="/img/rasbioteca-big-white.png">
    </div>
    <div>
        <p>© 2022 - 2023 - Todos los derechos reservados</p>
    </div>
    <div class="rrss">
        <img src="/img/instagram.png">
        <img src="/img/facebook.png">
        <img src="/img/twitter.png">
        <img src="/img/tik-tok.png">
    </div>
    <div class="legal">
        <a>Aviso Legal</a>
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
img{
    max-height: 50px;
    max-width: 50px;
}
.footer{
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: black;
    color: white;
    padding: 2% 0 2% 0;

}
.legal a{
    margin-right: 10px;
}
</style>