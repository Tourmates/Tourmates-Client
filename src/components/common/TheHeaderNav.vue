<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to="/">NavBar</b-navbar-brand>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/attractions">지역별여행지</b-nav-item>
                    <b-nav-item to="/tripPlans">나의여행계획</b-nav-item>
                    <b-nav-item to="/hotPlaces">핫플자랑하기</b-nav-item>
                    <b-nav-item to="/boards">자유게시판</b-nav-item>
                    <b-nav-item to="/login">로그인</b-nav-item>
                    <b-nav-item to="/join">회원가입</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: "TheHeaderNav",
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