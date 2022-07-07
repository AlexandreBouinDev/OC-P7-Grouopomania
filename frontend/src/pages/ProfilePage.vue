<script>
import "../styles/Profile.scss";

import NavBar from "../components/NavBar.vue";
import ProfileInfo from "../components/ProfileInfo.vue";
import PostComponent from "../components/PostComponent";

import Controller from "@/middleware/controller";
let controller = new Controller();

export default {
    components: {
        NavBar,
        ProfileInfo,
        PostComponent,
    },
    data() {
        return {
            xPosts: [],
        };
    },
    async mounted() {
        this.loadUserPosts(this.getUserId());
    },
    methods: {
        getUserId() {
            let url = window.location.href.split("/");
            let userId = url.at(-1);
            return userId;
        },
        async loadUserPosts(userId) {
            this.xPosts = await controller.getUserPosts(userId);
        },
    },
};
</script>

<template id="ProfilePage">
    <NavBar />
    <div class="page-body">
        <ProfileInfo v-bind:userId="getUserId()" />
        <h2 class="history">Historique des posts</h2>
        <div v-for="post in xPosts" :key="post.id" class="post" id="PostsList">
            <PostComponent v-bind:post="post" />
        </div>
    </div>
</template>
