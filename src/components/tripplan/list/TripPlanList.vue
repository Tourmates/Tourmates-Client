<template>
    <div>
        <section class="container mb-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <div>
                    <select class="form-select" v-model="type">
                        <option value="0">제목</option>
                        <option value="1">내용</option>
                        <option value="2">해시태그</option>
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
                    <router-link class="btn btn-outline-primary ps-4 pe-4" type="button" :to="`/tripPlans/register`">글쓰기</router-link>
                </div>
            </div>
        </section>
        <div>
            <table class="table mt-3">
                <colgroup>
                    <col :style="{width: '10%'}">
                    <col :style="{width: '60%'}">
                    <col :style="{width: '10%'}">
                    <col :style="{width: '10%'}">
                    <col :style="{width: '10%'}">
                </colgroup>
                <thead>
                <tr class="text-center">
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>조회수</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody class="table-group-divider" v-if="plans.length > 0">
                <trip-plan-list-row
                        v-for="(plan, index) in plans"
                        :key="`${index}_plans`"
                        :tripPlanId="plan.tripPlanId"
                        :title="plan.title"
                        :nickname="plan.nickname"
                        :hit="plan.hit"
                        :createdDate="plan.createdDate"
                />
                </tbody>
                <tbody class="table-group-divider" v-else>
                <tr class="text-center align-middle" style="height: 300px">
                    <td colspan="5">검색된 결과가 없습니다.</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import TripPlanListRow from "@/components/tripplan/list/TripPlanListRow.vue";
import axios from "axios";

export default {
    name: "TripPlanList",
    components: {TripPlanListRow},
    data() {
        return {
            plans: [],
            type: 0,
            keyword: "",
            pageLimit: 10,
        };
    },
    created() {
        this.init();
    },
    watch: {
        '$route.query': function () {
            this.init();
        }
    },
    methods: {
        init() {
            const API_URL = `http://localhost:8080/tripPlans`;
            axios.get(API_URL)
                .then((response) => {
                    this.plans = response.data.data;
                })
                .catch(() => {
                });
        },
        search() {
            console.log("search");
        },
    },
}
</script>