<template>
    <div>
        <div id="map"></div>
    </div>
</template>
<script>
export default {
    name: "RegisterKakaoMap",
    props: {
        plans: {type: Array}
    },
    data() {
        return {
            map: null,
            drawingFlag: false,
            clickLine: "",
            distanceOverlay: "",
            dots: [],
        };
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
    // created() {
    //     this.location();
    // },
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
                center: new window.kakao.maps.LatLng(35.8, 127.81532576137957),
                level: 13,
            };
            //지도 생성 및 객체 리턴
            this.map = new window.kakao.maps.Map(container, options);
            this.location();
        },
        location() {
            for(let i = 0; i < this.plans.length; i++) {
                let plan = this.plans[i];
                let position = new window.kakao.maps.LatLng(plan.latitude, plan.longitude);
                if (!this.drawingFlag) {
                    this.drawingFlag = true;
                    this.deleteClickLine();
                    this.deleteDistnce();
                    this.deleteCircleDot();

                    this.clickLine = new window.kakao.maps.Polyline({
                        map: this.map, // 선을 표시할 지도입니다
                        path: [position], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
                        strokeWeight: 3, // 선의 두께입니다
                        strokeColor: '#db4040', // 선의 색깔입니다
                        strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'solid' // 선의 스타일입니다
                    });

                    this.displayCircleDot(position, 0);
                } else {
                    let path = this.clickLine.getPath();
                    path.push(position);
                    this.clickLine.setPath(path);
                    let distance = Math.round(this.clickLine.getLength());
                    this.displayCircleDot(position, distance);
                }
            }
        },
        deleteClickLine() {
            if (this.clickLine) {
                this.clickLine.setMap(null);
                this.clickLine = null;
            }
        },
        deleteDistnce() {
            if (this.distanceOverlay) {
                this.distanceOverlay.setMap(null);
                this.distanceOverlay = null;
            }
        },
        deleteCircleDot() {
            for (let i = 0; i < this.dots.length; i++) {
                if (this.dots[i].circle) {
                    this.dots[i].circle.setMap(null);
                }
                if (this.dots[i].distance) {
                    this.dots[i].distance.setMap(null);
                }
            }
            this.dots = [];
        },
        displayCircleDot(position, distance) {
            // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
            let circleOverlay = new window.kakao.maps.CustomOverlay({
                content: '<span class="dot"></span>',
                position: position,
                zIndex: 1
            });

            // 지도에 표시합니다
            circleOverlay.setMap(this.map);
            if (distance > 0) {
                // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
                this.distanceOverlay = new window.kakao.maps.CustomOverlay({
                    content: '<div class="dotOverlay">거리 <span class="number">' + distance + '</span>m</div>',
                    position: position,
                    yAnchor: 1,
                    zIndex: 2
                });
                this.distanceOverlay.setMap(this.map);
                // console.log("distanceOverlay", distanceOverlay);
            }
            this.dots.push({circle: circleOverlay, distance: this.distanceOverlay});
        },
    }
}
</script>
<style scoped>
#map {
    width: 100%;
    height: 600px;
}
.dot {
    overflow: hidden;
    float: left;
    width: 12px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png');
}

.dotOverlay {
    position: relative;
    bottom: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    float: left;
    font-size: 12px;
    padding: 5px;
    background: #fff;
}

.dotOverlay:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
}

.number {
    font-weight: bold;
    color: #ee6152;
}

.dotOverlay:after {
    content: '';
    position: absolute;
    margin-left: -6px;
    left: 50%;
    bottom: -8px;
    width: 11px;
    height: 8px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png')
}

.distanceInfo {
    position: relative;
    top: 5px;
    left: 5px;
    list-style: none;
    margin: 0;
}

.distanceInfo .label {
    display: inline-block;
    width: 50px;
}

.distanceInfo:after {
    content: none;
}
.wrap {
    position: absolute;
    left: 0;
    bottom: 40px;
    width: 288px;
    height: 132px;
    margin-left: -144px;
    text-align: left;
    overflow: hidden;
    font-size: 12px;
    font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
    line-height: 1.5;
}

.wrap * {
    padding: 0;
    margin: 0;
}

.wrap .info {
    width: 286px;
    height: 120px;
    border-radius: 5px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
}

.wrap .info:nth-child(1) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
}

.info .title {
    padding: 5px 0 0 10px;
    height: 30px;
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: bold;
}

.info .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #888;
    width: 17px;
    height: 17px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
}

.info .close:hover {
    cursor: pointer;
}

.info .body {
    position: relative;
    overflow: hidden;
}

.info .desc {
    position: relative;
    margin: 13px 0 0 90px;
    height: 75px;
}

.desc .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.desc .jibun {
    font-size: 11px;
    color: #888;
    margin-top: -2px;
}

.info .img {
    position: absolute;
    top: 6px;
    left: 5px;
    width: 73px;
    height: 71px;
    border: 1px solid #ddd;
    color: #888;
    overflow: hidden;
}

.info:after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
}

.info .link {
    color: #5085BB;
}
</style>