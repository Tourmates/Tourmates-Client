<template>
    <div>
        <div class="row mt-5">
            <div class="col-6">
                <h4>공지사항</h4>
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
                                :to="`notices?pageNumber=${this.$route.query.pageNumber}&type=${type}&keyword=${keyword}`"
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
                <thead>
                <tr class="text-center">
                    <th>번호</th>
                    <th>제목</th>
                    <th>등록일</th>
                </tr>
                </thead>
                <tbody class="table-group-divider" v-if="notices.length > 0">
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
                <tbody v-else>
                <tr class="text-center align-middle" style="height: 300px">
                    <td colspan="3">검색된 결과가 없습니다.</td>
                </tr>
                </tbody>
            </table>
        </div>
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
            keyword: "",
            type: 0,
            notices: [],
        }
    },
    created() {
        this.init();
    },
    watch: {
        '$route.query': function () {
            this.getNotice();
        }
    },
    methods: {
        init() {
            const API_URL = `http://localhost:8080/notices`;
            axios.get(API_URL)
                .then((response) => {
                    this.notices = response.data.data;
                })
                .catch(() => {
                    console.log("Exception");
                });
        },
        getNotice() {
            const API_URL = `http://localhost:8080/notices?pageNumber=${this.$route.query.pageNumber}&type=${this.type}&keyword=${this.keyword}`;
            axios.get(API_URL)
                .then((response) => {
                    this.notices = response.data.data;
                })
                .catch(() => {
                    console.log("Exception");
                });
        },
    }
}
</script>