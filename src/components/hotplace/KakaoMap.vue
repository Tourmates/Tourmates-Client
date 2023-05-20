<template>
  <div>
      <div class='row'>
          <div class="col-6">
              <div id="map"></div>
          </div>
          <div class="col-6">
              <div>
                  <input type="text" class="form-control search" id="keyword" name='keyword' placeholder="검색어를 입력해 주세요." autocomplete="off" @keyup="onKeyUpAttractionTitle">
                  <input type="hidden" id="contentId" name="contentId">
              </div>
              <ol class="attractions" id="attractions"></ol>
          </div>
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
            attractions: [],
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
            const API_URL = `http://localhost:8080/attractions/search`;
            axios.get(API_URL)
              .then((response) => {
                  console.log("load attractionInfo");
                  this.attractions = response.data.data.map(function (data) {
                      return {
                          contentId: data.contentId,
                          title: data.title,
                          lowerCaseName: data.title.toLowerCase(),
                      };
                  });
              })
              .catch(() => {});
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
        onKeyUpAttractionTitle() {
            let attractions = document.getElementById("attractions");
            attractions.innerHTML = "";
            const keyword = document.getElementById("keyword").value;
            const lowerCaseKeyword = keyword.toLowerCase();
            let keywordForRegExp = new RegExp(lowerCaseKeyword);
            let matchAttractions = this.attractions.filter(function (attraction) {
                return attraction.lowerCaseName.match(keywordForRegExp);
            });
            if (keyword.length > 1 && matchAttractions.length === 0) {
                keywordForRegExp = new RegExp(lowerCaseKeyword.slice(0, -1));
                matchAttractions = this.attractions.filter(function (attraction) {
                    return attraction.lowerCaseName.match(keywordForRegExp);
                });
                if (matchAttractions.length === 0) {
                    const html = `검색 결과가 없습니다.<br>Tourmates는 국내 ${this.attractions.length}개 관광지를 지원합니다.`;
                    document.getElementById("attractions").innerHTML = `<li style="line-height: 20px; padding: 0 8px; color: #a6a6a6; font-size: 14px;">${html}</li>`;
                }
            }
            if (matchAttractions.length > 0) {
                let count = matchAttractions.length > 7 ? 7 : matchAttractions.length;
                for(let i = 0; i < count; i++) {
                    let attraction = matchAttractions[i];
                    const html = `<a style="display: block; line-height: 40px; padding: 0 8px; color: #444; font-size: 16px; cursor: pointer;">${attraction.title.replace(keyword, `<strong style="color: #c62917;">` + keyword + `</strong>`)}</a>`;
                    let tag = `<li data-id="${attraction.contentId}" data-title="${attraction.title}" class="text-truncate">${html}</li>`;
                    document.getElementById("attractions").innerHTML += tag;
                }
            }
        },
        onClickAttractionItem(contentId, title) {
            document.getElementById("keyword").value = title;
            document.getElementById("contentId").value = contentId;
            let attractions = document.getElementById("attractions");
            attractions.innerHTML = "";
        },
    },
}
</script>
<style scoped>
#map {
    width: 100%;
    height: 400px;
}
dl,li,ol,ul {
    list-style-type: none
}
ol.attractions {
    margin-top: 16px;
}
</style>