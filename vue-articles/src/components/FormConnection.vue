<template>
  <div class="container">
    <div class="row">
      <h2 class="left">CONNEXION</h2>
    </div>
    <div id="errors">
      <ul class="left">
        <li
          v-for="error in errors"
          v-bind:key="error"
          v-bind:errors="this.errors"
          class="red-text text-darken-2"
        >
          <h5>{{ error }}</h5>
        </li>
      </ul>
    </div>
    <div id="messages">
      <h5 class="left green-text text-darken-2">{{ message }}</h5>
    </div>
    <div class="row">
      <form @submit="connection" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input
              id="mail"
              v-model="mail"
              @keyup="checkForm"
              type="email"
              class="validate"
            />
            <label for="mail">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s4">
            <input
              id="password"
              v-model="password"
              @keyup="checkForm"
              type="password"
              v-bind:class="this.password_class"
            />
            <label for="password">Mot de passe</label>
          </div>
        </div>
        <div class="row">
          <div class="col s2">
            <button
              v-bind:class="this.button_class"
              type="submit"
              name="action"
            >
              Valider
              <i class="material-icons left-align">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormConnection",

  props: {
    message: String,
  },

  data() {
    return {
      errors: [],
      mail: "",
      password: "",
      password_second: "",
      password_class: "validate",
      button_class: "btn waves-effect waves-tan btn-large disabled",
    };
  },
  methods: {
    connection() {
      axios
        .post(this.$store.state.apiUrl + "login", {
          user_mail: this.mail,
          user_password: this.password,
        })
        .then((datas) => {
          localStorage.setItem("user", JSON.stringify(datas.data.user[0]));
          localStorage.setItem("user_token", datas.data.token);
          this.$router.push("/articles");
          location.reload();
        })
        .catch(() => {
          this.errors = [];
          this.errors.push(
            "Echec de la connexion : mail ou mot de passe incorrect"
          );
        });
    },

    checkForm() {
      if (this.mail !== "" && this.password !== "") {
        this.button_class = "btn waves-effect waves-tan btn-large";
      } else {
        this.button_class = "btn waves-effect waves-tan btn-large disabled";
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-right: 50px;
  font-size: large;
  background-color: tan;
}
button:hover {
  background-color: rgba(210, 180, 140, 0.767);
}
#errors {
  display: "none";
}
</style>

