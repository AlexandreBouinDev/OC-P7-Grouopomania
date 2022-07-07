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
        CommentsList,
    },
    data() {
        return {
            xPosts: [],
        };
    },
    async mounted() {
        this.loadPost();
    },

    methods: {
        updateList() {
            console.log("je reload la liste");
            this.loadPost();
        },
        async loadPost() {
            this.xPosts = await controller.getPosts();
        },
    },
};
</script>

<template>
    <NewPost @new-post="updateList()" />
    <div v-for="post in xPosts" :key="post.id" class="post" id="PostsList">
        <PostComponent v-bind:post="post" />
        <div class="comment-section">
            <CommentsList v-bind:postId="post.id" @refresh-post="updateList" />
        </div>
    </div>
</template>
