<template>
  <div>
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

        };
    },
    methods: {

    },
}
</script>