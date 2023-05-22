<template>
    <li class="text-truncate">
        <a @click="onClickAttractionItem(contentId, title, latitude, longitude)"
           v-html="title">
<!--            {{ title }}-->
        </a>
    </li>
</template>
<!--
${attraction.title.replace(keyword, `<strong style="color: #c62917;">` + keyword + `</strong>`)}
-->
<script>
export default {
    name: "LiveSearchRow",
    props: {
        keyword: {type: String},
        title: {type: String},
        contentId: {type: Number},
        latitude: {type: Number},
        longitude: {type: Number},
    },
    methods: {
        onClickAttractionItem(contentId, title, latitude, longitude) {
            this.$emit("onClickAttractionItem", contentId, title, latitude, longitude);
        },
    },
}
</script>
<style scoped>
a {
    display: block;
    line-height: 40px;
    padding: 0 8px;
    color: #444;
    font-size: 16px;
    cursor: pointer;
}
</style>