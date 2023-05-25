<template>
<div class="bg-body-tertiary">
  <section class="container pt-4 pb-5">
    <form>
      <div class="mb-5">
      <div class="input-group mb-3">
      <input type="text" v-model="targetLoginId" class="form-control" placeholder="친구 로그인 아이디를 입력하세요." aria-label="Recipient's username" aria-describedby="basic-addon2">
      <button class="input-group-text" id="basic-addon2" @click="register">친구 등록</button>
      </div>
    </div>
    </form>
  </section>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyFriends",
  data() {
    return {
      targetLoginId: '',
    };
  }, 
  methods: {
    register() {
      let data = {
        targetLoginId: this.targetLoginId,
      }

      const API_URL = `http://localhost:8080/friends/register`;

      let jwtToken = localStorage.getItem("jwt-token");

      axios.post(API_URL, data, {
        headers: {
          Authorization: jwtToken,
        },
      })
        .then(() => {
          console.log("register");
          alert("친구 등록 완료");
        })
        .catch(() => {
          console.log("register fail");
          alert("친구 등록 실패");
        });
    }
  }
}
</script>
<style>

</style>