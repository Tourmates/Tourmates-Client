<template>
    <section class='container'>
        <table class="table">
            <tbody class="table-group-divider">
            <tr>
                <td>
                    <div class='pt-3 pb-3'>
                        <div class='mb-3'>{{board.title}}</div>
                        <div class="d-flex justify-content-between">
                            <div>{{board.nickname}} | {{board.createdDate}}</div>
                            <div>조회수 {{board.hit}}</div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class='p-3'>
                        {{board.content}}
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center">
            <router-link class="btn btn-primary me-3" :to="`/boards`">목록</router-link>
            <router-link class="btn btn-secondary me-3" :to="`/boards/${board.boardId}/edit`">수정</router-link>
            <a class="btn btn-danger" @click="remove">삭제</a>
        </div>
        <br />
        <div class="p-3 bg-secondary bg-gradient bg-opacity-10 border border-bg-body border-start-0 rounded-end">
            <div class="input-group">
            <textarea rows = "7" cols = "50" class="form-control" aria-label="With textarea" placeholder="댓글을 입력하세요."></textarea>
            </div>
            <br />
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-primary" type="button">등록</button>
            </div>
        
        </div>
    </section>
</template>

<script>
import axios from "axios";

export default {
    name: 'DetailBoard',
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
        remove() {
            const API_URL = `http://localhost:8080${this.$route.fullPath}/remove`;
            axios.post(API_URL)
              .then(() => {
                  console.log('board remove');
                  this.$router.replace('/boards')
                    .catch(() => {
                    });
              });
        }
    },
    created() {
        this.getBoard();
    }
}
</script>