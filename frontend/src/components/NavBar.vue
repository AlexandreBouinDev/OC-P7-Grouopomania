<script>
import homeIcon from "vue-material-design-icons/Home.vue";
import accountIcon from "vue-material-design-icons/Account.vue";
import powerIcon from "vue-material-design-icons/Power.vue";

export default {
  components: {
    homeIcon,
    accountIcon,
    powerIcon
  },
  data() {
    return {
      localUser: localStorage.getItem("userId")
    };
  },
  methods: {
    logout() {
      localStorage.clear();
    }
  }
};
</script>

<template>
  <nav id="navbar">
    <div class="left">
      <router-link to="/home">
        <img src="../assets/icon-left-font-monochrome-white.png" height="30" />
      </router-link>
    </div>
    <div class="right">
      <router-link to="/home"
        ><p>Fil d'actualité</p>
        <homeIcon
      /></router-link>
      <router-link :to="/profile/ + this.localUser"
        ><p>Mon profil</p>
        <accountIcon
      /></router-link>
      <router-link to="/login" v-on:click="logout()"
        ><p>Déconnexion</p>
        <powerIcon
      /></router-link>
    </div>
  </nav>
</template>
