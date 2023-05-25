<template>
    <section class='container'>
        <div class="mt-5 mb-5 text-center">
            <h3>자유게시판 글쓰기</h3>
        </div>
        <hr/>
        <br/>
        <div>
            <table class="table table-bordered">
                <colgroup>
                    <col style="width: 10%;">
                    <col style="width: 90%;">
                </colgroup>
                <tbody>
                <tr>
                    <th class='align-middle text-center'>제목</th>
                    <td>
                        <input type="text" class="form-control" id="title" name='title' v-model="title"
                               placeholder="제목을 입력하세요.">
                    </td>
                </tr>
                <tr>
                    <th class='align-middle text-center'>내용</th>
                    <td>
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
</template>
<script>
import {Vue2TinymceEditor} from "vue2-tinymce-editor";
import axios from "axios";

export default {
    name: 'RegisterBoard',
    components: {
        Vue2TinymceEditor,
    },
    data() {
        return {
            title: "",
            content: "",
        };
    },
    methods: {
        register() {
            let jwtToken = localStorage.getItem("jwt-token");
            let json = {
                title: this.title,
                content: this.content,
            };
            const API_URL = `http://localhost:8080/boards/register`;
            axios.post(API_URL,
                json,
                {
                    headers: {
                        Authorization: jwtToken,
                    }
                }
            )
                .then(() => {
                    this.$router.push("/qna");
                })
        },
    }
}
</script>