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
            localUser: localStorage.getItem("userId"),
        };
    },
    props: {
        comment: {
            content: String,
            userId: Number,
            creationDate: String,
            id: Number,
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
        editComment() {
            this.editMode = "editMode";
        },
        deleteComment(id) {
            controller.deleteComment(id);
        },
        sendEditedComment(e) {
            e.preventDefault();
            const data = new FormData(e.target);
            const commentReq = {
                content: data.get("content"),
                id: this.comment.id,
            };
            controller.editComment(commentReq);
            this.editMode = "";
        },
    },
};
</script>

<template>
    <div
        class="comment-actions"
        :class="editMode"
        v-if="this.localUser == comment.userId"
    >
        <editIcon v-on:click="editComment()" /><deleteIcon
            v-on:click="deleteComment(comment.id)"
        />
    </div>
    <div class="comment-content">
        <div class="comment-header">
            <a :href="/profile/ + comment.userId">
                <h3 class="comment-user">{{ getUserName(comment.userId) }}</h3>
            </a>
            <p class="comment-date">
                {{ formatDate(comment.creationDate) }}
            </p>
        </div>
        <p :class="editMode" class="comment-content">{{ comment.content }}</p>
        <form
            :class="editMode"
            class="edit-field"
            type="submit"
            @submit="(e) => sendEditedComment(e)"
        >
            <textarea
                type="text"
                :value="comment.content"
                name="content"
            ></textarea
            ><button type="submit">
                <send-icon />
            </button>
        </form>
    </div>
</template>
