<template>
    <div>
        <div v-if="boards.length === 0">등록된 게시물이 없습니다.</div>
        <div v-else>
            <table class="table mt-3">
                <colgroup>
                    <col :style="{width: '10%'}">
                    <col :style="{width: '70%'}">
                    <col :style="{width: '20%'}">
                </colgroup>
                <tbody class="table-group-divider">
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
            boards: [],
            pageLimit: 10,
        }
    },
    created() {
        this.initComponent();
    },
    watch: {
        '$route.query': function () {
            this.initComponent();
        }
    },
    methods: {
        initComponent() {
            if (isNaN(this.$route.query.pageNumber)) {
                this.$route.query.pageNumber = 10;
            }
            const API_URL = `http://localhost:8080/boards?pageNumber=${this.$route.query.pageNumber - this.pageLimit}`;
            axios.get(API_URL)
              .then((response) => {
                  this.boards = response.data.data;
                  this.page = response.data.page;
              })
        }
    }
}
</script>