<script>
import Controller from "../middleware/controller.js";
let controller = new Controller();
import likeIcon from "vue-material-design-icons/Heart.vue";

export default {
  data() {
    return {
      likedClass: ""
    };
  },
  props: {
    userId: Number,
    postId: Number,
    isLiked: Boolean
  },
  components: { likeIcon },
  mounted() {
    if (this.isLiked) {
      this.likedClass = "liked";
    }
    console.log(this.isLiked);
  },
  methods: {
    handleLike() {
      let data = { userId: parseInt(this.userId), postId: this.postId };
      if (this.likedClass === "liked") {
        this.likedClass = "";
      } else {
        this.likedClass = "liked";
      }
      controller.likePost(data);
    }
  }
};
</script>

<template>
  <div class="likebutton" :class="this.likedClass" v-on:click="handleLike">
    <likeIcon />J'aime
  </div>
</template>
