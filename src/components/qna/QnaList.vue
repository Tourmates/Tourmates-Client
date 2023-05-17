<template>
    <div class="container">
        <h1>문의사항</h1>
        <router-view/>
        <qna-paging/>
    </div>
</template>
<script>
import QnaPaging from "@/components/qna/list/QnaPaging.vue";

export default {
    name: "QnaList",
    components: {QnaPaging},
}
</script>