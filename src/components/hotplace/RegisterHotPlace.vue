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
                    <th class='align-middle text-center'>지도</th>
                    <td>
                        <KakaoMap @setContentId="setContentId"/>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle text-center'>제목</th>
                    <td>
                        <div>
                            <input type="text" class="form-control" id="title" name='title' v-model="title"
                                   placeholder="제목을 입력하세요.">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle text-center'>방문일자</th>
                    <td>
                        <div>
                            <input type="date" class="form-control w-50" id="title" name='title' v-model="visitedDate">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle text-center'>내용</th>
                    <td>
                        <vue2-tinymce-editor :height="600" v-model="content"></vue2-tinymce-editor>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle text-center'>첨부파일</th>
                    <td>
                        <div>
                            <input class="form-control" type="file" id="formFileMultiple" multiple>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th class='align-middle text-center'>해시태그</th>
                    <td>
                        <tagify :tags="tags" placeholder="#해시태그"/>
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
import {Tagify} from "tagify-vue/src/app";

export default {
    name: "RegisterHotPlace",
    components: {
        KakaoMap,
        Vue2TinymceEditor,
        Tagify,
    },
    data() {
        return {
            contentId: "",
            tags: [],
            title: "",
            visitedDate: "",
            content: "",
        };
    },
    methods: {
        register() {
            let jwtToken = localStorage.getItem("jwt-token");

            let frm = new FormData();
            let file = document.getElementById('formFileMultiple');
            frm.append('contentId', this.contentId);
            frm.append('tags', this.tags);
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
                    this.$router.replace('/hotPlaces')
                      .catch(() => {
                      });
                })
                .catch(() => {
                });
        },
        setContentId(contentId) {
            this.contentId = contentId;
        }
    },
}
</script>