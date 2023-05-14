<template>
    <div>
        <div v-if="true">
            <table class="table mt-3">
                <colgroup>
                    <col :style="{width: '10%'}">
                    <col :style="{width: '70%'}">
                    <col :style="{width: '20%'}">
                </colgroup>
                <thead>
                <tr class="text-center">
                    <th>번호</th>
                    <th>제목</th>
                    <th>등록일</th>
                </tr>
                </thead>
                <tbody class="table-group-divider">
                <notice-list-row
                        v-for="(notice, index) in notices"
                        :key="`${index}_notices`"
                        :no="1"
                        :noticeId="notice.noticeId"
                        :pin="notice.pin"
                        :title="notice.title"
                        :createdDate="notice.createdDate"
                />
                </tbody>
            </table>
        </div>
        <div v-else>등록된 공지사항이 없습니다.</div>
    </div>
</template>
<script>
import NoticeListRow from "@/components/notice/list/NoticeListRow.vue";
import axios from "axios";

export default {
    name: "NoticeList",
    components: {NoticeListRow},
    data() {
        return {
            notices: [],
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
            const API_URL = `http://localhost:8080/notices?pageNumber=${this.$route.query.pageNumber - this.pageLimit}`;
            axios.get(API_URL)
              .then((response) => {
                  this.notices = response.data.data;
              })
        }
    }
}
</script>