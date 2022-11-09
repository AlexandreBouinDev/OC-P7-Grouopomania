<script>
import "../styles/Profile.scss";

import EditProfileForm from "./EditProfileForm.vue";
import editIcon from "vue-material-design-icons/PencilCircleOutline.vue";
import uploadIcon from "vue-material-design-icons/Upload.vue";

import Controller from "@/middleware/controller";
let controller = new Controller();

export default {
  props: {
    userId: Number,
    user: {
      id: Number,
      email: String,
      firstname: String,
      lastname: String,
      avatar: String,
      position: String,
      isAdmin: Number
    }
  },
  components: { EditProfileForm, editIcon, uploadIcon },
  data() {
    return {
      path: process.env.VUE_APP_BACKPATH,
      editMode: ""
    };
  },
  methods: {
    editProfile() {
      this.editMode = "editMode";
    },
    uploadProfilePicture(e) {
      const image = e.target.files[0];
      controller.updateProfilePicture(image, parseInt(this.userId));
      this.updateProfile();
    },
    setAvatarPath(avatar) {
      let src = `${this.path}/images/${avatar ?? "undefined.png"} `;
      return src;
    },
    setEmail(mail) {
      return `mailto:${mail}`;
    },
    updateProfile(e) {
      this.editMode = "";
      this.$emit("profile-edited", e);
    },
    checkUser() {
      return localStorage.getItem("") == this.user.id;
    }
  }
};
</script>

<template>
  <div class="profile-block">
    <form class="profile-image" enctype="multipart/form-data">
      <div class="edit-layer"><upload-icon /></div>
      <label for="file-input" class="input-label">
        <img :src="setAvatarPath(this.user.avatar)" />
      </label>
      <input
        type="file"
        class="uploadProfilePicture"
        id="file-input"
        accept="image/*"
        v-on:change="(e) => uploadProfilePicture(e)"
        name="file-input"
      />
    </form>
    <div class="profile-data">
      <div :class="editMode" class="profile-content">
        <h1>{{ this.user.firstname }} {{ this.user.lastname }}</h1>
        <h2>{{ this.user.position }}</h2>
        <p class="profile-contact">
          <b>Contact : </b>
          <a :href="setEmail(this.user.email)">{{ this.user.email }}</a>
        </p>
      </div>
      <EditProfileForm
        v-bind:user="this.user"
        v-bind:editMode="this.editMode"
        @profile-edited="updateProfile"
      />
      <div
        :class="editMode"
        v-if="checkUser"
        class="profile-button edit switch"
        v-on:click="editProfile()"
      >
        <edit-icon />Éditer mon profil
      </div>
    </div>
  </div>
</template>
