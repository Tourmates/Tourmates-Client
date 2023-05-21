<template>
    <div class="bg-body-tertiary">
  <section class="container pt-4 pb-5">
    <div class="mb-5">
      <h1>비밀번호 변경</h1>
      <p>여기에서 비밀번호를 관리합니다.</p>
    </div>
    <div>
      <div class="d-flex justify-content-between">
        <h5 class="fw-bold">Password</h5>
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          UPDATE
        </button>
      </div>
      <div class="collapse mt-3" id="collapseExample">
        <form class="card card-body" @submit.prevent = "editLoginPw">
            <div class="mb-3">
            <label for="currentLoginPw" class="form-label">현재 비밀번호</label>
            <input type="password" class="form-control" ref = "currentLoginPw" id="currentLoginPw" name="currentLoginPw" v-model = "currentLoginPw">
          </div>

            <div class="row mb-3">
            <div class="col-md-6">
                <label for="newLoginPw" class="form-label">새로운 비밀번호</label>
                <input type="password" class="form-control" ref = "newLoginPw" id="newLoginPw" name="newLoginPw" v-model = "newLoginPw">
            </div>
            <div class="col-md-6">
              <label for="checkedNewLoginPw" class="form-label">비밀번호 확인</label>
              <input type="password" class="form-control" ref = "checkedNewLoginPw" id="checkedNewLoginPw" name="checkedNewLoginPw" v-model = "checkedNewLoginPw">
            </div>
          </div>
          <div>
            <button type="submit" class="btn btn-outline-primary w-25">변경</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';


export default{
    name: "EditLoginPw",
    data (){
        return{
            currentLoginPw: '',
            newLoginPw: '',
            checkedNewLoginPw: '',
        };
    },
    methods: {
        editLoginPw(){  
            
            console.log("hiHI");

            if(this.currentLoginPw === ''){
                alert("현재 비밀번호를 입력하세요");
                this.$refs.currentLoginPw.focus();
                return;
            }
            if(this.newLoginPw === ''){
                alert("새로운 비밀번호를 입력하세요");
                this.$refs.newLoginPw.focus();
                return;
            }
            if(this.checkedNewLoginPw === ''){
                alert("비밀번호 확인을 입력하세요");
                this.$refs.checkedNewLoginPw.focus();
                return;
            }

            if(this.newLoginPw === this.checkedNewLoginPw){
                confirm("새로운 비밀번호와 비밀번호 확인 값에 일치합니다.");
            }
            else{
                alert("비밀번호와 새로운 비밀번호 값이 일치하지 않습니다.");
                return;
            }

            // const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            const API_URL = `http://localhost:8080/my/loginPw`;

            let data = {
                currentLoginPw: this.currentLoginPw,
                newLoginPw: this.newLoginPw,
                checkedNewLoginPw: this.checkedNewLoginPw
            };

            axios.post(API_URL, data)
                .then(() => {
                    confirm("비밀번호 변경 완료");                
                })
                .catch(() => {
                    alert("비밀번호 변경 실패");
                });
        }
    }
}

</script>