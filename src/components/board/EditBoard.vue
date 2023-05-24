<template>
    <section class='container'>
        <div class="mt-5 mb-5 text-center">
            <h3>자유게시판 수정</h3>
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
                        <input type="text" class="form-control" id="title" name='title' v-model="board.title"
                               placeholder="제목을 입력하세요.">
                    </td>
                </tr>
                <tr>
                    <th class='align-middle text-center'>제목</th>
                    <td>
                        <vue2-tinymce-editor :height="600" v-model="board.content"></vue2-tinymce-editor>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                <button class="btn btn-outline-secondary me-2" type="button" @click="cancel">취소</button>
                <button class="btn btn-outline-success ms-2" type="button" @click="editBoard">수정</button>
            </div>
        </div>
    </section>
</template>
<script>
import {Vue2TinymceEditor} from "vue2-tinymce-editor";
import axios from "axios";

export default {
    name: "EditBoard",
    components: {
        Vue2TinymceEditor,
    },
    data() {
        return {
            board: "",
        };
    },
    methods: {
        getBoard() {
            const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            axios.get(API_URL)
                .then((response) => {
                    console.log(response);
                    this.board = response.data.data;
                });
        },
        cancel() {
            this.$router.go(-1);
        },
        editBoard() {
            const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            axios.post(API_URL, this.board)
                .then((response) => {
                    console.log(response);
                    this.$router.push("/boards");
                });
        },
    },
    created() {
        this.getBoard();
    }
}
</script>