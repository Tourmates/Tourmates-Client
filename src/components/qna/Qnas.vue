<template>
    <div class="container">
        <div class="mt-5 mb-5 text-center">
            <h3>문의사항</h3>
        </div>
        <hr/>
        <br/>
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