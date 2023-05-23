<template>
  <div class="container">
      <router-view/>
      <notice-paging/>
  </div>
</template>
<script>
import NoticePaging from "@/components/notice/list/NoticePaging.vue";

export default {
    name: "NoticeList",
    components: {NoticePaging},
    data() {
        return {};
    }
};
</script>