<script>
import Controller from "../middleware/controller.js";
let controller = new Controller();
import likeIcon from "vue-material-design-icons/Heart.vue";

export default {
    data() {
        return {
            likedClass: "",
        };
    },
    props: {
        userId: Number,
        postId: Number,
        isLiked: Boolean,
    },
    components: { likeIcon },
    mounted() {
        if (this.isLiked) {
            this.likedClass = "liked";
        } else {
            this.likedClass = "";
        }
    },
    methods: {
        handleLike() {
            let data = { userId: parseInt(this.userId), postId: this.postId };
            controller.likePost(data);
            this.$emit("new-like");
        },
    },
};
</script>

<template>
    <div class="likebutton" :class="{ isLiked }" v-on:click="handleLike">
        <likeIcon />J'aime
    </div>
</template>
