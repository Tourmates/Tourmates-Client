<template>
    <div class="container">
        <div class="mt-5 mb-5 text-center">
            <h3>문의사항</h3>
        </div>
        <hr/>
        <br/>
        <div>
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
                    <th class='align-middle text-center'>문의유형</th>
                    <td class="align-middle" colspan="3">{{item.type}}</td>
                    <th class='align-middle text-center'>글유형</th>
                    <td class="align-middle" colspan="2">비밀글</td>
                    <th class='align-middle text-center'>작성일</th>
                    <td class="align-middle" colspan="2">{{item.questionCreatedDate}}</td>
                </tr>
                <tr>
                    <th class='align-middle text-center'>제목</th>
                    <td class="align-middle" colspan="9">{{item.title}}</td>
                </tr>
                <tr>
                    <th class='align-middle text-center'>내용</th>
                    <td colspan="9" v-html="item.questionContent"></td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 답변 -->
        <div v-if="item.answerContent != null">
            <table class="table table-bordered">
                <colgroup>
                    <col style="width: 50%;">
                    <col style="width: 50%;">
                </colgroup>
                <tbody>
                <tr>
                    <th class='align-middle text-start'>운영자</th>
                    <td class='align-middle text-end'>2023.01.01</td>
                </tr>
                <tr>
                    <td colspan="2">답글입니다.</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="text-center mt-5 mb-5" v-else>
            <h4>답변 대기중입니다.</h4>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "DetailQna",
    data() {
        return {
            item: "",
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            axios.get(API_URL)
                .then((response) => {
                    this.item = response.data.data;
                })
                .catch(() => {
                });
        },
    },
}
</script>