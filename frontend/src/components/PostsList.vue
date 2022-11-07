<script>
import NewPost from "../components/NewPost";
import PostComponent from "./PostComponent";
import CommentsList from "./CommentsList";

import Controller from "../middleware/controller.js";
let controller = new Controller();

export default {
  components: {
    NewPost,
    PostComponent,
    CommentsList
  },
  data() {
    return {
      xPosts: []
    };
  },
  async mounted() {
    this.loadPost();
  },

  methods: {
    updateList() {
      this.reloadList();
    },
    async reloadList() {
      this.xPosts = await controller.getPosts();
      this.forceUpdate();
    },
    async loadPost() {
      let userId = localStorage.getItem("userId");
      let tPosts = await controller.getPosts();
      let tLikes = await controller.getUserLikes(userId);
      if (tPosts.length != 0 && tLikes.length != 0) {
        tPosts.forEach((post) => {
          if (tLikes.find((like) => like.postId === post.id)) {
            post.isLiked = true;
          }
        });
      }
      this.xPosts = tPosts;
    }
  }
};
</script>

<template>
  <NewPost @new-post="updateList()" />
  <div v-for="post in xPosts" :key="post.id" class="post" id="PostsList">
    <PostComponent v-bind:post="post" @refresh-post="updateList" />
    <div class="comment-section">
      <CommentsList v-bind:postId="post.id" @refresh-post="updateList" />
    </div>
  </div>
</template>
