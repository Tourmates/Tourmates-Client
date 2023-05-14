<template>
    <div>
        <section class='container'>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <div>
                    <input type="text" class="form-control" id="keyword" name="keyword" placeholder="작성자, 제목, 내용">
                </div>
                <div>
                    <select class="form-select" aria-label="Default select example" name="sorted">
                        <option value="1">최신등록순</option>
                        <option value="2">조회수</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-primary" type="button">검색</button>
                </div>
            </div>
            <router-view/>
            <board-paging/>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <router-link to="/boards/register" class="btn btn-primary">글쓰기</router-link>
            </div>
        </section>
    </div>
</template>
<script>
import BoardPaging from "@/components/board/list/BoardPaging.vue";

export default {
    name: 'BoardList',
    components: {BoardPaging},
}
</script>