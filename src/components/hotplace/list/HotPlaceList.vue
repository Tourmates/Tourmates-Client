<template>
    <div>
        <section class="container mb-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <div class="input-group h-75 w-25">
                    <input type="text" class="form-control" placeholder="제목, 내용" aria-describedby="button-addon2"
                           v-model="keyword" @keyup.enter="search">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="search">검색</button>
                </div>
                <router-link class="btn btn-primary" type="button" :to="`/hotPlaces/register`">글쓰기</router-link>
            </div>
            <div class="mt-3">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="ATTRACTION" value="ATTRACTION" v-model="tags">
                    <label class="form-check-label" for="ATTRACTION">관광지</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="CULTURAL" value="CULTURAL" v-model="tags">
                    <label class="form-check-label" for="CULTURAL">문화시설</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="FESTIVAL" value="FESTIVAL" v-model="tags">
                    <label class="form-check-label" for="FESTIVAL">축제공연행사</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="TRAVEL" value="TRAVEL" v-model="tags">
                    <label class="form-check-label" for="TRAVEL">여행코스</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="LEPORTS" value="LEPORTS" v-model="tags">
                    <label class="form-check-label" for="LEPORTS">레포츠</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="ACCOMMODATION" value="ACCOMMODATION"
                           v-model="tags">
                    <label class="form-check-label" for="ACCOMMODATION">숙박</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="SHOPPING" value="SHOPPING" v-model="tags">
                    <label class="form-check-label" for="SHOPPING">쇼핑</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="RESTAURANT" value="RESTAURANT" v-model="tags">
                    <label class="form-check-label" for="RESTAURANT">음식점</label>
                </div>
            </div>
        </section>
        <section class="bg-body-secondary mt-4 pb-4">
            <div class="container">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <hot-place-list-row
                            v-for="(hotPlace, index) in hotPlaces"
                            :key="`${index}_hotPlaces`"
                            :hotPlaceId="hotPlace.hotPlaceId"
                            :tag="hotPlace.tag"
                            :title="hotPlace.title"
                            :visitedDate="hotPlace.visitedDate"
                            :storeFileName="hotPlace.storeFileName"
                    />
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
            tags: [],
            keyword: "",
            pageLimit: 10,
        };
    },
    created() {
        this.initComponent();
    },
    watch: {
        '$route.query': function () {
            this.initComponent();
        },
        tags: function () {
            this.search();
        },
    },
    methods: {
        initComponent() {
            const API_URL = `http://localhost:8080/hotPlaces`;
            axios.get(API_URL)
                .then((response) => {
                    this.hotPlaces = response.data.data;
                });
        },
        search() {
            let API_URL = `http://localhost:8080/hotPlaces?pageNumber=${this.$route.query.pageNumber - this.pageLimit}&keyword=${this.keyword}`;
            for(let i = 0; i < this.tags.length; i++) {
                API_URL += `&tags=${this.tags[i]}`
            }
            axios.get(API_URL)
                .then((response) => {
                    this.hotPlaces = response.data.data;
                })
                .catch(() => {
                    console.log("e");
                });
        },
    },
}
</script>