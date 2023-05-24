<template>
    <div class="col">
        <div class="card h-100">
            <img :src="require(`@/assets/upload/${storeFileName}`)" class="card-img-top" alt="img" style="object-fit: cover; height: 250px">
            <div class="card-body">
                <h5 class="card-title my-2">
                    <router-link class="text-dark" :to="`/hotPlaces/${hotPlaceId}`">{{title}}</router-link>
                </h5>
                <p class="text-gray-500 text-sm my-3">{{ visitedDate}}</p>
                <div>
                    <span class="badge text-bg-light" v-for="(tag, index) in tags" :key="index">#{{tag}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "HotPlaceListRow",
    props: {
        hotPlaceId: {type: Number},
        tags: {type: Array},
        title: {type: String},
        visitedDate: {type: String},
        storeFileName: {type: String},
    },
}
</script>
<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>