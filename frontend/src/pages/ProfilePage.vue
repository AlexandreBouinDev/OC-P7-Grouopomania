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
    PostComponent
  },
  data() {
    return {
      xPosts: [],
      user: {
        loaded: false
      },
      userId: 0
    };
  },
  async mounted() {
    this.loadUserPosts(this.getUserId());
    this.userId = this.getUserId;
    this.user = await this.getUserData(this.getUserId());
    this.user.loaded = true;
  },
  watch: {
    async $route(to) {
      if (to.name === "profile") {
        this.loadUserPosts(this.getUserId());
        this.userId = this.getUserId;
        this.user = await this.getUserData(this.getUserId());
        this.user.loaded = true;
      }
    }
  },
  methods: {
    getLocalUserId() {
      return localStorage.getItem("userId");
    },
    getUserId() {
      let url = window.location.href.split("/");
      let userId = url.at(-1);
      return userId;
    },
    async getUserData(userId) {
      let data = await controller.getUserData(userId);
      return data[0];
    },
    async loadUserPosts(userId) {
      this.xPosts = await controller.getUserPosts(userId);
    },
    updateProfile(e) {
      this.user.firstname = e.get("firstname");
      this.user.lastname = e.get("lastname");
      this.user.position = e.get("position");
      this.user.email = e.get("email");
    }
  }
};
</script>

<template id="ProfilePage">
  <NavBar />
  <div class="page-body">
    <ProfileInfo
      v-if="this.user.loaded"
      v-bind:userId="getLocalUserId()"
      v-bind:user="this.user"
      @profile-edited="updateProfile"
    />
    <h2 class="history">Historique des posts</h2>
    <div v-for="post in xPosts" :key="post.id" class="post" id="PostsList">
      <PostComponent v-bind:post="post" />
    </div>
  </div>
</template>
