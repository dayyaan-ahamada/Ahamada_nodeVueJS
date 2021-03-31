<template>
  <div id="app">
    <Header :key="this.$store.state.rerenderKey" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
#app {
  font-family: "Kiwi Maru", Helvetica, Arial, sans-serif;
  font-size: large;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(119, 90, 90);
}
</style>
