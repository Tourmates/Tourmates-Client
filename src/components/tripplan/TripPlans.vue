<template>
    <div class="container">
        <h1 class="text-center">여행계획</h1>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <div>
                <select class="form-select" v-model="type">
                    <option value="0">제목</option>
                    <option value="1">작성자</option>
                    <option value="2">관광지</option>
                </select>
            </div>
            <div>
                <input type="text" class="form-control" id="keyword" name="keyword" placeholder="검색어" v-model="keyword">
            </div>
            <div>
                <button class="btn btn-primary" type="button">검색</button>
            </div>
        </div>
        <router-view/>
        <trip-plan-paging/>
    </div>
</template>
<script>
import TripPlanPaging from "@/components/tripplan/list/TripPlanPaging.vue";

export default {
    name: "TripPlans",
    components: {TripPlanPaging},
    data() {
        return {
            keyword: "",
            type: 0
        };
    },
    methods: {},
}
</script>