<template>
    <div id="app">
        <the-header-nav @logout="logout"/>
        <router-view @login="login"/>
        <the-footer-nav/>
    </div>
</template>

<script>
import TheHeaderNav from "./components/common/TheHeaderNav.vue";
import TheFooterNav from "./components/common/TheFooterNav.vue";
import axios from "axios";

export default {
    name: "App",
    components: {TheHeaderNav, TheFooterNav},
    methods: {
        login(member) {
            const API_URL = `http://localhost:8080/login`;

            axios.post(API_URL, member)
              .then((response) => {
                  if (response.data) {
                      console.log("login")
                      const jwtToken = response.data.grantType + " " + response.data.accessToken;
                      localStorage.setItem('jwt-token', jwtToken);
                      this.$router.push('/');
                  }
              });
        },
        logout() {
            console.log("logout");
            localStorage.removeItem('jwt-token');
            this.$router.replace('/')
              .catch(() => {});
        },
    },
};

</script>
<style>

</style>