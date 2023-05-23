<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <register-kakao-map :plans="plans"/>
            </div>
            <div class="col-6">
                <table class="table table-bordered">
                    <colgroup>
                        <col style="width: 20%;">
                        <col style="width: 80%;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th class='align-middle text-center'>제목</th>
                        <td>{{ title }}</td>
                    </tr>
                    <tr>
                        <th colspan="2" class='align-middle text-center'>여행정보</th>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <plan-card
                                v-for="(plan, index) in plans"
                                :key="`${index}_plan`"
                                :title="plan.title"
                                :addr1="plan.addr1"
                                :zipcode="plan.zipcode"
                                :image="plan.image"
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import RegisterKakaoMap from "@/components/tripplan/RegisterKakaoMap.vue";

import axios from "axios";
import PlanCard from "@/components/tripplan/PlanCard.vue";

export default {
    name: "DetailTripPlan",
    components: {PlanCard, RegisterKakaoMap},
    data() {
        return {
            title: "",
            plans: [],
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let jwtToken = localStorage.getItem("jwt-token");
            const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            axios(API_URL, {
                headers: {
                    Authorization: jwtToken,
                }
            })
              .then((response) => {
                  this.title = response.data.data.title;
                  this.plans = response.data.data.plans;
              })
              .catch(() => {
                  console.log("exception");
              });
        },
    },
}
</script>