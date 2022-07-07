<script>
import "../styles/Profile.scss";
import editIcon from "vue-material-design-icons/PencilCircleOutline.vue";
import deleteIcon from "vue-material-design-icons/DeleteCircleOutline.vue";
import uploadIcon from "vue-material-design-icons/Upload.vue";

import Controller from "@/middleware/controller";
let controller = new Controller();

export default {
    props: {
        userId: Number,
    },
    data() {
        return {
            user: {},
            editMode: "",
            options: [
                { text: "Administrateur", value: "Administrateur" },
                { text: "Technicien", value: "Technicien" },
                { text: "Chef d'équipe", value: "Chef d'équipe" },
                { text: "Développeur", value: "Développeur" },
                { text: "CTO", value: "CTO" },
                { text: "CEO", value: "CEO" },
            ],
            localUser: localStorage.getItem("userId"),
        };
    },
    components: { editIcon, deleteIcon, uploadIcon },
    async mounted() {
        this.getUserData(this.getUserId());
    },
    computed: {
        items() {
            return this.options.filter((i) => i.text !== this.user.position);
        },
    },
    methods: {
        getUserId() {
            let url = window.location.href.split("/");
            let userId = url.at(-1);
            return userId;
        },
        async getUserData(userId) {
            let data = await controller.getUserData(userId);
            this.user = data[0];
        },
        editProfile() {
            this.editMode = "editMode";
        },
        sendEditedProfile(e) {
            e.preventDefault();
            const data = new FormData(e.target);
            const profileReq = {
                firstname: data.get("firstname"),
                lastname: data.get("lastname"),
                position: data.get("position"),
                email: data.get("email"),
                userId: this.user.id,
            };
            controller.editProfile(profileReq);
            this.editMode = "";
        },
        deleteProfile() {
            let user = { userId: this.user.id };
            controller.deleteProfile(user);
        },
        uploadProfilePicture(e) {
            const image = e.target.files[0];
            controller.updateProfilePicture(image, this.user.id);
        },
    },
};
</script>

<template id="ProfilePage">
    <div class="profile-block">
        <form class="profile-image" enctype="multipart/form-data">
            <div class="edit-layer"><upload-icon /></div>
            <label for="file-input" class="input-label"
                ><img src="../assets/empty.png"
            /></label>
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
            <div class="profile-content" :class="editMode">
                <h1>{{ this.user.firstname }} {{ this.user.lastname }}</h1>
                <h2>{{ this.user.position }}</h2>
                <p>{{ this.user.email }}</p>
            </div>
            <form
                :class="editMode"
                class="edit-form"
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
            <div
                v-if="this.localUser == this.user.id"
                class="profile-button edit switch"
                :class="editMode"
                v-on:click="editProfile()"
            >
                <edit-icon />Éditer mon profil
            </div>
        </div>
    </div>
</template>
