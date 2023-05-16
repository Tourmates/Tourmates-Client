<template>
    <div class="container w-50 border">
        <h1 class="text-center">회원가입</h1>
        <hr/>
        <div class="p-5 m-5">
            <div class="row mb-4">
                <div class="col-2">아이디</div>
                <div class="col-7">
                    <input type="text" class="form-control" placeholder="아이디를 입력해주세요" aria-label="First name">
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-dark w-100" @click="duplicateLoginId">중복확인</button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-2">비밀번호</div>
                <div class="col-7">
                    <input type="password" class="form-control" placeholder="비밀번호를 입력해주세요" aria-label="First name">
                </div>
                <div class="col-3">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-2">비밀번호확인</div>
                <div class="col-7">
                    <input type="password" class="form-control" placeholder="비밀번호를 한번 더 입력해주세요" aria-label="First name">
                </div>
                <div class="col-3">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-2">이름</div>
                <div class="col-7">
                    <input type="text" class="form-control" placeholder="이름을 입력해주세요" aria-label="First name">
                </div>
                <div class="col-3">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-2">이메일</div>
                <div class="col-7">
                    <input type="text" class="form-control" placeholder="" aria-label="First name">
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-dark w-100">중복확인</button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-2">휴대폰</div>
                <div class="col-7">
                    <input type="text" class="form-control" placeholder="숫자만 입력해주세요" aria-label="First name">
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-dark w-100">인증번호 받기</button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-2">성별</div>
                <div class="col-7">
                    <input type="text" class="form-control" placeholder="숫자만 입력해주세요" aria-label="First name">
                </div>
                <div class="col-3">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-2">생년월일</div>
                <div class="col-7">
                    <input type="text" class="form-control" placeholder="숫자만 입력해주세요" aria-label="First name">
                </div>
                <div class="col-3">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-2">닉네임</div>
                <div class="col-7">
                    <input type="text" class="form-control" placeholder="숫자만 입력해주세요" aria-label="First name">
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-dark w-100">중복확인</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "JoinMember",
    data() {
        return {
            loginId: "",
            loginPw: "",
            name: "",
            email: "",
            tel: "",
            birth: "",
            gender: "",
            nickname: "",
        };
    },
    methods: {
        join() {

        },
        duplicateLoginId() {
            let json = {
                loginId: this.loginId,
            }
            const API_URL = `http://localhost:8080/check/loginId`;
            axios.post(API_URL, json)
              .then(() => {
                  console.log("duplicateLoginId");
              });
        },
        duplicateEmail() {

        },
        duplicateNickname() {

        },
    },
}
</script>