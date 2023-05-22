<template>
    <div>
        <div class='row'>
            <div class="col-6">
                <div id="map"></div>
            </div>
            <div class="col-6">
                <div>
                    <input type="text"
                           class="form-control search"
                           id="keyword" name='keyword'
                           placeholder="검색어를 입력해 주세요."
                           autocomplete="off"
                           :value="`${attractionTitle}`"
                    disabled>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "EditKakaoMap",
    props: {
        attractionTitle: {type: String},
        latitude: {type: Number},
        longitude: {type: Number},
    },
    data() {
        return {
            map: null,
        }
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
        loadScript() {
            const script = document.createElement("script");
            script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=92031818da3bea1d2a0cd22686ab48ea&autoload=false';
            script.onload = () => window.kakao.maps.load(this.loadMap);
            document.head.appendChild(script);
        },
        loadMap() {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(this.latitude, this.longitude),
                level: 3,
            };
            //지도 생성 및 객체 리턴
            this.map = new window.kakao.maps.Map(container, options);
            this.loadMarker();
        },
        loadMarker() {
            var markerPosition = new window.kakao.maps.LatLng(this.latitude, this.longitude);

            var marker = new window.kakao.maps.Marker({
                position: markerPosition
            });

            marker.setMap(this.map);
        },
    },
}
</script>
<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>