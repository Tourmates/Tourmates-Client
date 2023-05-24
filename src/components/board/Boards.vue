<template>
    <div class="container">
        <router-view/>
        <board-paging/>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <router-link to="/boards/register" class="btn btn-primary">글쓰기</router-link>
        </div>
    </div>
</template>
<script>
import BoardPaging from "@/components/board/list/BoardPaging.vue";

export default {
    name: 'BoardList',
    components: {BoardPaging},
}
</script>