<script>
import Controller from "../middleware/controller.js";
import postIcon from "vue-material-design-icons/Post.vue";

let controller = new Controller();

export default {
    components: { postIcon },
    methods: {
        submitPost(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const postReq = {
                title: data.get("title"),
                content: data.get("content"),
            };
            controller.addPost(postReq);
        },
    },
};
</script>

<template>
    <form @submit="(e) => submitPost(e)" class="newpost">
        <span>
            <postIcon :size="20" />
            <h3>Écrire un nouveau post</h3>
        </span>
        <input
            type="text"
            placeholder="Titre"
            name="title"
            class="newpost-input title"
        />
        <textarea
            type="textarea"
            placeholder="Message..."
            name="content"
            class="newpost-input message"
        ></textarea>
        <button type="submit" class="newpost-submit">Envoyer</button>
    </form>
</template>
