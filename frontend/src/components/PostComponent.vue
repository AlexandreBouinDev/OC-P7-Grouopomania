<script>
import Controller from "../middleware/controller.js";
let controller = new Controller();

import editIcon from "vue-material-design-icons/PencilCircleOutline.vue";
import deleteIcon from "vue-material-design-icons/DeleteCircleOutline.vue";
import sendIcon from "vue-material-design-icons/Send.vue";

export default {
    components: { editIcon, deleteIcon, sendIcon },

    data() {
        return {
            xUsers: [],
            editMode: "",
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
        },
    },
    async mounted() {
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
        editPost() {
            this.editMode = "editMode";
        },
        deletePost(id) {
            controller.deletePost(id);
        },
        sendEditedPost(e) {
            e.preventDefault();
            const data = new FormData(e.target);
            const postReq = {
                title: data.get("title"),
                content: data.get("content"),
                id: this.post.id,
            };
            controller.editPost(postReq);
            this.editMode = "";
        },
    },
};
</script>

<template>
    <div class="post-content">
        <div class="post-metadata" :class="editMode">
            <div class="post-header">
                <h2 class="post-title">{{ this.post.title }}</h2>
                <h3 class="post-user">{{ getUserName(this.post.userId) }}</h3>
            </div>
            <p class="post-date">{{ formatDate(this.post.creationDate) }}</p>
        </div>
        <p class="post-message" :class="editMode">{{ this.post.content }}</p>
        <form
            :class="editMode"
            class="edit-form"
            type="submit"
            @submit="(e) => sendEditedPost(e)"
        >
            <div class="edit-fields">
                <input type="text" :value="post.title" name="title" />
                <textarea
                    type="text"
                    :value="post.content"
                    name="content"
                ></textarea>
            </div>
            <button class="edit-action" type="submit">
                <send-icon />
            </button>
        </form>
        <div class="post-actions" :class="editMode">
            <edit-icon v-on:click="editPost()" /><deleteIcon
                v-on:click="deletePost(post.id)"
            />
        </div>
    </div>
</template>
