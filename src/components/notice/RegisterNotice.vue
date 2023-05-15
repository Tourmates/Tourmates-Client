<template>
    <section class='container'>
        <table class="table table-bordered">
            <tbody>
            <tr>
                <th class='align-middle'>제목</th>
                <td>
                    <div class="row">
                        <div class="col-10">
                            <input type="text" class="form-control" id="title" name='title'
                                  v-model="title" placeholder="제목을 입력하세요.">
                        </div>
                        <div class="col-2">
                            <input class="form-check-input" type="checkbox" value=""
                                   v-model="pin" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                상단고정
                            </label>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th class='align-middle'>내용</th>
                <td>
                    <textarea class='form-control' name='content' rows='20' v-model="content"></textarea>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center">
            <button class="btn btn-outline-secondary me-2" type="button">취소</button>
            <button class="btn btn-outline-primary ms-2" type="button" @click="register">등록</button>
        </div>
    </section>
</template>
<script>
import axios from "axios";

export default {
    name: "RegisterNotice",
    data() {
        return {
            pin: "",
            title: "",
            content: "",
        };
    },
    methods: {
        register() {
            let jwtToken = localStorage.getItem("jwt-token");
            console.log(this.pin);
            let json = {
                pin: this.pin ? '1' : '0',
                title: this.title,
                content: this.content,
            }
            console.log(json);
            const API_URL = 'http://localhost:8080/notices/register';
            axios.post(API_URL,
                json,
                {
                    headers: {
                        Authorization: jwtToken,
                    }
                }
            )
              .then(() => {
                  this.$router.replace("/notices");
              })
        }
    }
}
</script>