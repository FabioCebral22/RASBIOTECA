<template>
  <div id="app">
    <HeaderVue/>
    <router-view/>
  </div>
</template>

<script>
import router from './router'
import HeaderVue from './components/HeaderVue.vue';

export default {
  name: 'App',
  components: {
    HeaderVue
  },
  router
}

</script>