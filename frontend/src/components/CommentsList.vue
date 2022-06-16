<script>
import Controller from "../middleware/controller.js";

import CommentComponent from "./CommentComponent";
import NewComment from "./NewComment";

let controller = new Controller();

export default {
    components: { CommentComponent, NewComment },
    props: {
        postId: Number,
    },
    data() {
        return {
            xComments: [],
            xUsers: [],
        };
    },
    async mounted() {
        this.xComments = await controller.getComments(this.postId);
        this.xUsers = await controller.getUsers();
    },
    methods: {
        getUserName(idUser) {
            let user = this.xUsers.find((user) => user.id === idUser);
            let name = "";
            if (user) {
                name = `${user.firstname} ${user.lastname}`;
                return name;
            }
            return "Anonymous";
        },
        formatDate(sqlDate) {
            let jsDate = sqlDate.slice(0, 10);
            return jsDate;
        },

        async updateList() {
            console.log("update comments");
            this.xComments = await controller.getComments(this.postId);
        },
    },
};
</script>

<template>
    <div
        v-for="comment in xComments"
        :key="comment.id"
        class="comments"
        id="CommentsList"
    >
        <CommentComponent v-bind:comment="comment" />
    </div>
    <NewComment v-bind:postId="postId" @new-comment="updateList" />
    <button :onclick="updateList">REFRESH</button>
</template>
