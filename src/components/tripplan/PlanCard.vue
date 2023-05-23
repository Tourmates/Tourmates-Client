<template>
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4" v-if="image.length === 0">
                <img src="@/assets/noimg.jpg" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-4" v-else>
                <img :src="`${image}`" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{title}}</h5>
                    <p class="card-text">(우) {{zipcode}}<br>{{addr1}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PlanCard",
    props: {
        title: {type: String},
        addr1: {type: String},
        zipcode: {type: String},
        image: {type: String},
    }
}
</script>