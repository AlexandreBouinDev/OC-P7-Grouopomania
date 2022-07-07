<script>
import sendIcon from "vue-material-design-icons/Send.vue";

import Controller from "../middleware/controller.js";
let controller = new Controller();

export default {
    components: { sendIcon },
    emits: ["newComment"],
    props: {
        postId: Number,
    },
    methods: {
        async submitComment(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const commentReq = {
                content: data.get("content"),
                postId: this.postId,
            };
            await controller.addComment(commentReq);
            this.$emit("new-comment");
            this.$forceUpdate();
            event.target.content.value = "";
        },
    },
};
</script>

<template>
    <form @submit="(e) => submitComment(e)" class="newcomment">
        <textarea
            type="textarea"
            placeholder="Ajouter un commentaire..."
            name="content"
            class="newcomment-input message"
        ></textarea>
        <button type="submit" class="newcomment-submit">
            <sendIcon :size="15" />
        </button>
    </form>
</template>
