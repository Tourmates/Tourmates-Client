<template>
    <div class="container">
        <!-- 핫플레이스 내용 -->
        <section>
            <div class="row">
                <div class="col-5" style="padding-right: 0px">
                    <detail-kakao-map
                            :title="hotPlace.title"
                            :latitude="hotPlace.latitude"
                            :longitude="hotPlace.longitude"
                    />
                </div>
                <div class="col-7" style="padding-left: 0px">
                    <table class="table table-bordered" style="height: 400px;">
                        <colgroup>
                            <col style="width: 25%;">
                            <col style="width: 25%;">
                            <col style="width: 25%;">
                            <col style="width: 25%;">
                        </colgroup>
                        <tbody>
                        <tr style="height: 40px">
                            <th class='align-middle text-center'>제목</th>
                            <td colspan="3">{{ hotPlace.title }}</td>
                        </tr>
                        <tr style="height: 40px">
                            <th class='align-middle text-center'>카테고리</th>
                            <td>{{ hotPlace.tag }}</td>
                            <th class='align-middle text-center'>작성자</th>
                            <td>{{ hotPlace.nickname }}</td>
                        </tr>
                        <tr style="height: 40px">
                            <th class='align-middle text-center'>방문일자</th>
                            <td>{{ hotPlace.visitedDate }}</td>
                            <th class='align-middle text-center'>조회수</th>
                            <td>{{ hotPlace.hit }}</td>
                        </tr>
                        <tr>
                            <th class='align-middle text-center'>첨부파일</th>
                            <td colspan="3">
                                <img :src="require(`@/assets/${hotPlace.images[0]}`)" class="card-img-top" alt="img"
                                     style="object-fit: cover; height: 250px">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-html="hotPlace.content"></div>
        </section>
        <!-- 수정, 삭제 버튼 -->
        <div class="d-flex justify-content-center" v-if="hotPlace.isMine">
            <router-link :to="`/hotPlaces/${hotPlace.hotPlaceId}/edit`" class="btn btn-outline-primary me-2" type="button">수정</router-link>
            <button class="btn btn-outline-danger ms-2" type="button" @click="remove">삭제</button>
        </div>
        <!-- 댓글 -->
    </div>
</template>
<script>
import DetailKakaoMap from "@/components/hotplace/DetailKakaoMap.vue";
import axios from "axios";

export default {
    name: "DetailHotPlace",
    components: {DetailKakaoMap},
    data() {
        return {
            hotPlace: "",
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let jwtToken = localStorage.getItem("jwt-token");
            const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            axios.get(API_URL, {
                headers: {
                    Authorization: jwtToken,
                }
            })
                .then((response) => {
                    this.hotPlace = response.data.data;
                })
                .catch(() => {
                });
        },
        remove() {
            let jwtToken = localStorage.getItem("jwt-token");
            const API_URL = `http://localhost:8080${this.$route.fullPath}/remove`;
            axios.post(API_URL, {},{
                headers: {
                    Authorization: jwtToken,
                }
            })
                .then((response) => {
                    console.log(response);
                    this.$router.replace('/hotPlaces');
                })
                .catch(() => {
                });
        }
    },
}
</script>