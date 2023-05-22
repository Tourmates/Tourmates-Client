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
                        <edit-kakao-map
                                :attractionTitle="attractionTitle"
                                :latitude="latitude"
                                :longitude="longitude"
                        />
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
                <button class="btn btn-outline-primary ms-2" type="button" @click="edit">수정</button>
            </div>
        </div>
    </section>
</template>
<script>
import {Vue2TinymceEditor} from "vue2-tinymce-editor";
import axios from "axios";
import EditKakaoMap from "@/components/hotplace/EditKakaoMap.vue";

export default {
    name: "EditHotPlaces",
    components: {EditKakaoMap, Vue2TinymceEditor},
    data() {
        return {
            contentId: "",
            tag: "",
            title: "",
            visitedDate: "",
            content: "",
            attractionTitle: "",
            latitude: "",
            longitude: "",
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
    created() {
        this.init();
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
                    const hotPlace = response.data.data;
                    this.tag = hotPlace.tag;
                    this.visitedDate = hotPlace.visitedDate;
                    this.title = hotPlace.title;
                    this.content = hotPlace.content;
                    this.attractionTitle = hotPlace.attractionTitle;
                    this.latitude = hotPlace.latitude;
                    this.longitude = hotPlace.longitude;
                })
                .catch(() => {
                });
        },
        edit() {
            let jwtToken = localStorage.getItem("jwt-token");

            let frm = new FormData();
            let file = document.getElementById('formFileMultiple');
            frm.append('tag', this.tag);
            frm.append('title', this.title);
            frm.append('visitedDate', this.visitedDate);
            frm.append('content', this.content);
            for (let i = 0; i < file.files.length; i++) {
                frm.append('files', file.files[i]);
            }

            const API_URL = `http://localhost:8080${this.$route.fullPath}`;
            axios.post(API_URL, frm, {
                headers : {
                    Authorization: jwtToken,
                    'Content-Type': 'multipart/form-data',
                }
            })
              .then(() =>  {
                  this.$router.replace('/hotPlaces')
                    .catch(() => {
                    });
              })
        }
    },
}
</script>