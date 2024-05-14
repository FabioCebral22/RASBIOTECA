<template>
  <div class="body">
    <div class="header">
      <ProfileClient v-if="user"/>
      <ProfileCompany v-if="company"/>
      </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import ProfileClient from '@/components/ProfileClient.vue';
import ProfileCompany from '@/components/ProfileCompany.vue';
import router from '@/router';

export default {
  name: 'ProfileView',
  components: {
    EventCard,
    ProfileClient,
    ProfileCompany
  },
  data() {
    return {
      user: false,
      company: false
    };
  },
  methods: {
    checkIsCompany(token) {
      try {
        if (token) {
          const tokenParts = token.split('.');
          const payload = JSON.parse(atob(tokenParts[1]));
          return payload.companyData && payload.companyData.isCompany === true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error decoding the token:', error);
        return false;
      }
    }
  },
  created() {
    const token = localStorage.getItem('token');

    if (this.checkIsCompany(token)) {
      this.company = true;
      this.user = false;
    } else {
      this.company = false;
      this.user = true;
    }
  },
};
</script>

<style scoped>
.body {
  color: #E3E3E3;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}

.header {
  position: relative;
}

.header-img {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

.user-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}

.profile-image {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  margin-right: 1rem;
  margin-left: 1rem;
}

.info {
  flex-grow: 1;
}

.info h1 {
  margin-bottom: 0.25rem;
}

.info h2 {
  margin-top: 0.25rem;
}

.email {
  font-size: 0.8rem;
}

.rose {
  color: #FF008C;
  font-size: 1.5rem;
  margin-top: 2rem;
  text-align: center;
}

.activities-reviews {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.activities,
.reviews {
  width: 100%;
  margin-top: 2rem;
}

.entries {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* Estilos para móvil */
@media screen and (max-width: 479px) {
  .profile-image {
    width: 6rem;
    height: 6rem;
  }

  .email {
    font-size: 0.7rem;
  }

  .rose {
    font-size: 1.2rem;
  }

  .activities,
  .reviews {
    margin-top: 1rem;
  }
}
</style>