<template>
    <div class="container">
        <div class="mb-3">
            <!-- keyword -->
            <div>
                <input type="text" class="form-control" id="keyword" v-model="keyword">
            </div>
            <div class="row">
                <!-- sido -->
                <div class="col">
                    <select class="form-select" v-model="sidoCode">
                        <option
                                v-for="(sido, index) in sidoList"
                                :key="index"
                                :value="sido.sidoCode"
                        >{{ sido.name }}
                        </option>
                    </select>
                </div>
                <!-- gugun -->
                <div class="col">
                    <select class="form-select" v-model="gugunCode">
                        <option
                          v-for="(gugun, index) in gugunList"
                          :key="index"
                          :value="gugun.gugunCode"
                        >{{ gugun.name }}</option>
                    </select>
                </div>
            </div>
            <!-- contentType -->
            <!--            <div>-->
            <!--                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">-->
            <!--                <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label>-->
            <!--                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">-->
            <!--                <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label>-->
            <!--                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">-->
            <!--                <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label>-->
            <!--                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">-->
            <!--                <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label>-->
            <!--                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">-->
            <!--                <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label>-->
            <!--                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">-->
            <!--                <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label>-->
            <!--                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">-->
            <!--                <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label>-->
            <!--                <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">-->
            <!--                <label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label>-->
            <!--            </div>-->
            <button class="btn btn-primary" @click="searchAttractions">검색</button>
        </div>
        <div>
            <div id="map"></div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "KakaoMap",
    data() {
        return {
            map: null,
            markers: [],
            sidoList: [],
            gugunList: [],
            keyword: "",
            sidoCode: "1",
            gugunCode: "1",
            contentTypeId: "0",
        };
    },
    created() {
        this.init();
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            //카카오 객체가 있고, 카카오 맵 그릴 준비가 되어 있다면 맵 실행
            this.loadMap();
        } else {
            //없다면 카카오 스크립트 추가 후 맵 실행
            this.loadScript();
        }
    },
    methods: {
        init() {
            this.getSido();
            this.getGugun(1)
        },
        getSido() {
            const API_URL = `http://localhost:8080/attractions/sido`;
            axios.get(API_URL)
              .then((response) => {
                  this.sidoList = response.data.data;
              })
              .catch(() => {
              });
        },
        getGugun(sidoCode) {
            const API_URL = `http://localhost:8080/attractions/gugun?sidoCode=${sidoCode}`;
            axios.get(API_URL)
              .then((response) => {
                  this.gugunList = response.data.data;
              })
              .catch(() => {
              });
        },
        loadScript() {
            const script = document.createElement("script");
            script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=92031818da3bea1d2a0cd22686ab48ea&autoload=false';
            script.onload = () => window.kakao.maps.load(this.loadMap);
            document.head.appendChild(script);
        },
        loadMap() {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };
            //지도 생성 및 객체 리턴
            this.map = new window.kakao.maps.Map(container, options);
        },
        searchAttractions() {
            const API_URL = `http://localhost:8080/attractions?keyword=${this.keyword}&sidoCode=${this.sidoCode}&gugunCode=${this.gugunCode}&contentTypeId=`;
            axios.get(API_URL)
                .then((response) => {
                    if (response.data.data.length > 0) {
                        this.loadMaker(response.data.data);
                    } else {
                        alert("검색 결과가 존재하지 않습니다.")
                    }
                })
                .catch(() => {
                    console.log("exception");
                });
        },
        loadMaker(attractions) {
            //기존 마커 제거
            if (this.markers.length > 0) {
                for (let i = 0; i < this.markers.length; i++) {
                    this.markers[i].setMap(null);
                }
            }
            //검색결과 마킹
            let center = null;
            for (let i = 0; i < attractions.length; i++) {
                const markerPosition = new window.kakao.maps.LatLng(
                    attractions[i].latitude,
                    attractions[i].longitude
                );
                if (center == null) {
                    console.log("test")
                    center = markerPosition;
                }
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(this.map);
                this.markers.push(marker);
            }
            //중심으로 이동
            this.moveCenter(center);
        },
        moveCenter(position) {
            this.map.setCenter(position);
        },
    },
    watch: {
        sidoCode: function (sidoCode) {
            this.getGugun(sidoCode);
            this.searchAttractions();
        },
        gugunCode: function () {
            this.searchAttractions();
        }
    }
}
</script>
<style scoped>
#map {
    width: 100%;
    height: 550px;
}
</style>