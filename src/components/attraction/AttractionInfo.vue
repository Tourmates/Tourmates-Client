<template>
    <div class="list-group-item list-group-item-action py-3 lh-sm" @click="marker">
        <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">{{ title }}</strong>
        </div>
        <div class="col-10 mb-1 small">(우) {{ zipcode }}</div>
        <div class="col-10 mb-1 small">{{ addr1 }}</div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "AttractionInfo",
    props: {
        contentId: {type: Number},
        title: {type: String},
        zipcode: {type: String},
        addr1: {type: String},
        latitude: {type: Number},
        longitude: {type: Number},
    },
    methods: {
        marker() {
            let jwtToken = localStorage.getItem("jwt-token");
            const json = {
                contentId: this.contentId,
            }
            const API_URL = `http://localhost:8080/attractions/readcount`;
            axios.post(API_URL, json, {
                headers: {
                    Authorization: jwtToken,
                },
            })
              .then(() => {
              })
              .catch(() => {
              });
            this.$emit("clickAttraction", this.latitude, this.longitude)
        },
    }
}
</script>