<template>
    <div>
        <section class='container-fluid'>
            <div class='row'>
                <div class='col-5'>
                    <div class='container p-5 mt-5 mb-5'>
                        <div class="d-flex justify-content-between">
                            <img src='../assets/logo-square.svg' width='10%'>
                            <button type="button" class="btn-close" disabled aria-label="Close"></button>
                        </div>
                        <div class='mt-3'>
                            <h1 class='fw-bold'>Welcome back</h1>
                        </div>

                        <!-- login form -->
                        <div class='mt-5'>
                            <div class="mb-3">
                                <label for="loginId" class="form-label">아이디</label>
                                <input type="text" class="form-control" id="loginId" name="loginId" v-model="loginId"
                                       placeholder="아이디">
                            </div>
                            <div class="mb-3">
                                <label for="loginPw" class="form-label">비밀번호</label>
                                <input type="password" class="form-control" id="loginPw" name="loginPw"
                                       v-model="loginPw"
                                       placeholder="비밀번호">
                            </div>
                            <div class="form-check mt-3">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                       name="saveLoginId">
                                <label class="form-check-label" for="flexCheckDefault">
                                    아이디 저장
                                </label>
                            </div>
                            <div class="d-grid gap-2 mt-3">
                                <button class="btn btn-primary btn-lg" @click="login">LOGIN</button>
                            </div>
                        </div>
                        <hr/>
                        <!-- social login -->
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary btn-lg" type="button">facebook</button>
                            <button class="btn btn-primary btn-lg" type="button">kakao</button>
                        </div>
                        <hr/>
                        <div class='text-center'>
                            회원이 아니신가요? <a href='#'>회원가입</a>
                        </div>
                    </div>
                </div>
                <div class='col-7'>
                    <div class='h-100' style='background-image: url(../assets/join.jpg);'></div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: 'LoginView',
    data() {
        return {
            loginId: "",
            loginPw: "",
        };
    },
    methods: {
        login() {
            let member = {
                loginId: this.loginId,
                loginPw: this.loginPw,
            };

            const API_URL = `http://localhost:8080/login`;
            console.log(member);
            axios({
                url: API_URL,
                method: "post",
                data: member,
            })
                .then((response) => {

                    localStorage.setItem("loginMember", response.data);
                })
            this.$emit("login", member);
        }
    }
}
</script>
