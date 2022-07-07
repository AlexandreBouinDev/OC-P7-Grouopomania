<script>
import router from "@/router/index.js";
import Controller from "../middleware/controller.js";
let controller = new Controller();

export default {
    data() {
        return {
            error: "",
        };
    },
    props: {
        email: String,
    },
    methods: {
        async submitLogin(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const registerReq = {
                email: data.get("email"),
                password: data.get("password"),
            };
            controller.login(registerReq).then((data) => {
                if (data.token) {
                    router.push("/");
                } else {
                    this.error = "getError";
                }
            });
        },
    },
};
</script>

<template>
    <form class="login-form" @submit="(e) => submitLogin(e)">
        <div class="form-inputs">
            <input
                type="text"
                placeholder="E-mail"
                :value="this.email"
                name="email"
                required
                autocomplete="on"
            />
            <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                required
                autocomplete="on"
            />
        </div>
        <p class="errormsg" :class="error">Email ou mot de passe erroné !</p>
        <button type="submit">VALIDER</button>
    </form>
</template>
