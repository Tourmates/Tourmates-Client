<template>
    <div>
        <section class="container mb-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <div>
                    <select class="form-select" v-model="type">
                        <option value="0">제목</option>
                        <option value="1">내용</option>
                        <option value="2">해시태그</option>
                    </select>
                </div>
                <div>
                    <input type="text" class="form-control" id="keyword" name="keyword" placeholder="검색어를 입력해 주세요."
                           v-model="keyword" @keyup.enter="search">
                </div>
                <div>
                    <router-link
                            :to="`boards?pageNumber=${this.$route.query.pageNumber}&type=${type}&keyword=${keyword}`"
                            class="btn btn-outline-secondary ps-4 pe-4 me-2" type="button" @click="search">검색
                    </router-link>
                    <router-link class="btn btn-outline-primary ps-4 pe-4" type="button" :to="`/hotPlaces/register`">글쓰기</router-link>
                </div>
            </div>
        </section>
        <section class="bg-body-secondary mt-4 pb-4">
            <div class="container">
                <div class="row row-cols-1 row-cols-md-3 g-4" v-if="hotPlaces.length > 0">
                    <hot-place-list-row
                            v-for="(hotPlace, index) in hotPlaces"
                            :key="`${index}_hotPlaces`"
                            :hotPlaceId="hotPlace.hotPlaceId"
                            :tags="hotPlace.tags"
                            :title="hotPlace.title"
                            :visitedDate="hotPlace.visitedDate"
                            :storeFileName="hotPlace.storeFileName"
                    />
                </div>
                <div style="height: 500px;" v-else>
                    <h4 class="text-center">
                        검색된 결과가 없습니다.
                    </h4>
                </div>
            </div>

        </section>
    </div>
</template>
<script>
import HotPlaceListRow from "@/components/hotplace/list/HotPlaceListRow.vue";
import axios from "axios";

export default {
    name: "HotPlaceList",
    components: {HotPlaceListRow},
    data() {
        return {
            hotPlaces: [],
            type: 0,
            keyword: "",
        };
    },
    created() {
        this.init();
    },
    watch: {
        '$route.query': function () {
            this.search();
        },
    },
    methods: {
        init() {
            const API_URL = `http://localhost:8080/hotPlaces`;
            axios.get(API_URL)
                .then((response) => {
                    this.hotPlaces = response.data.data;
                });
        },
        search() {
            let API_URL = `http://localhost:8080/hotPlaces?pageNumber=${this.$route.query.pageNumber}&type=${this.type}&keyword=${this.keyword}`;
            axios.get(API_URL)
                .then((response) => {
                    this.hotPlaces = response.data.data;
                })
                .catch(() => {
                    console.log("Exception");
                });
        },
    },
}
</script>