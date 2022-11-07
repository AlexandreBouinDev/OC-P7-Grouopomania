<script>
import router from "@/router/index.js";
import Controller from "@/middleware/controller";
let controller = new Controller();

import deleteIcon from "vue-material-design-icons/DeleteCircleOutline.vue";

export default {
  components: { deleteIcon },
  props: { user: Object, editMode: String },
  data() {
    return {
      options: [
        { text: "Administrateur", value: "Administrateur" },
        { text: "Technicien", value: "Technicien" },
        { text: "Chef d'équipe", value: "Chef d'équipe" },
        { text: "Développeur", value: "Développeur" },
        { text: "CTO", value: "CTO" },
        { text: "CEO", value: "CEO" }
      ]
    };
  },
  computed: {
    items() {
      return this.options.filter((i) => i.text !== this.user.position);
    }
  },
  methods: {
    sendEditedProfile(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      const profileReq = {
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        position: data.get("position"),
        email: data.get("email"),
        userId: this.user.id
      };
      controller.editProfile(profileReq);
      this.$emit("profile-edited", data);
    },
    deleteProfile() {
      let user = { userId: this.user.id };
      controller.deleteProfile(user);
      router.push("/login");
    }
  }
};
</script>

<template>
  <form
    class="edit-form"
    :class="this.editMode"
    @submit="(e) => sendEditedProfile(e)"
  >
    <div class="form-names">
      <input
        type="text"
        :value="this.user.firstname"
        name="firstname"
        placeholder="Prénom"
      />
      <input
        type="text"
        :value="this.user.lastname"
        name="lastname"
        placeholder="Nom"
      />
    </div>
    <select
      class="select"
      name="position"
      :value="this.user.position"
      label="position"
    >
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <input
      type="email"
      :value="this.user.email"
      name="email"
      required
      placeholder="E-mail"
    />
    <div class="profile-actions">
      <div
        class="profile-button delete"
        :class="editMode"
        v-on:click="deleteProfile()"
      >
        <delete-icon /> Supprimer mon compte
      </div>
      <button type="submit" class="profile-button edit confirm">
        <edit-icon />Valider les modifications
      </button>
    </div>
  </form>
</template>
