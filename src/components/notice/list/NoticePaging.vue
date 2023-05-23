<template>
    <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" v-if="prev">
                    <router-link
                            :to="`/notices?pageNumber=${ (startPageIndex - 1) * listRowCount }`"
                            @click.native="movePage(startPageIndex - 1)"
                            class="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </router-link>
                </li>
                <li class="page-item" v-for="index in endPageIndex - startPageIndex + 1" :key="index"
                :class="{active: ( (startPageIndex + index - 1) === currentPageIndex)}">
                    <router-link
                    :to="`/notices?pageNumber=${ ((startPageIndex + index - 1) * listRowCount ) / 10 }`"
                    class="page-link"
                    @click.native="movePage(startPageIndex + index - 1)"
                    >
                    {{ startPageIndex + index - 1 }}
                    </router-link>
                </li>
                <li class="page-item" v-if="next">
                    <router-link
                            :to="`/notices?pageNumber=${ (endPageIndex + 1) * listRowCount }`"
                            @click.native="movePage(endPageIndex + 1)"
                            class="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "NoticePaging",
    data() {
        return {
            totalListItemCount: 0,
            listRowCount: 10,
            pageLinkCount: 10,
            currentPageIndex: 1,

            pageCount: 0,
            startPageIndex: 0,
            endPageIndex: 0,
            prev: false,
            next: false
        };
    },
    methods: {
        movePage(param) {
            this.currentPageIndex = param;
            this.init();
        },
        init() {
            const API_URL = "http://localhost:8080/notices/totalCount";
            axios.get(API_URL)
              .then((response) => {
                  this.totalListItemCount = response;
                  this.initUI();
              })
        },
        initUI() {

            this.pageCount = Math.ceil(this.totalListItemCount / this.listRowCount);

            if ((this.currentPageIndex % this.pageLinkCount) === 0) {
                this.startPageIndex = ((this.currentPageIndex / this.pageLinkCount) - 1) * this.pageLinkCount + 1
            } else {
                this.startPageIndex = Math.floor(this.currentPageIndex / this.pageLinkCount) * this.pageLinkCount + 1
            }

            if ((this.currentPageIndex % this.pageLinkCount) === 0) {
                this.endPageIndex = ((this.currentPageIndex / this.pageLinkCount) - 1) * this.pageLinkCount + this.pageLinkCount
            } else {
                this.endPageIndex = Math.floor(this.currentPageIndex / this.pageLinkCount) * this.pageLinkCount + this.pageLinkCount;
            }

            if (this.endPageIndex > this.pageCount) {
                this.endPageIndex = this.pageCount
            }

            if (this.currentPageIndex <= this.pageLinkCount) {
                this.prev = false;
            } else {
                this.prev = true;
            }

            if (this.endPageIndex >= this.pageCount) {
                this.endPageIndex = this.pageCount;
                this.next = false;
            } else {
                this.next = true;
            }
        }
    },
    watch: {
        currentPageIndex: function () {
            this.initUI();
        }
    },
    created() {
        this.init();
    },
    mounted() {
        this.$router.push('notices?pageNumber=' + (this.listRowCount / 10))
          .catch(() => {
          });
    }
};
</script>