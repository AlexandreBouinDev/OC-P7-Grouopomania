<script>
import Controller from "../middleware/controller.js";
let controller = new Controller();

import LikeButton from "./LikeButton";

import editIcon from "vue-material-design-icons/PencilCircleOutline.vue";
import deleteIcon from "vue-material-design-icons/DeleteCircleOutline.vue";
import sendIcon from "vue-material-design-icons/Send.vue";

export default {
  components: { LikeButton, editIcon, deleteIcon, sendIcon },

  data() {
    return {
      path: process.env.VUE_APP_BACKPATH,
      xUsers: [],
      editMode: "",
      localUser: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin")
    };
  },
  props: {
    post: {
      title: String,
      content: String,
      userId: Number,
      creationDate: String,
      id: Number,
      img: String,
      isLiked: Boolean
    }
  },
  async mounted() {
    this.xUsers = await controller.getUsers();
    console.log(this.post);
  },
  methods: {
    getUserData(idUser) {
      let user = this.xUsers.find((user) => user.id === idUser);
      let name = "";
      let avatar = "";
      if (user) {
        name = `${user.firstname} ${user.lastname}`;
        avatar = user.avatar;
        return { name, avatar };
      }
      return "Anonymous";
    },
    formatDate(sqlDate) {
      let jsDate = sqlDate.slice(0, 10);
      return jsDate;
    },
    editPost() {
      this.editMode = "editMode";
    },
    deletePost(id) {
      controller.deletePost(id);
      this.$emit("refresh-post");
    },
    sendEditedPost(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      const postReq = {
        title: data.get("title"),
        content: data.get("content"),
        id: this.post.id,
        userId: this.userId
      };
      controller.editPost(postReq);
      this.editMode = "";
      this.$emit("refresh-post");
    },
    setAvatarPath(avatar) {
      let src = `${this.path}/images/${avatar ?? "undefined.png"} `;
      return src;
    },
    setImagePath(image) {
      let src = `${this.path}/images/${image}`;
      return src;
    },
    refreshPost() {
      this.$emit("refresh-post");
    }
  }
};
</script>

<template>
  <div class="post-content">
    <div class="post-metadata" :class="editMode">
      <div class="post-title">
        <h2>{{ this.post.title }}</h2>
        <div
          class="post-actions"
          :class="editMode"
          v-if="this.localUser == this.post.userId || this.isAdmin == 1"
        >
          <edit-icon v-on:click="editPost()" /><deleteIcon
            v-on:click="deletePost(post.id)"
          />
        </div>
      </div>
      <div class="post-header">
        <a :href="/profile/ + this.post.userId">
          <h3 class="post-user">
            {{ getUserData(this.post.userId).name }}
          </h3>
        </a>
        <p class="post-date">
          {{ formatDate(this.post.creationDate) }}
        </p>
      </div>
      <a :href="/profile/ + this.post.userId">
        <img
          :src="setAvatarPath(getUserData(this.post.userId).avatar)"
          className="post-avatar"
      /></a>
    </div>
    <p class="post-message" :class="editMode">{{ this.post.content }}</p>
    <form
      :class="editMode"
      class="edit-form"
      @submit="(e) => sendEditedPost(e)"
    >
      <div class="edit-fields">
        <input type="text" :value="post.title" name="title" />
        <textarea type="text" :value="post.content" name="content"></textarea>
      </div>
      <button class="edit-action" type="submit">
        <send-icon />
      </button>
    </form>
    <img
      v-if="this.post.img"
      :src="setImagePath(this.post.img)"
      className="post-image"
    />
  </div>
  <LikeButton
    v-bind:userId="this.localUser"
    v-bind:postId="this.post.id"
    v-bind:isLiked="this.post.isLiked"
  />
</template>
