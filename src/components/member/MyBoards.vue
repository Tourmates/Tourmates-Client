<template>
    <section class='container'>
    <table class="table mt-3">
        <tbody class="table-group-divider">
        <div v-for = "board in boards" :key = "board"> 
            <tr>
                <!-- <th class='align-middle text-center'>
                        {{board.tag}}
                </th> -->
                <td>
                    <div>
                        <a href='${root}/articles/${article.articleId}'>
                                {{board.title}}
                        </a>
                    </div>
                    <div>
                        {{board.nickname}} | {{board.createdDate}}
                    </div>
                </td>
                <td class='align-bottom'>
                    조회수 {{board.hit}}
                </td>
            </tr>
        </div>
        </tbody>
    </table>
    <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <a href="${root}/articles/register" class="btn btn-primary" type="button">글쓰기</a>
    </div>
</section>
</template>

<script>
import axios from "axios";

export default{
    name: "MyBoards",
    data(){
        return {
            boards: [],
        };
    },
    created(){
        this.initComponent();
    },
    methods: {
        initComponent(){
            console.log("hihiihihi");

            if (isNaN(this.$route.query.pageNumber)) {
                this.$route.query.pageNumber = 10;
            }

            const API_URL = `http://localhost:8080/my/boards?pageNumber=1`;

            console.log("hihiihihi");
            axios.get(API_URL)
                .then((response) => {
                    console.log("response");
                    console.log(response);
                    this.boards = response.data.data;
                    console.log("boards"); 
                    console.log(this.boards);
                });

//            const API_URL = `http://localhost:8080/my/boards?pageNumber=${this.$route.query.pageNumber - this.pageLimit}`;

        }
    }
}
</script>