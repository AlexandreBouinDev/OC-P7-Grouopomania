<script>
export default {
    data() {
        return {
            localUser: localStorage.getItem("userId"),
        };
    },
    methods: {
        logout() {
            localStorage.clear();
        },
    },
};
</script>

<template>
    <nav id="navbar">
        <div class="left">
            <router-link to="/">
                <img
                    src="../assets/icon-left-font-monochrome-white.png"
                    height="30"
                />
            </router-link>
        </div>
        <div class="right">
            <router-link to="/">Fil d'actualité</router-link>
            <router-link :to="/profile/ + this.localUser"
                >Mon profil</router-link
            >
            <router-link to="/login" v-on:click="logout()"
                >Déconnexion</router-link
            >
        </div>
    </nav>
</template>
