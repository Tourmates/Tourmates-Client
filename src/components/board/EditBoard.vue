<template>
    <section class='container'>
        <div>
            <table class="table table-bordered">
                <tbody>
                <tr>
                    <th class='align-middle'>제목</th>
                    <td>
                        <div>
                            <input type="text" class="form-control" id="title" name='title' v-model="board.title"
                                   placeholder="제목을 입력하세요.">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle'>내용</th>
                    <td>
                        <textarea class='form-control' name='content' rows='20' v-model="board.content"></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                <button class="btn btn-outline-secondary me-2" type="button">취소</button>
                <button class="btn btn-outline-primary ms-2" type="button" @click="editBoard">수정</button>
            </div>
        </div>
    </section>
</template>
<script>
import axios from "axios";

export default {
    name: "EditBoard",
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