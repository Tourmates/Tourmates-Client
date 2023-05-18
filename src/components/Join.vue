<template>
    <div class="container join-form">
        <h1 class="text-center mt-5">회원가입</h1>
        <div class="mt-5 text-end">
            <span class="highlight">*</span>필수입력사항
        </div>
        <hr/>
        <div class="m-3">
            <div class="row mb-4">
                <div class="col-3">아이디<span class="highlight">*</span></div>
                <div class="col-6">
                    <input type="text" class="form-control" placeholder="아이디를 입력해주세요" v-model='loginId'
                           @keyup="loginIdCheck" maxlength="20">
                    <div class="error-msg mt-2">{{ errorLoginId }}</div>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-dark w-100" @click="duplicateLoginId">중복확인</button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3">비밀번호<span class="highlight">*</span></div>
                <div class="col-6">
                    <input type="password" class="form-control" placeholder="비밀번호를 입력해주세요" v-model="loginPw"
                           @keyup="loginPwCheck">
                    <div class="error-msg mt-2">{{ errorLoginPw }}</div>
                </div>
                <div class="col-3"></div>
            </div>
            <div class="row mb-4">
                <div class="col-3">비밀번호확인<span class="highlight">*</span></div>
                <div class="col-6">
                    <input type="password" class="form-control" placeholder="비밀번호를 한번 더 입력해주세요" v-model="checkLoginPw"
                           @keyup="checkLoginPwCheck">
                    <div class="error-msg mt-2">{{ errorCheckLoginPw }}</div>
                </div>
                <div class="col-3"></div>
            </div>
            <div class="row mb-4">
                <div class="col-3">이름<span class="highlight">*</span></div>
                <div class="col-6">
                    <input type="text" class="form-control" placeholder="이름을 입력해주세요" v-model="name" @keyup="checkName">
                    <div class="error-msg mt-2">{{ errorName }}</div>
                </div>
                <div class="col-3">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3">이메일<span class="highlight">*</span></div>
                <div class="col-6">
                    <input type="text" class="form-control" placeholder="ex) ssafy@ssafy.com" v-model="email" @keyup="checkEmail">
                    <div class="error-msg mt-2">{{ errorEmail }}</div>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-dark w-100" @click="duplicateEmail">중복확인</button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3">휴대폰<span class="highlight">*</span></div>
                <div class="col-6">
                    <input type="text" class="form-control" placeholder="숫자만 입력해주세요" v-model="tel" @keyup="checkTel">
                    <div class="error-msg mt-2">{{ errorTel }}</div>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-dark w-100">인증번호 받기</button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3">성별<span class="highlight">*</span></div>
                <div class="col-6">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="male" value="MALE" v-model="gender">
                        <label class="form-check-label" for="male">남성</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="female" value="FEMALE" v-model="gender">
                        <label class="form-check-label" for="female">여성</label>
                    </div>
                </div>
                <div class="col-3">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3">생년월일<span class="highlight">*</span></div>
                <div class="col-6">
                    <input type="text" class="form-control" placeholder="YYYY.MM.DD" v-model="birth">
                </div>
                <div class="col-3">
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3">닉네임<span class="highlight">*</span></div>
                <div class="col-6">
                    <input type="text" class="form-control" placeholder="닉네임을 입력해주세요" v-model="nickname">
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-dark w-100" @click="duplicateNickname">중복확인</button>
                </div>
            </div>
        </div>
        <!-- 약관동의 -->
        <hr/>
        <div class="m-3">
            <div class="row mb-4">
                <div class="col-3">이용약관동의<span class="highlight">*</span></div>
                <div class="form-check col-9">
                    <input class="form-check-input" type="checkbox" value="selectAll" name="selectAll" id="selectAll" @click="selectAll">
                    <label class="form-check-label" for="selectAll">
                        전체 동의합니다.
                    </label>
                    <p class="sub-desc text-secondary">선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3"></div>
                <div class="form-check col-6">
                    <input class="form-check-input" name="agree" type="checkbox" value="" id="serviceAgreement" @click="checkSelectAll">
                    <label class="form-check-label" for="serviceAgreement">
                        이용약관 동의 <span class="text-secondary">(필수)</span>
                    </label>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-secondary w-100">약관보기</button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3"></div>
                <div class="form-check col-6">
                    <input class="form-check-input" name="agree" type="checkbox" value="" id="privacy" @click="checkSelectAll">
                    <label class="form-check-label" for="privacy">
                        개인정보 수집*이용 동의 <span class="text-secondary">(필수)</span>
                    </label>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-secondary w-100">약관보기</button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3"></div>
                <div class="form-check col-6">
                    <input class="form-check-input" name="agree" type="checkbox" value="" id="selectPrivacy" @click="checkSelectAll">
                    <label class="form-check-label" for="selectPrivacy">
                        개인정보 수집*이용 동의 <span class="text-secondary">(선택)</span>
                    </label>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-secondary w-100">약관보기</button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3"></div>
                <div class="form-check col-9">
                    <input class="form-check-input" name="agree" type="checkbox" value="" id="advertisement" @click="checkSelectAll">
                    <label class="form-check-label" for="advertisement">
                        광고 <span class="text-secondary">(선택)</span>
                    </label>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3"></div>
                <div class="form-check col-9">
                    <input class="form-check-input" name="agree" type="checkbox" value="" id="age" @click="checkSelectAll">
                    <label class="form-check-label" for="age">
                        본인은 만 14세 이상입니다. <span class="text-secondary">(필수)</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button" @click="join">가입하기</button>
        </div>

    </div>
