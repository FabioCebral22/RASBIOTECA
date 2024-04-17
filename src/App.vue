<template>
  <div class="app">
    <HeaderVue/>
    <router-view/>
    <FooterVue/>
  </div>
</template>

<script>
import router from './router'
import HeaderVue from './components/HeaderVue.vue';

export default {
  name: 'App',
  components: {
    HeaderVue,
  },
  router
}

</script>

<style scoped>

.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

</style>