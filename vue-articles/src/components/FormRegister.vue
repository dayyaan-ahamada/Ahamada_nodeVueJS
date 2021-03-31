<template>
  <div class="container">
    <div class="row">
      <h2 class="left">INSCRIPTION</h2>
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
    <div class="row">
      <form @submit="register" class="col s12">
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
          <div class="input-field col s4">
            <input
              id="password_second"
              v-model="password_second"
              @keyup="checkForm"
              type="password"
              v-bind:class="this.password_class"
            />
            <label for="password_second">Valider le mot de passe</label>
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
  name: "FormRegister",

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
    register() {
      let valide = true;
      this.errors = [];
      if (this.password !== this.password_second) {
        valide = false;
        document.getElementById("errors").style.display = "inline";
        this.password_class = "invalid";
        this.password = "";
        this.password_second = "";
        this.errors.push("Les mots de passes ne sont pas les mêmes");
      }

      if (valide) {
        axios
          .post(this.$store.state.apiUrl + "register", {
            user_mail: this.mail,
            user_password: this.password,
          })
          .then((response) => {
            if (response.status === 200) {
              this.$router.push(
                "/FormConnection/Inscription réussie avec le mail : " +
                  this.mail
              );
            }
          });
      }
    },

    checkForm() {
      if (
        this.mail !== "" &&
        this.password !== "" &&
        this.password_second !== ""
      ) {
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


