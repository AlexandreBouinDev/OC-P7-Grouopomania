<script>
import NavBar from "../components/NavBar.vue";
import PostsList from "../components/PostsList";
export default {
    components: {
        NavBar,
        PostsList,
    },
    data() {
        return {
            shouldUpdate: false,
        };
    },
    methods: {
        updateList() {
            console.log("shouldUpdate à true");
            this.shouldUpdate = true;
        },
    },
};
</script>
<template id="HomePage">
    <NavBar />
    <div class="page-body">
        <PostsList />
    </div>
</template>
