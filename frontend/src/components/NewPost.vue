<script>
import Controller from "../middleware/controller.js";
import postIcon from "vue-material-design-icons/Post.vue";
import addImgIcon from "vue-material-design-icons/ImagePlus.vue";

let controller = new Controller();

export default {
  components: { postIcon, addImgIcon },
  methods: {
    async submitPost(event) {
      event.preventDefault();
      const data = new FormData(event.target);
      const postReq = {
        title: data.get("title"),
        content: data.get("content")
      };
      const img = data.get("file-input");
      await controller.addPost(postReq, img);
      this.$emit("new-post");
      event.target = null;
    }
  }
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
    <div class="newpost-actions">
      <input
        type="file"
        class="uploadPostImage input"
        id="file-input"
        accept="image/*"
        v-on:change="(e) => uploadPostImage(e)"
        name="file-input"
      />
      <label for="file-input" class="uploadPostImage">
        <addImgIcon :size="20" />
        <p>Ajouter une image</p></label
      >
      <button type="submit" class="newpost-submit">Envoyer</button>
    </div>
  </form>
</template>
