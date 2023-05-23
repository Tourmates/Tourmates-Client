<template>
    <div class="row">
        <div class="col-3">
            <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
                <a href="/"
                   class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom d-flex justify-content-between">
                    <span class="fs-5 fw-semibold">검색된 여행지 정보</span>
                    <span class="fs-5 fw-semibold">검색결과 {{attractions.length}}개</span>
                </a>
                <div class="list-group list-group-flush border-bottom scrollarea" style="overflow-y: scroll; height: 733px;">
                    <attraction-info
                            v-for="(attraction, index) in attractions"
                            :key="index"
                            :contentId="attraction.contentId"
                            :title="attraction.title"
                            :zipcode="attraction.zipcode"
                            :addr1="attraction.addr1"
                            :latitude="attraction.latitude"
                            :longitude="attraction.longitude"
                            @clickAttraction="clickAttraction"
                    />
                </div>
            </div>
        </div>
        <div class="col-9 ps-0">
            <div class="mb-3 ps-3 me-5 pe-5">
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
                            >{{ gugun.name }}
                            </option>
                        </select>
                    </div>
                    <!-- keyword -->
                    <div class="col">
                        <input type="text" class="form-control" id="keyword" v-model="keyword"
                               @keyup.enter="searchAttractions">
                    </div>
                </div>
                <!-- contentType -->
                <div class="d-flex justify-content-between mt-3">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="ATTRACTION" value="ATTRACTION"
                               v-model="contentTypeIds">
                        <label class="form-check-label" for="ATTRACTION">관광지</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="CULTURAL" value="CULTURAL"
                               v-model="contentTypeIds">
                        <label class="form-check-label" for="CULTURAL">문화시설</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="FESTIVAL" value="FESTIVAL"
                               v-model="contentTypeIds">
                        <label class="form-check-label" for="FESTIVAL">축제공연행사</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="TRAVEL" value="TRAVEL"
                               v-model="contentTypeIds">
                        <label class="form-check-label" for="TRAVEL">여행코스</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="LEPORTS" value="LEPORTS"
                               v-model="contentTypeIds">
                        <label class="form-check-label" for="LEPORTS">레포츠</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="ACCOMMODATION" value="ACCOMMODATION"
                               v-model="contentTypeIds">
                        <label class="form-check-label" for="ACCOMMODATION">숙박</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="SHOPPING" value="SHOPPING"
                               v-model="contentTypeIds">
                        <label class="form-check-label" for="SHOPPING">쇼핑</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="RESTAURANT" value="RESTAURANT"
                               v-model="contentTypeIds">
                        <label class="form-check-label" for="RESTAURANT">음식점</label>
                    </div>
                </div>
            </div>
            <div>
                <div id="map"></div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import AttractionInfo from "@/components/attraction/AttractionInfo.vue";

export default {
    name: "KakaoMap",
    components: {AttractionInfo},
    data() {
        return {
            map: null,
            markers: [],
            sidoList: [],
            gugunList: [],
            keyword: "",
            sidoCode: "1",
            gugunCode: "1",
            contentTypeIds: [],
            attractions: [],
            overlay: null,
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
            let API_URL = `http://localhost:8080/attractions?keyword=${this.keyword}&sidoCode=${this.sidoCode}&gugunCode=${this.gugunCode}`;
            for (let i = 0; i < this.contentTypeIds.length; i++) {
                API_URL += `&contentTypes=${this.contentTypeIds[i]}`;
            }
            axios.get(API_URL)
                .then((response) => {
                    if (response.data.data.length > 0) {
                        this.loadMakers(response.data.data);
                        this.attractions = response.data.data
                    } else {
                        alert("검색 결과가 존재하지 않습니다.")
                    }
                })
                .catch(() => {
                    console.log("exception");
                });
        },
        loadMakers(attractions) {
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
        clickAttraction(latitude, longitude) {
            const position = new window.kakao.maps.LatLng(latitude, longitude);
            this.moveCenter(position);
        },
    },
    watch: {
        sidoCode: function (sidoCode) {
            this.getGugun(sidoCode);
            this.searchAttractions();
        },
        gugunCode: function () {
            this.searchAttractions();
        },
        contentTypeIds: function () {
            this.searchAttractions();
        }
    }
}
</script>
<style scoped>
#map {
    width: 100%;
    height: 700px;
}
</style>