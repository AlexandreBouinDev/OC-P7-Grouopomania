<script>
import Controller from "../middleware/controller.js";
let controller = new Controller();

export default {
    methods: {
        submitRegister(event) {
            event.preventDefault();
            const data = new FormData(event.target);
            const registerReq = {
                email: data.get("email"),
                password: data.get("password"),
                lastname: data.get("lastname"),
                firstname: data.get("firstname"),
                position: data.get("position"),
            };
            controller.addUser(registerReq);
            alert("Inscription réussie !");
            this.$emit("new-user", registerReq.email);
        },
    },
};
</script>

<template>
    <form class="login-form" @submit="(e) => submitRegister(e)">
        <div class="form-inputs">
            <input type="email" placeholder="E-mail" name="email" required />
            <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                required
            />
            <input type="text" placeholder="Nom" name="lastname" required />
            <input type="text" placeholder="Prénom" name="firstname" required />
            <select name="position">
                <option value="">--Poste--</option>
                <option value="Administrateur">Administrateur</option>
                <option value="Technicien">Technicien</option>
                <option value="Chef d'équipe">Chef d'équipe</option>
                <option value="Développeur">Développeur</option>
                <option value="CTO">CTO</option>
                <option value="CEO">CEO</option>
            </select>
        </div>
        <button type="submit">S'INSCRIRE</button>
    </form>
</template>
