<template>
  <div>
    <Article
      v-bind:key="article.article_title"
      v-bind:article_title="article.article_title"
      v-bind:article_body="article.article_body"
      v-bind:article_date="article.article_date"
      v-bind:owner_mail="article.article_owner.user_mail"
      v-bind:display_mode="'detailed'"
    ></Article>
  </div>
</template>
<script>
import Article from "../components/Article";

export default {
  name: "ArticleDetail",
  props: {
    article_title: String,
  },
  components: {
    Article,
  },

  computed: {
    article() {
      this.$store.commit("updateArticles");
      return this.$store.getters.getArticleByTitle(this.article_title);
    },
  },
};
</script>
<style scoped>
div {
  background-color: seashell;
}
a {
  font-size: large;
}
</style>
