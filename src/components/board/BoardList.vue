<template>
    <div>
        <section class='container'>
            <form class="d-grid gap-2 d-md-flex justify-content-md-end" method="get">
                <div>
                    <input type="text" class="form-control" id="keyword" name="keyword" placeholder="작성자, 제목, 내용">
                </div>
                <div>
                    <select class="form-select" aria-label="Default select example" name="tag">
                        <option value="1">전체</option>
                        <option value="12">관광지</option>
                        <option value="14">문화시설</option>
                        <option value="15">축제공연행사</option>
                        <option value="25">여행코스</option>
                        <option value="28">레포츠</option>
                        <option value="32">숙박</option>
                        <option value="38">쇼핑</option>
                        <option value="39">음식점</option>
                    </select>
                </div>
                <div>
                    <select class="form-select" aria-label="Default select example" name="sorted">
                        <option value="1">최신등록순</option>
                        <option value="2">조회수</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-primary" type="submit">검색</button>
                </div>
            </form>
            <table class="table mt-3">
                <tbody class="table-group-divider">
                <tr v-for="(board, index) in boards" :key="index">
                    <th class='align-middle text-center'>
                        {{ board.tag }}
                    </th>
                    <td>
                        <div>
                            <router-link :to="`/boards/${board.boardId}`">{{ board.title }}</router-link>
                        </div>
                        <div>
                            {{ board.nickname }} | {{ board.createdDate }}
                        </div>
                    </td>
                    <td class='align-bottom'>
                        조회수 {{ board.hit }}
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item" v-if="page.prev">
                            <router-link
                                    :to="`/boards?pageNum=${page.startPage - 1}&amount=${page.amount}`"
                                    class="page-link" aria-label="Previous"><span
                                    aria-hidden="true">&laquo;</span></router-link>
                        </li>
                        <li class="page-item" v-for="num in number" :key="num">
                            <router-link :to="`/boards?pageNum=${num}&amount=${page.amount}`" class="page-link">
                                {{ num }}
                            </router-link>
                        </li>
                        <!--                        <c:forEach var="num" begin="${page.startPage}" end="${page.endPage}">-->
                        <!--                            <li class="page-item">-->
                        <!--                                <a class="page-link"-->
                        <!--                                   href="${root}/articles?pageNum=${num}&amount=${page.amount}">${num}</a>-->
                        <!--                            </li>-->
                        <!--                        </c:forEach>-->
                        <li class="page-item" v-if="page.next">
                            <router-link :to="`/boards?pageNum=${page.endPage + 1}&amount=${page.amount}`"
                                         class="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <router-link to="/boards/register" class="btn btn-primary">글쓰기</router-link>
            </div>
        </section>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: 'BoardList',
    data() {
        return {
            boards: [],
            number: [],
            page: "",
        };
    },
    methods: {
        getBoardList() {
            const API_URL = `http://localhost:8080/boards`;
            axios.get(API_URL)
                .then((response) => {
                    console.log(response.data)
                    this.boards = response.data.data;
                    this.page = response.data.page;
                    let num = [];
                    for (let i = this.page.startPage; i <= this.page.endPage; i++) {
                        num.push(i);
                    }
                    this.number = num;
                    console.log(this.number);
                })
        },
    },
    created() {
        this.getBoardList();
    }
}
</script>