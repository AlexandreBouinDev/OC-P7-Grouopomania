<script>
import "../styles/Login.scss";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default {
    components: {
        LoginForm,
        RegisterForm,
    },
    data() {
        return { registerMode: "", email: "" };
    },
    methods: {
        handleMode(mode, mail) {
            if (mode === true) {
                this.registerMode = "registerMode";
            } else {
                this.registerMode = "";
                this.email = mail;
            }
        },
    },
};
</script>

<template id="LoginPage">
    <div class="login-body">
        <div class="login-title">
            <img src="../assets/icon-left-font-monochrome-white.png" />
            <h1>Toujours plus proche de vous.</h1>
        </div>
        <div class="login-block">
            <div class="login-switch">
                <button
                    :class="registerMode"
                    class="loginB"
                    v-on:click="handleMode(false)"
                >
                    CONNEXION</button
                ><button
                    :class="registerMode"
                    class="signinB"
                    v-on:click="handleMode(true)"
                >
                    INSCRIPTION
                </button>
            </div>
            <LoginForm
                class="loginF"
                :class="registerMode"
                v-bind:email="this.email"
            />
            <RegisterForm
                class="registerF"
                :class="registerMode"
                @new-user="handleMode(false, $event)"
            />
        </div>
        <div class="login-footer"><h5>© Alexandre Bouin - 2022</h5></div>
    </div>
</template>
