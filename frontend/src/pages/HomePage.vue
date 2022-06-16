<script>
import NavBar from "../components/NavBar";
import PostsList from "../components/PostsList";
import NewPost from "@/components/NewPost";
export default {
    components: {
        NavBar,
        NewPost,
        PostsList,
    },
};
</script>

<template id="HomePage">
    <NavBar />
    <div class="page-body">
        <NewPost />
        <PostsList />
    </div>
</template>
