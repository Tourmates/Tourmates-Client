<template>
    <div>
        <div v-if="true">
            <table class="table mt-3">
                <colgroup>
                    <col :style="`{width: 10%}`">
                    <col :style="`{width: 60%}`">
                    <col :style="`{width: 10%}`">
                    <col :style="`{width: 10%}`">
                    <col :style="`{width: 10%}`">
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
                <tbody class="table-group-divider">
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
            </table>
        </div>
        <div v-else>등록된 여행계획이 없습니다.</div>
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
    },
}
</script>