<template>
          <HeaderVue />
    <h1>PERFIL</h1>
    <FooterVue></FooterVue>
</template>
<script>
import FooterVue from '@/components/FooterVue.vue';
import HeaderVue from '../components/HeaderVue.vue';

export default {
  name: 'ProfileView',
  components: {
    FooterVue,
    HeaderVue
  }
}
</script>