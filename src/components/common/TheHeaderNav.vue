<template>
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3">
            <router-link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <img src="../../assets/logo.svg">
            </router-link>

            <ul class="nav">
                <li class="nav-item">
                    <router-link to="/attractions" class="nav-link text-dark">지역별여행지</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/tripPlans" class="nav-link text-dark">나의여행계획</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/hotPlaces" class="nav-link text-dark">핫플자랑하기</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/boards" class="nav-link text-dark">자유게시판</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/join" class="nav-link text-dark">회원가입</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link text-dark">로그인</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/my" class="nav-link text-dark">마이페이지</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/logout" class="nav-link text-dark">로그아웃</router-link>
                </li>
            </ul>
        </header>
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