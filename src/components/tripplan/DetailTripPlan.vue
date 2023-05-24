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
                        <input type="text" v-model="targetId" class="form-control" placeholder="친구 아이디 입력"  aria-describedby="basic-addon2">
                        <button style="height:50px;width:200px" class="btn btn-primary" type="button" @click="share">친구랑 공유하기</button>
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
        <div class="p-3 bg-secondary bg-gradient bg-opacity-10 border border-bg-body border-start-0 rounded-end">
            <div class="input-group">
                                <textarea v-model="comment" rows="7" cols="50" class="form-control"
                                          aria-label="With textarea" placeholder="댓글을 입력하세요."></textarea>
            </div>
            <br/>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary" type="button" @click="insertComment">등록</button>
            </div>
        </div>
        <div>
            <ol class="list-group list-group-numbered">
                <ul v-for="comment in comments" :key="comment"
                    class="list-group-item d-flex justify-content-between align-items-start">
                    <br/>
                    <div class="ms-2 me-auto">
                        <span class="fw-bold">{{ comment.nickName }}</span> | {{ comment.createdTime }}
                        <div>
                            {{ comment.content }}
                        </div>
                    </div>
                    <span class="badge bg-primary rounded-pill">14</span>
                </ul>
            </ol>
        </div>
    </div>
</template>
<script>
import RegisterKakaoMap from "@/components/tripplan/RegisterKakaoMap.vue";

import axios from "axios";
import PlanCard from "@/components/tripplan/PlanCard.vue";

export default {
    name: "DetailTripPlan",
    components: { PlanCard, RegisterKakaoMap },
    data() {
        return {
            targetId: "",
            tripPlanId: "",
            comments: [],
            plans: [],
        };
    },
    created() {
        this.init();
        this.initComponent();
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
                    this.tripPlanId = response.data.data.tripPlanId;
                    this.title = response.data.data.title;
                    this.plans = response.data.data.plans;
                })
                .catch(() => {
                    console.log("exception");
                });
        },
        share() {
            let jwtToken = localStorage.getItem("jwt-token");
            const API_URL = `http://localhost:8080/tripPlans/share`;

            let data = {
                tripPlanId: this.tripPlanId,
                targetId: this.targetId,
            }

            axios.post(API_URL, data, {
                headers: {
                    Authorization: jwtToken,
                }
            })
                .then(() => {
                    this.$router.replace('/tripPlans')
                        .catch(() => {
                        });
                })
                .catch(() => {
                    console.log('exception!!');
                });
        },
        insertComment() {
            let jwtToken = localStorage.getItem("jwt-token");
            const API_URL = `http://localhost:8080${this.$route.fullPath}/comments/register`;

            let data = {
                comment: this.comment
            }

            axios.post(API_URL, data, {
                headers: {
                    Authorization: jwtToken,
                }
            })
                .then(function (response) {
                    console.log(response);
                });
        },
        initComponent() {
            const API_URL = `http://localhost:8080${this.$route.fullPath}/comments/list`;
            axios.post(API_URL)
                .then((response) => {
                    this.comments = response.data;
                })
        }
    },
}
</script>