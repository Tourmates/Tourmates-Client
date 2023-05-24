<template>
    <div>
        <div class="row mt-5">
            <div class="col-6">
                <h4>자유게시판</h4>
            </div>
            <div class="col-6">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <div>
                        <select class="form-select" v-model="type">
                            <option value="0">제목</option>
                            <option value="1">내용</option>
                            <option value="2">제목+내용</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="keyword" name="keyword" placeholder="검색어를 입력해 주세요."
                               v-model="keyword">
                    </div>
                    <div>
                        <router-link
                          :to="`boards?pageNumber=${this.$route.query.pageNumber}&type=${type}&keyword=${keyword}`"
                          class="btn btn-outline-secondary ps-4 pe-4" type="button" @click="init">검색
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <table class="table mt-3">
                <colgroup>
                    <col :style="{width: '10%'}">
                    <col :style="{width: '70%'}">
                    <col :style="{width: '20%'}">
                </colgroup>
                <tbody class="table-group-divider" v-if="boards.length > 0">
                <board-list-row
                  v-for="(board, index) in boards"
                  :key="`${index}_boards`"
                  :boardId="board.boardId"
                  :title="board.title"
                  :nickname="board.nickname"
                  :createdDate="board.createdDate"
                  :hit="board.hit"
                />
                </tbody>
                <tbody class="table-group-divider" v-else>
                <tr class="text-center align-middle" style="height: 300px">
                    <td colspan="3">검색된 결과가 없습니다.</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import BoardListRow from "@/components/board/list/BoardListRow.vue";
import axios from "axios";

export default {
    name: "BoardList",
    components: {BoardListRow},
    data() {
        return {
            keyword: "",
            type: 0,
            boards: [],
        }
    },
    created() {
        this.init();
    },
    watch: {
        '$route.query': function () {
            this.getBoards();
        }
    },
    methods: {
        init() {
            const API_URL = `http://localhost:8080/boards`;
            axios.get(API_URL)
              .then((response) => {
                  this.boards = response.data.data;
              })
              .catch(() => {
                  console.log("Exception");
              });
        },
        getBoards() {
            const API_URL = `http://localhost:8080/boards?pageNumber=${this.$route.query.pageNumber}&type=${this.type}&keyword=${this.keyword}`;
            axios.get(API_URL)
              .then((response) => {
                  this.boards = response.data.data;
              })
              .catch(() => {
                  console.log("Exception");
              });
        },
    }
}
</script>