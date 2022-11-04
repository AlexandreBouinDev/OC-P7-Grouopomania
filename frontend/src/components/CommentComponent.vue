<script>
import editIcon from "vue-material-design-icons/PencilCircleOutline.vue";
import deleteIcon from "vue-material-design-icons/DeleteCircleOutline.vue";
import sendIcon from "vue-material-design-icons/Send.vue";

import Controller from "../middleware/controller.js";
let controller = new Controller();

export default {
    components: { editIcon, deleteIcon, sendIcon },
    data() {
        return {
            path: process.env.VUE_APP_BACKPATH,
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
        editComment() {
            this.editMode = "editMode";
        },
        deleteComment(id) {
            controller.deleteComment(id);
            this.$emit("refresh-comment");
        },
        setAvatarPath(avatar) {
            let src = `${this.path}/images/${avatar ?? "undefined.png"} `;
            return src;
        },
        sendEditedComment(e) {
            e.preventDefault();
            const data = new FormData(e.target);
            const commentReq = {
                content: data.get("content"),
                id: this.comment.id,
            };
            controller.editComment(commentReq);
            this.$emit("refresh-comment");
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
                <img
                    :src="setAvatarPath(getUserData(comment.userId).avatar)"
                    className="comment-avatar"
            /></a>
            <div>
                <a :href="/profile/ + comment.userId">
                    <h3 class="comment-user">
                        {{ getUserData(comment.userId).name }}
                    </h3>
                </a>
                <p class="comment-date">
                    {{ formatDate(comment.creationDate) }}
                </p>
            </div>
        </div>
        <p :class="editMode" class="comment-message">{{ comment.content }}</p>
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
