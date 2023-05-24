<template>
  <div class="container">
      <div class="mt-5 mb-5 text-center">
          <h3>핫플자랑하기</h3>
      </div>
      <hr/>
      <br/>
      <router-view/>
      <hot-place-paging/>
  </div>
</template>
<script>
import HotPlacePaging from "@/components/hotplace/list/HotPlacePaging.vue";

export default {
    name: "HotPlaces",
    components: {HotPlacePaging},
}
</script>