<template>
    <div class="row">
        <div class="col-3">
            <h3>Draggable 1</h3>
            <draggable
                    class="list-group"
                    :list="list1"
                    group="people"
                    @change="log"
            >
                <div
                        class="list-group-item"
                        v-for="element in list1"
                        :key="element.name"
                >
                    {{ element.name }}
                </div>
            </draggable>
        </div>
        <div class="col-3">
            <h3>Draggable 2</h3>
            <draggable
                    class="list-group"
                    :list="list2"
                    group="people"
                    @change="log"
            >
                <div
                        class="list-group-item"
                        v-for="element in list2"
                        :key="element.name"
                >
                    {{ element.name }}
                </div>
            </draggable>
        </div>
    </div>
</template>
<script>
import draggable from "@/vuedraggable";

export default {
    name: "RegisterTripPlan",
    components: {draggable},
    data() {
        return {
            list1: [
                {name: "name1", id: 1},
                {name: "name2", id: 2},
                {name: "name3", id: 3},
                {name: "name4", id: 4},
            ],
            list2: [
                {name: "test1", id: 5},
                {name: "test2", id: 6},
                {name: "test3", id: 7},
            ]
        };
    },
    methods: {
        log: function (evt) {
            window.console.log(evt);
        }
    }

}
</script>