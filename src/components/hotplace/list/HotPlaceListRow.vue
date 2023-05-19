<template>
    <div class="col">
        <div class="card h-100">
            <img src="#" class="card-img-top" alt="img">
            <div class="card-body">
                <a class="text-uppercase text-mute text-sm letter-spacing-2">{{tag}}</a>
                <h5 class="card-title my-2">
                    <router-link class="text-dark" :to="`/hotPlaces/${hotPlaceId}`">{{title}}</router-link>
                </h5>
                <p class="text-gray-500 text-sm my-3">{{ visitedDate}}</p>
                <p class="my-2 text-muted text-sm">${hotplace.content}</p>
                <router-link class="btn btn-link ps-0" :to="`/hotPlaces/${hotPlaceId}`">READ MORE</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "HotPlaceListRow",
    props: {
        hotPlaceId: {type: Number},
        tag: {type: String},
        title: {type: String},
        visitedDate: {type: String},
    },
}
</script>