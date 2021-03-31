<template>
  <header>
    <nav variant="dark" type="dark">
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-if="!this.$store.getters.isLoggedIn">
            <router-link to="/FormConnection">Se connecter</router-link>
          </li>
          <li v-if="!this.$store.getters.isLoggedIn">
            <router-link to="/FormRegister">S'inscrire</router-link>
          </li>

          <li v-if="this.$store.getters.isLoggedIn">
            <p>
              Connecté en tant que
              {{ user.user_mail.substring(0, user.user_mail.indexOf("@")) }}
            </p>
          </li>
          <li v-if="this.$store.getters.isLoggedIn">
            <a @click="logout">Deconnexion</a>
          </li>
        </ul>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li>
            <router-link to="/Articles">Nos articles</router-link>
          </li>
          <li v-if="this.$store.getters.isLoggedIn">
            <router-link to="/FormArticle/new">Poster un article</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",

  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("user_token");
      this.$router.push("/articles");
      location.reload();
    },
  },

  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
};
</script>

<style scoped>
div {
  background-color: rosybrown;
}
a {
  font-size: 25px;
  margin-left: 40px;
  margin-right: 40px;
}
p {
  margin-top: 0;
  font-size: 25px;
}
</style>
