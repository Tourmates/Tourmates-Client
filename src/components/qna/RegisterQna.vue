<template>
    <div>
        <section class='container'>
            <div class="mt-5 mb-5 text-center">
                <h3>문의사항</h3>
            </div>
            <hr/>
            <br/>
            <div>
                <table class="table table-bordered">
                    <colgroup>
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th class='align-middle text-center'>문의유형</th>
                        <td colspan="4">
                            <select class="form-select" v-model="type">
                                <option value="ATTRACTION">관광지</option>
                                <option value="PLAN">여행계획</option>
                                <option value="HOTPLACE">핫플레이스</option>
                                <option value="BOARD">게시판</option>
                                <option value="ACCOUNT">계정</option>
                                <option value="ETC">기타</option>
                            </select>
                        </td>
                        <th class='align-middle text-center'>비밀번호</th>
                        <td colspan="4">
                            <input type="password" class="form-control" id="password" name='password'
                                   v-model="password"
                                   placeholder="비밀번호를 입력하면 비밀글이 됩니다.">
                        </td>
                    </tr>
                    <tr>
                        <th class='align-middle text-center'>제목</th>
                        <td colspan="9">
                            <div>
                                <input type="text" class="form-control" id="title" name='title'
                                       v-model="title"
                                       placeholder="제목을 입력하세요.">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class='align-middle text-center'>내용</th>
                        <td colspan="9">
                            <vue2-tinymce-editor :height="600" v-model="content"></vue2-tinymce-editor>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-center">
                    <button class="btn btn-outline-secondary me-2" type="button">취소</button>
                    <button class="btn btn-outline-primary ms-2" type="button" @click="register">등록</button>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import {Vue2TinymceEditor} from "vue2-tinymce-editor";
import axios from "axios";

export default {
    name: "RegisterQna",
    components: {
        Vue2TinymceEditor,
    },
    data() {
        return {
            type: "ATTRACTION",
            password: "",
            title: "",
            content: "",
        };
    },
    methods: {
        register() {
            let jwtToken = localStorage.getItem("jwt-token");
            let json = {
                type: this.type,
                password: this.password,
                title: this.title,
                content: this.content,
            };
            const API_URL = `http://localhost:8080/qna/register`;
            axios.post(API_URL,
              json,
              {
                  headers: {
                      Authorization: jwtToken,
                  }
              }
            )
              .then(() => {
                  this.$router.push("/boards");
              });
        },
    },
}
</script>