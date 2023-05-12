<template>
    <div class="container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p class="col-md-4 mb-0 text-body-secondary">&copy; 2023 Company, Inc</p>

            <ul class="nav col-md-4 justify-content-end">
                <li class="nav-item">
                    <router-link to="/notices" class="nav-link px-2 text-secondary">공지사항</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="#" class="nav-link px-2 text-secondary">이용약관</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="#" class="nav-link px-2 text-secondary">개인정보처리방침</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="#" class="nav-link px-2 text-secondary">FAQs</router-link>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {
    name: "TheFooterNav",
    components: {},
    data() {
        return {
            message: "",
        };
    },
    created() {
    },
    methods: {},
};
</script>

<style>

</style>