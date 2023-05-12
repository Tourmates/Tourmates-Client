<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>&copy; 2023 Company, Inc</b-navbar-brand>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/notices">공지사항</b-nav-item>
                    <b-nav-item to="#">이용약관</b-nav-item>
                    <b-nav-item to="#">개인정보처리방침</b-nav-item>
                    <b-nav-item to="#">FAQs</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "TheFooterNav",
    components: {},
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