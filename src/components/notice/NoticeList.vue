<template>
  <div class="container">
      <h1>공지사항</h1>
      <router-view/>
      <notice-paging/>
  </div>
</template>
<script>
import NoticePaging from "@/components/notice/list/NoticePaging.vue";

export default {
    name: "NoticeList",
    components: {NoticePaging},
};
</script>