<template>
    <div class="container">
        <div class="mt-5 mb-5 text-center">
            <h3>여행계획</h3>
        </div>
        <hr/>
        <br/>
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