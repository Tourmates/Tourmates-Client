<template>
<div class="bg-body-tertiary">
  <section class="container pt-4 pb-5">
    <div class="mb-5">
      <h1>회원 탈퇴</h1>
      <p>여기에서 회원 탈퇴를 합니다.</p>
    </div>
    <div>
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">회원 탈퇴</h5>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          UPDATE
        </button>
      </div>
      <div class="collapse mt-3" id="collapseExample">
        <form class="card card-body" method="post" @submit.prevent = "withDrawal">
          <div class="mb-3">
            <label for="loginPw" class="form-label">비밀번호 확인</label>
            <input type="password" class="form-control" id="loginPw" name="loginPw" ref = "loginPw" v-model = "loginPw">
          </div>
          <button type="submit" class="btn btn-danger w-25">회원 탈퇴</button>
        </form>
      </div>
    </div>
  </section>
</div>

</template>

<script>
import axios from 'axios';


export default{
    name: "WithDrawal",
    data (){
        return{
            loginPw: '',
        };
    },
    
    methods: {
      withDrawal() {

        var res = confirm("정말로 회원을 탈퇴하시겠습니까?");

        let jwtToken = localStorage.getItem("jwt-token");

        if (res) {
          let data = {
            loginPw: this.loginPw,
          };

          const API_URL = `http://localhost:8080${this.$route.fullPath}`;

          axios.post(API_URL, data, {
            headers: {
              Authorization: jwtToken,
            },
          })
            .then(() => {
              confirm("회원 탈퇴 완료");
            })
            .catch(() => {
              alert("회원 탈퇴 실패");
            })
        }
      }

    }
}

</script>