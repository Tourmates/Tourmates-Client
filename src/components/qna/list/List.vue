<template>
  <div>
    <div v-if="true">
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
            <tbody class="table-group-divider">
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
        </table>
    </div>
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
            qnas: [],
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
            const API_URL = `http://localhost:8080/qna?pageNumber=${this.$route.query.pageNumber - this.pageLimit}`;
            axios.get(API_URL)
                .then((response) => {
                    this.qnas = response.data.data;
                })
        }
    }
}
</script>