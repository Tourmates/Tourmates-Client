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

export default {
    name: "App",
    components: {TheHeaderNav, TheFooterNav},
    data() {
        return {
            message: "",
        };
    },
    created() {
    },
    methods: {},
};

</script>
<style>

</style>