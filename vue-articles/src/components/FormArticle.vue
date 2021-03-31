<template>
  <div class="container">
    <div class="row">
      <h2 v-if="this.mode === 'new'" class="left">POSTER UN ARTICLE</h2>
      <h2 v-if="this.mode === 'update'" class="left">MODIFIER UN ARTICLE</h2>
    </div>
    <div class="row">
      <form @submit="submit" class="col s12">
        <div class="row">
          <div class="input-field col s4">
            <input
              v-if="this.mode === 'new'"
              id="article_title"
              v-model="title"
              type="text"
              class="validate"
            />
            <input
              v-if="this.mode === 'update'"
              id="article_title"
              v-model="title"
              disabled
              type="text"
              class="validate"
            />
            <label for="article_title">Titre de l'article</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <textarea
              v-if="this.mode === 'new'"
              id="article_body"
              v-model="body"
              class="materialize-textarea"
            ></textarea>
            <textarea
              v-if="this.mode === 'update'"
              id="article_body"
              class="materialize-textarea"
              v-model="body"
            ></textarea>
            <label for="article_body">Description</label>
          </div>
        </div>
        <div class="row">
          <div class="col s2">
            <button
              class="btn waves-effect waves-light"
              type="submit"
              name="action">
              Publier
              <i class="material-icons left-align">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as M from "materialize-css";
import axios from "axios";
export default {
  name: "Form-Article",

  props: {
    mode: String,
    article_title: String,
    article_body: String,
  },

  data() {
    return {
      title: this.article_title,
      body: this.article_body,
    };
  },

  mounted() {
    M.updateTextFields();
  },

  methods: {
    submit() {
      if (this.mode === "new") {
        this.createArticle();
      } else if (this.mode === "update") {
        this.updateArticle();
      }
    },
    createArticle() {
      axios
        .post(this.$store.state.apiUrl + "secure/articles", {
          article_title: this.title,
          article_body: this.body,
          article_date: new Date(),
          article_owner: JSON.parse(localStorage.getItem("user")),
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push("/article/" + this.title);
          }
        });
    },

    updateArticle() {
      axios
        .patch(this.$store.state.apiUrl + "secure/article/" + this.title, {
          article_title: this.title,
          article_body: this.body,
          article_date: new Date(),
          article_owner: JSON.parse(localStorage.getItem("user")),
        })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push("/article/" + this.title);
          }
        });
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 30px;
  font-size: large;
  background-color: tan;
}
</style>


