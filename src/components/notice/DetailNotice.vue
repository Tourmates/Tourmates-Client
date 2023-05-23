<template>
    <div class="container mt-5">
        <h4>공지사항</h4>
        <table class="table mt-3">
            <tbody class="table-group-divider">
            <tr>
                <td>
                    <div class='pt-3 pb-3'>
                        <div class="row">
                            <div class="col-10">
                                <h4 class='mb-3'>{{notice.title}}</h4>
                            </div>
                            <div class="col-2 text-end">
                                {{notice.createdDate}}
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class='p-3' v-html="notice.content"></div>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center">
            <router-link :to="`/notices`" class="btn btn-primary me-3">목록</router-link>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "DetailNotice",
    data() {
        return {
            notice: "",
        };
    },
    methods: {
        getNotice() {
            const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            axios.get(API_URL)
              .then((response) => {
                  console.log(response);
                  this.notice = response.data.data;
              });
        },
    },
    created() {
        this.getNotice();
    }
};
</script>