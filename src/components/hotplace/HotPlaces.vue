<template>
  <div>
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