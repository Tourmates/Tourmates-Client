<template>
    <section class='container'>
        <table class="table table-bordered">
            <tbody>
            <tr>
                <th class='align-middle'>제목</th>
                <td>
                    <div class="row">
                        <div class="col-10">
                            <input type="text" class="form-control" id="title" name='title'
                                   placeholder="제목을 입력하세요." v-model="notice.title">
                        </div>
                        <div class="col-2">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                   v-model="notice.pin">
                            <label class="form-check-label" for="flexCheckDefault">
                                상단고정
                            </label>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th class='align-middle'>내용</th>
                <td>
                    <textarea class='form-control' name='content' rows='20' v-model="notice.content"></textarea>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center">
            <button class="btn btn-outline-secondary me-2" type="button">취소</button>
            <button class="btn btn-outline-primary ms-2" type="button" @click="editNotice">수정</button>
        </div>
    </section>
</template>
<script>
import axios from "axios";

export default {
    name: "EditNotice",
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
        editNotice() {
            console.log(this.notice);
            const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            axios.post(API_URL, this.notice)
                .then((response) => {
                    console.log(response);
                    this.$router.push('/notices');
                });
        },
    },
    created() {
        this.getNotice();
    },
}
</script>