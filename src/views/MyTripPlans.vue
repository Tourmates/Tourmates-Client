<template>
        <div class="container">
                <div class="mt-5 mb-5 text-center">
                        <h3>나의 여행계획</h3>
                </div>
                <hr/>
                <br/>
                <router-view/>
                <my-trip-plan-paging/>
        </div>
</template>
<script>
import MyTripPlanPaging from "@/components/member/TripPlan/list/MyTripPlanPaging.vue";

export default {
    name: "MyTripPlans",
    components: {MyTripPlanPaging},
    data() {
        return {
            keyword: "",
            type: 0
        };
    },
    methods: {},
}
</script>