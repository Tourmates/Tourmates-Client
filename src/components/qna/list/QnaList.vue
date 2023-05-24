<template>
    <div>
        <section class="container mb-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <div>
                    <select class="form-select" v-model="type">
                        <option value="0">제목</option>
                        <option value="1">내용</option>
                    </select>
                </div>
                <div>
                    <input type="text" class="form-control" id="keyword" name="keyword" placeholder="검색어를 입력해 주세요."
                           v-model="keyword">
                </div>
                <div>
                    <router-link
                      :to="`tripPlans?pageNumber=${this.$route.query.pageNumber}&type=${type}&keyword=${keyword}`"
                      class="btn btn-outline-secondary ps-4 pe-4 me-2" type="button" @click="search">검색
                    </router-link>
                    <router-link class="btn btn-outline-primary ps-4 pe-4" type="button" :to="`/qna/register`">글쓰기</router-link>
                </div>
            </div>
        </section>
        <table class="table mt-3">
            <colgroup>
                <col :style="{width: '10%'}">
                <col :style="{width: '10%'}">
                <col :style="{width: '60%'}">
                <col :style="{width: '20%'}">
            </colgroup>
            <thead>
            <tr class="text-center">
                <th>번호</th>
                <th>문의유형</th>
                <th>제목</th>
                <th>등록일</th>
            </tr>
            </thead>
            <tbody class="table-group-divider" v-if="qnas.length > 0">
            <qna-list-row
                    v-for="(qna, index) in qnas"
                    :key="`${index}_notices`"
                    :questionId="qna.questionId"
                    :type="qna.type"
                    :title="qna.title"
                    :anonymous="qna.anonymous"
                    :createdDate="qna.createdDate"
            />
            </tbody>
            <tbody class="table-group-divider" v-else>
            <tr class="text-center align-middle" style="height: 300px">
                <td colspan="5">검색된 결과가 없습니다.</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import QnaListRow from "@/components/qna/list/QnaListRow.vue";
import axios from "axios";

export default {
    name: "QnaList",
    components: {QnaListRow},
    data() {
        return {
            type: 0,
            keyword: "",
            qnas: [],
            pageLimit: 10,
        }
    },
    created() {        this.init();
    },
    watch: {
        '$route.query': function () {
            this.init();
        }
    },
    methods: {
        init() {
            if (isNaN(this.$route.query.pageNumber)) {
                this.$route.query.pageNumber = 10;
            }
            const API_URL = `http://localhost:8080/qna?pageNumber=${this.$route.query.pageNumber - this.pageLimit}`;
            axios.get(API_URL)
                .then((response) => {
                    this.qnas = response.data.data;
                })
        },
        search() {

        },
    }
}
</script>