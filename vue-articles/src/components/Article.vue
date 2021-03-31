<template>
  <div class="card-panel left-align">
    <div v-if="this.display_mode === 'detailed'">
      <h3>{{ article_title }}</h3>
      <p>{{ article_body }}</p>
      <p>{{ this.dateToString() }}</p>
      <p>créé par {{ owner_mail }}</p>
      <div
        v-if="
          this.$store.getters.isLoggedIn === true && this.isOwner() === true
        "
      >
        <button class="btn waves-effect waves-light" @click="updateArticle">
          Modifier
        </button>
        <button class="btn waves-effect waves-light" @click="deleteArticle">
          Supprimer
        </button>
      </div>
    </div>
    <div v-else-if="this.display_mode === 'listed'">
      <div class="col s2 row">
        <h3>{{ article_title }}</h3>
      </div>
      <div class="row">
        <p class="col s3 truncate">{{ article_body }}</p>
      </div>
      <div>
        <button class="btn waves-effect waves-light" @click="watchArticle">
          voir l'article
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Article",

  props: {
    article_title: String,
    article_body: String,
    article_date: String,
    owner_id: String,
    owner_mail: String,
    display_mode: String,
  },

  methods: {
    watchArticle() {
      this.$router.push("/Article/" + this.article_title);
    },

    updateArticle() {
      this.$router.push(
        "/FormArticle/update/" + this.article_title + "/" + this.article_body
      );
    },

    deleteArticle() {
      axios
        .delete(
          this.$store.state.apiUrl + "secure/article/" + this.article_title
        )
        .then(this.$router.push("/articles"));
    },

    isOwner() {
      return (
        this.owner_mail === JSON.parse(localStorage.getItem("user")).user_mail
      );
    },

    dateToString() {
      const date = new Date(this.article_date);
      return (
        "publié le " +
        date.toLocaleDateString() +
        " à " +
        date.toLocaleTimeString()
      );
    },
  },
};
</script>

<style scoped>
button {
  font-size: large;
  background-color: tan;
}
button:hover {
  background-color: rgba(210, 180, 140, 0.767);
}
p {
  font-size: x-large;
  color: rgb(119, 90, 90);
}
</style>
