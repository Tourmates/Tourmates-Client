<template>
    <section class='container'>
        <div>
            <table class="table table-bordered">
                <colgroup>
                    <col style="width: 10%;">
                    <col style="width: 90%;">
                </colgroup>
                <tbody>
                <tr>
                    <th class='align-middle'>지도</th>
                    <td>
                        <KakaoMap/>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle'>카테고리</th>
                    <td>
                        <select class="form-select w-50" aria-label="Default select example" name="tag"
                                v-model="tag">
                            <option
                                    v-for="(item, index) in selectList"
                                    :key="index"
                                    :value="item.value"
                            >{{ item.name }}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle'>제목</th>
                    <td>
                        <div>
                            <input type="text" class="form-control" id="title" name='title' v-model="title"
                                   placeholder="제목을 입력하세요.">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle'>방문일자</th>
                    <td>
                        <div>
                            <input type="date" class="form-control w-50" id="title" name='title' v-model="visitedDate">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle'>내용</th>
                    <td>
                        <vue2-tinymce-editor :height="600" v-model="content"></vue2-tinymce-editor>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle'>첨부파일</th>
                    <td>
                        <div>
                            <input class="form-control" type="file" id="formFileMultiple" multiple>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                <button class="btn btn-outline-secondary me-2" type="button">취소</button>
                <button class="btn btn-outline-primary ms-2" type="button" @click="register">등록</button>
            </div>
        </div>
    </section>
</template>
<script>
import {Vue2TinymceEditor} from "vue2-tinymce-editor";
import axios from "axios";
import KakaoMap from "@/components/hotplace/KakaoMap.vue";

export default {
    name: "RegisterHotPlace",
    components: {
        KakaoMap,
        Vue2TinymceEditor,
    },
    data() {
        return {
            contentId: "125405",
            tag: "",
            title: "",
            visitedDate: "",
            content: "",
            selectList: [
                {name: '관광지', value: 'ATTRACTION'},
                {name: '문화시설', value: 'CULTURAL'},
                {name: '축제공연행사', value: 'FESTIVAL'},
                {name: '여행코스', value: 'TRAVEL'},
                {name: '레포츠', value: 'LEPORTS'},
                {name: '숙박', value: 'ACCOMMODATION'},
                {name: '쇼핑', value: 'SHOPPING'},
                {name: '음식점', value: 'RESTAURANT'},
            ],
        };
    },
    methods: {
        register() {
            let jwtToken = localStorage.getItem("jwt-token");

            let frm = new FormData();
            let file = document.getElementById('formFileMultiple');
            frm.append('contentId', this.contentId);
            frm.append('tag', this.tag);
            frm.append('title', this.title);
            frm.append('visitedDate', this.visitedDate);
            frm.append('content', this.content);
            for (let i = 0; i < file.files.length; i++) {
                frm.append('files', file.files[i]);
            }
            const API_URL = 'http://localhost:8080/hotPlaces/register';
            axios.post(API_URL, frm, {
                headers: {
                    Authorization: jwtToken,
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(() => {
                    console.log('file success');
                })
                .catch(() => {
                    console.log('file upload exception');
                });
        }
    },
}
</script>