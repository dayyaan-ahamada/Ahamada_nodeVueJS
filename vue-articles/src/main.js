import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router/router.js";

Vue.config.productionTip = false;
Vue.use(Vuex);

axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("user_token");
    if (!(token == null)) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

const store = new Vuex.Store({
  state: {
    articles: [],
    apiUrl: "https://ahamadaarticles.herokuapp.com/",
    token: localStorage.getItem("user_token")
  },
  getters: {
    getArticleByTitle: state => title => {
      return state.articles.find(article => article.article_title === title);
    },
    isLoggedIn(state) {
      return state.token != null;
    }
  },
  mutations: {
    updateArticles(state) {
      axios.get(state.apiUrl + "articles").then(response => {
        const articlesData = response.data.articles;
        let articles = [];
        let article;
        for (let id in articlesData) {
          article = articlesData[id];
          articles.push({
            article_date: article.article_date,
            article_body: article.article_body,
            article_title: article.article_title,
            article_owner: {
              user_id: article.article_owner[0].user_id,
              user_mail: article.article_owner[0].user_mail
            }
          });
        }
        state.articles = articles;
      });
    }
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
