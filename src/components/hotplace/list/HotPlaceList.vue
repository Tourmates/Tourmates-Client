<template>
    <div>
        <section class="container mb-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <router-link class="btn btn-primary" type="button" :to="`/hotPlaces/register`">글쓰기</router-link>
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
            pageLimit: 10,
        };
    },
    created() {
        this.initComponent();
    },
    watch: {
        '$route.query': function () {
            this.initComponent();
        }
    },
    methods: {
        initComponent() {
            if (isNaN(this.$route.query.pageNumber)) {
                this.$route.query.pageNumber = 10;
            }
            const API_URL = `http://localhost:8080/hotPlaces?pageNumber=${this.$route.query.pageNumber - this.pageLimit}`;
            axios.get(API_URL)
              .then((response) => {
                  this.hotPlaces = response.data.data;
              });
        },

    },
}
</script>