</template>
<script>
import axios from "axios";
import Message from "@/Message";

export default {
    name: "JoinMember",
    data() {
        return {
            loginId: "",
            loginPw: "",
            checkLoginPw: "",
            name: "",
            email: "",
            tel: "",
            birth: "",
            gender: "",
            nickname: "",

            errorLoginId: "",
            errorLoginPw: "",
            errorCheckLoginPw: "",
            errorName: "",
            errorEmail: "",
            errorTel: "",
        };
    },
    methods: {
        join() {
            let json = {
                loginId: this.loginId,
                loginPw: this.loginPw,
                name: this.name,
                email: this.email,
                tel: this.tel,
                birth: this.birth,
                gender: this.gender,
                nickname: this.nickname,
            }
            console.log(json)
            const API_URL = `http://localhost:8080/join`;

            axios.post(API_URL, json)
                .then(() => {
                    console.log("join");
                })
                .catch(() => {
                    console.log("join exception");
                });
        },
        duplicateLoginId() {
            if (this.loginId.length === 0) {
                alert(Message.PATTERN_LOGIN_ID);
                return;
            }
            let json = {
                loginId: this.loginId,
            };
            const API_URL = `http://localhost:8080/check/loginId`;
            axios.post(API_URL, json)
                .then((response) => {
                    if (response.data) {
                        alert(Message.UNAVAILABLE_LOGIN_ID);
                    } else {
                        alert(Message.AVAILABLE_LOGIN_ID);
                    }
                })
                .catch(() => {
                    console.log("duplicateLoginId exception")
                });
        },
        duplicateEmail() {
            let json = {
                email: this.email,
            }
            const API_URL = `http://localhost:8080/check/email`;
            axios.post(API_URL, json)
                .then((response) => {
                    if (response.data) {
                        alert(Message.UNAVAILABLE_EMAIL);
                    } else {
                        alert(Message.AVAILABLE_EMAIL);
                    }
                })
                .catch(() => {
                    console.log("duplicateEmail exception")
                });
        },
        duplicateNickname() {
            let json = {
                nickname: this.nickname,
            }
            const API_URL = `http://localhost:8080/check/nickname`;
            axios.post(API_URL, json)
                .then((response) => {
                    if (response.data) {
                        alert(Message.UNAVAILABLE_NICKNAME);
                    } else {
                        alert(Message.AVAILABLE_NICKNAME);
                    }
                })
                .catch(() => {
                    console.log("duplicateNickname exception");
                });
        },
        loginIdCheck() {
            let loginId = this.loginId;
            if (loginId.length < 5 || loginId.length > 20) {
                this.errorLoginId = Message.PATTERN_LOGIN_ID;
            } else {
                this.errorLoginId = '';
            }
        },
        loginPwCheck() {
            let loginPw = this.loginPw;
            if (loginPw.length === 0) {
                this.errorLoginPw = Message.PATTERN_LOGIN_PW;
            } else if (loginPw.length < 8 || loginPw.length > 20) {
                this.errorLoginPw = Message.LENGTH_LOGIN_PW;
            } else {
                this.errorLoginPw = '';
            }
        },
        checkLoginPwCheck() {
            let checkLoginPw = this.checkLoginPw;
            let loginPw = this.loginPw;
            if (checkLoginPw.length === 0) {
                this.errorCheckLoginPw = Message.BLANK_CHECK_LOGIN_PW;
            } else if (checkLoginPw === loginPw) {
                this.errorCheckLoginPw = '';
            } else {
                this.errorCheckLoginPw = Message.NOT_EQUAL_CHECK_LOGIN_PW;
            }
        },
        checkName() {
            let name = this.name;
            if (name.length === 0) {
                this.errorName = Message.BLANK_NAME;
            } else {
                this.errorName = '';
            }
        },
        checkEmail() {
            let email = this.email;
            if (email.length === 0) {
                this.errorEmail = Message.BLANK_EMAIL;
            } else {
                this.errorEmail = '';
            }
        },
        checkTel() {
            let tel = this.tel;
            if (tel.length === 0) {
                this.errorTel = Message.BLANK_TEL;
            } else {
                this.errorTel = '';
            }
        },
        selectAll() {
            const checkBoxes = document.getElementsByName('agree');
            const selectAll = document.querySelector('input[name="selectAll"]');
            checkBoxes.forEach((checkBox) => {
                checkBox.checked = selectAll.checked;
            })
        },
        checkSelectAll() {
            const checkBoxes = document.querySelectorAll('input[name="agree"]');
            const checked = document.querySelectorAll('input[name="agree"]:checked');
            const selectAll = document.querySelector('input[name="selectAll"]');
            if (checkBoxes.length === checked.length) {
                selectAll.checked = true;
            } else {
                selectAll.checked = false;
            }
        },
    },
}
</script>
<style scoped>
.join-form {
    width: 700px;
}

.highlight {
    color: red;
}

.error-msg {
    color: red;
    font-size: 80%;
}

.sub-desc {
    font-size: 70%;
}
</style>