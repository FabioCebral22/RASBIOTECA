<template>
  <div class="app">
    <HeaderVue/>
    <router-view/>
  </div>
  <FooterVue/>
</template>

<script>
import FooterVue from './components/FooterVue.vue';
import router from './router'
import HeaderVue from './components/HeaderVue.vue';

export default {
  name: 'App',
  components: {
    HeaderVue,
    FooterVue
  },
  router
}

</script>

<style scoped>

.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
    padding: 0;
}

</style>