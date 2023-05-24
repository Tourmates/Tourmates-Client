<template>
    <section class='container mt-5'>
        <h4>자유게시판</h4>
        <table class="table mt-3">
            <tbody class="table-group-divider">
            <tr>
                <td>
                    <div class='pt-3 pb-3'>
                        <div class='mb-3'>{{ board.title }}</div>
                        <div class="d-flex justify-content-between">
                            <div>{{ board.nickname }} | {{ board.createdDate }}</div>
                            <div>조회수 {{ board.hit }}</div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class='p-3' v-html="board.content"></div>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center">
            <router-link class="btn btn-primary me-3" :to="`/boards`">목록</router-link>
            <router-link class="btn btn-secondary me-3" :to="`/boards/${board.boardId}/edit`">수정
            </router-link>
            <a class="btn btn-danger" @click="remove">삭제</a>
        </div>
        <br/>
        <div class="p-3 bg-secondary bg-gradient bg-opacity-10 border border-bg-body border-start-0 rounded-end">
            <div class="input-group">
                                <textarea v-model="comment" rows="7" cols="50" class="form-control"
                                          aria-label="With textarea" placeholder="댓글을 입력하세요."></textarea>
            </div>
            <br/>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="button" @click="insertComment">등록</button>
            </div>
        </div>
        <div>
            <ol class="list-group list-group-numbered">
                <ul v-for="comment in comments" :key="comment"
                    class="list-group-item d-flex justify-content-between align-items-start">
                    <br/>
                    <div class="ms-2 me-auto">
                        <span class="fw-bold">{{ comment.nickName }}</span> | {{ comment.createdTime }}
                        <div>
                            {{ comment.content }}
                        </div>
                    </div>
                    <span class="badge bg-primary rounded-pill">14</span>
                </ul>
            </ol>
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
            comment: "",
            comments: [],
        };
    },
    methods: {
        getBoard() {
            let jwtToken = localStorage.getItem("jwt-token");
            const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            console.log("#####");
            console.log(API_URL); ////http://localhost:8080/boards/106
            axios.get(API_URL, {
                    headers: {
                        Authorization: jwtToken,
                    }
                }
            )
                .then((response) => {
                    console.log(response);
                    this.board = response.data.data;
                    console.log(this.board);
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
        },
        insertComment() {
            let jwtToken = localStorage.getItem("jwt-token");
            const API_URL = `http://localhost:8080${this.$route.fullPath}/comments/register`;

            let data = {
                comment: this.comment
            }
            console.log("###Here");

            axios.post(API_URL, data, {
                headers: {
                    Authorization: jwtToken,
                }
            })
                .then(function (response) {
                    console.log(response);
                });
        },
        initComponent() {

            let jwtToken = localStorage.getItem("jwt-token");

            const API_URL = `http://localhost:8080${this.$route.fullPath}/comments/list`;
            axios.post(API_URL, {
                headers: {
                    Authorization: jwtToken,
                }
            })
                .then((response) => {
                    this.comments = response.data;
                })
        }
    },
    created() {
        this.getBoard();
        this.initComponent();
    }
}
</script>