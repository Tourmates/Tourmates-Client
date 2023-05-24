<template>
    <div class="container">
        <div class="mt-5 mb-5 text-center">
            <h3>핫플자랑하기</h3>
        </div>
        <hr/>
        <br/>
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
                                <img :src="require(`@/assets/upload/${hotPlace.images[0]}`)" class="card-img-top" alt="img"
                                     style="object-fit: cover; height: 250px">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-html="hotPlace.content"></div>
            <span class="badge text-bg-light" v-for="(tag, index) in hotPlace.tags" :key="index">#{{tag}}</span>
        </section>
        <!-- 수정, 삭제 버튼 -->
        <div class="d-flex justify-content-center mt-3" v-if="hotPlace.isMine">
            <router-link :to="`/hotPlaces/${hotPlace.hotPlaceId}/edit`" class="btn btn-outline-primary me-2" type="button">수정</router-link>
            <button class="btn btn-outline-danger ms-2" type="button" @click="remove">삭제</button>
        </div>
        <!-- 댓글 -->
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
import DetailKakaoMap from "@/components/hotplace/DetailKakaoMap.vue";
import axios from "axios";

export default {
    name: "DetailHotPlace",
    components: { DetailKakaoMap },
    data() {
        return {
            hotPlace: "",
            comments: [],
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
            axios.get(API_URL, {
                headers: {
                    Authorization: jwtToken,
                }
            })
                .then((response) => {
                    this.hotPlace = response.data.data;
                    console.log(this.hotPlace);
                })
                .catch(() => {
                });
        },
        remove() {
            let jwtToken = localStorage.getItem("jwt-token");
            const API_URL = `http://localhost:8080${this.$route.fullPath}/remove`;
            axios.post(API_URL, {}, {
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
        },
        initComponent() {

            let jwtToken = localStorage.getItem("jwt-token");

            const API_URL = `http://localhost:8080${this.$route.fullPath}/comments/list`;

            alert(API_URL);
            console.log("API_URL" + API_URL);
            axios.post(API_URL, {
                headers: {
                    Authorization: jwtToken,
                }
            })
                .then((response) => {
                    this.comments = response.data;
                })
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
    }
}
</script>