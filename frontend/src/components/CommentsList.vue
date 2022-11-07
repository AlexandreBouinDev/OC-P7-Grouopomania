<script>
import Controller from "../middleware/controller.js";

import CommentComponent from "./CommentComponent";
import NewComment from "./NewComment";

let controller = new Controller();

export default {
  components: { CommentComponent, NewComment },
  props: {
    postId: Number
  },
  data() {
    return {
      xComments: [],
      xUsers: [],
      length: 0
    };
  },
  async mounted() {
    this.xComments = await controller.getComments(this.postId);
    this.xUsers = await controller.getUsers();
    this.length = await this.xComments.length;
  },
  methods: {
    getUserName(idUser) {
      let user = this.xUsers.find((user) => user.id === idUser);
      let name = "";
      if (user) {
        name = `${user.firstname} ${user.lastname}`;
        return name;
      }
      return "Anonymous";
    },
    formatDate(sqlDate) {
      let jsDate = sqlDate.slice(0, 10);
      return jsDate;
    },
    async updateList() {
      this.xComments = await controller.getComments(this.postId);
      this.$emit("refresh-post");
    }
  }
};
</script>

<template>
  <div
    v-for="comment in xComments"
    :key="comment.id"
    class="comments"
    id="CommentsList"
  >
    <CommentComponent v-bind:comment="comment" @refresh-comment="updateList" />
  </div>
  <NewComment v-bind:postId="postId" @new-comment="updateList" />
</template>
