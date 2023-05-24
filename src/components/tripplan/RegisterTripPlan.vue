<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <div class="mb-3">
                    <input type="text" class="form-control" id="keyword" v-model="keyword"
                           @keyup.enter="searchAttractions">
                </div>
                <register-kakao-map :plans="plans" :key="rederKey"/>
            </div>
            <div class="col-6">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-2">
                    <button class="btn btn-primary me-md-2" type="button">최적화</button>
                    <button class="btn btn-primary" type="button" @click="register">등록</button>
                </div>
                <table class="table table-bordered">
                    <colgroup>
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                        <col style="width: 10%;">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th class='align-middle text-center' colspan="2">제목</th>
                        <td colspan="8">
                            <input type="text" class="form-control" id="title" name='title' v-model="title"
                                   placeholder="제목을 입력하세요.">
                        </td>
                    </tr>
                    <tr>
                        <th class='align-middle text-center' colspan="5">여행지 정보</th>
                        <th class='align-middle text-center' colspan="5">나의 여행 계획</th>
                    </tr>
                    <tr>
                        <td class='text-center' colspan="5">
                            <div v-if="attractions.length === 0" class="text-center">
                                여행지를 검색해주세요
                            </div>
                            <draggable
                                    class="list-group"
                                    :list="attractions"
                                    group="attraction"
                            >
                                <div
                                        class="list-group-item"
                                        v-for="element in attractions"
                                        :key="element.title"
                                >
                                    {{ element.title }}
                                </div>
                            </draggable>
                        </td>
                        <td class='text-center' colspan="5">
                            <draggable
                                    class="list-group"
                                    :list="plans"
                                    group="attraction"
                            >
                                <div
                                        class="list-group-item"
                                        v-for="element in plans"
                                        :key="element.title"
                                >
                                    {{ element.title }}
                                </div>
                            </draggable>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from "vuedraggable";
import RegisterKakaoMap from "@/components/tripplan/RegisterKakaoMap.vue";
import axios from "axios";

export default {
    name: "RegisterTripPlan",
    components: {RegisterKakaoMap, draggable},
    data() {
        return {
            rederKey: 0,
            keyword: "",
            title: "",
            attractions: [],
            plans: []
        };
    },
    methods: {
        searchAttractions() {
            const API_URL = `http://localhost:8080/attractions/search/tripPlan?keyword=${this.keyword}`;
            axios.get(API_URL)
                .then((response) => {
                    this.attractions = response.data.data;
                })
                .catch(() => {
                });
        },
        register() {
            let jwtToken = localStorage.getItem("jwt-token");
            const API_URL = `http://localhost:8080/tripPlans/register`;
            let contentIds = [];
            for(let i = 0; i < this.plans.length; i++) {
                contentIds.push(this.plans[i].contentId);
            }
            let json = {
                title: this.title,
                contentIds: contentIds,
            }
            axios.post(API_URL, json, {
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
                  console.log('exception');
              });
        },
    },
    watch: {
        plans: function () {
            this.rederKey += 1;
        },
    },
}
</script>