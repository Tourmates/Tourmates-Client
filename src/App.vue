<template>
    <div id="app">
        <the-header-nav/>
        <router-view/>
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
    data() {
        return {
            member: null,
        };
    },
    methods: {
        login(member) {
            const API_URL = `http://localhost:8080/login`;

            axios({
                url: API_URL,
                method: "post",
                data: {
                    member
                }
            })
                .then((response) => {
                    let data = response.accessToken;
                    console.log(data);
                })
        }
    },
};

</script>
<style>

</style>