<template>
 <section class="bg-body-secondary mt-4 pb-4">
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for = "(hotPlace) in hotPlaces" :key = "hotPlace"> 
        <div class="col">
          <div class="card h-100">
            <img :src="require(`@/assets/upload/${hotPlace.storeFileName}`)" class="card-img-top" alt="img" style="object-fit: cover; height: 250px">
            <div class="card-body">
              <div class="text-uppercase text-mute text-sm letter-spacing-2">{{hotPlace.tag}}</div>
              <h5 class="card-title my-2">
                <router-link class="text-dark" :to="`/hotPlaces/${hotPlace.hotPlaceId}/edit`">{{hotPlace.title}}</router-link>
              </h5>
              <p class="text-gray-500 text-sm my-3">{{hotPlace.visitedDate}}</p>
                    <div class="my-2 text-muted text-sm" v-html="hotPlace.content"></div>
                    <router-link class="btn btn-link ps-0" :to="`/hotPlaces/${hotPlace.hotPlaceId}`">READ MORE</router-link>
            </div>
          </div>  
        </div>      
      </div>
    </div>
  </div>
  <hot-place-paging/>
</section> 
</template> 

<script>

import HotPlacePaging from "@/components/hotplace/list/HotPlacePaging.vue";
import axios from "axios";

export default {
  name: "MyHotPlaceList",
  components: { HotPlacePaging },

  data() {
    return {
      hotPlaces: [],
    };
  },
  created() {
    this.initComponent();
  },
  methods: {
    initComponent() {
      const API_URL = `http://localhost:8080/my/hotPlaces`;
      
      let jwtToken = localStorage.getItem("jwt-token");

      axios.get(API_URL, {
        headers: {
            Authorization: jwtToken,
          },
      })
          .then((response) => {
              this.hotPlaces = response.data.data;
              console.log("###########");
              console.log(this.hotPlaces);
            });
    },
  }
}
</script>