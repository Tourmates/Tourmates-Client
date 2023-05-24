<template>
    <div class="container">
        <div class="mt-5 mb-5 text-center">
            <h3>인기여행지</h3>
        </div>
        <hr/>
        <br/>
        <div>
            <p class="text-end text-secondary" style="margin-right: 20px">{{time}} 기준</p>
        </div>
        <div class="row w-100">
            <div class="col border p-3" style="width: 20%; margin-left: 5px; margin-right: 5px">
                <h3 class="text-center">10대</h3>
                <div>
                    <table>
                        <colgroup>
                            <col style="width: 15%">
                            <col style="width: 80%">
                            <col style="width: 15%">
                        </colgroup>
                        <tbody>
                        <tr v-for="(item, index) in teenagers" :key="index">
                            <td class="text-center align-middle" style="background-color: #a6a6a6;">{{index + 1}}</td>
                            <td class="text-truncate" style="max-width: 50px;">{{item.title}}</td>
                            <td v-if="item.change === 'UP'"><img src="@/assets/caret-up-fill.svg"></td>
                            <td v-else-if="item.change === 'DOWN'"><img src="@/assets/caret-down-fill.svg"></td>
                            <td v-else-if="item.change === 'EQUAL'"><img src="@/assets/dash.svg"></td>
                            <td v-else><img src="@/assets/plus.svg"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col border p-3" style="width: 20%; margin-left: 5px; margin-right: 5px">
                <h3 class="text-center">20대</h3>
                <div>
                    <table>
                        <colgroup>
                            <col style="width: 15%">
                            <col style="width: 80%">
                            <col style="width: 15%">
                        </colgroup>
                        <tbody>
                        <tr v-for="(item, index) in twenty" :key="index">
                            <td class="text-center align-middle" style="background-color: #a6a6a6;">{{index + 1}}</td>
                            <td class="text-truncate" style="max-width: 50px;">{{item.title}}</td>
                            <td v-if="item.change === 'UP'"><img src="@/assets/caret-up-fill.svg"></td>
                            <td v-else-if="item.change === 'DOWN'"><img src="@/assets/caret-down-fill.svg"></td>
                            <td v-else-if="item.change === 'EQUAL'"><img src="@/assets/dash.svg"></td>
                            <td v-else><img src="@/assets/plus.svg"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col border p-3" style="width: 20%; margin-left: 5px; margin-right: 5px">
                <h3 class="text-center">30대</h3>
                <div>
                    <table>
                        <colgroup>
                            <col style="width: 15%">
                            <col style="width: 80%">
                            <col style="width: 15%">
                        </colgroup>
                        <tbody>
                        <tr v-for="(item, index) in thirty" :key="index">
                            <td class="text-center align-middle" style="background-color: #a6a6a6;">{{index + 1}}</td>
                            <td class="text-truncate" style="max-width: 50px;">{{item.title}}</td>
                            <td v-if="item.change === 'UP'"><img src="@/assets/caret-up-fill.svg"></td>
                            <td v-else-if="item.change === 'DOWN'"><img src="@/assets/caret-down-fill.svg"></td>
                            <td v-else-if="item.change === 'EQUAL'"><img src="@/assets/dash.svg"></td>
                            <td v-else><img src="@/assets/plus.svg"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col border p-3" style="width: 20%; margin-left: 5px; margin-right: 5px">
                <h3 class="text-center">남성</h3>
                <div>
                    <table>
                        <colgroup>
                            <col style="width: 15%">
                            <col style="width: 80%">
                            <col style="width: 15%">
                        </colgroup>
                        <tbody>
                        <tr v-for="(item, index) in male" :key="index">
                            <td class="text-center align-middle" style="background-color: #a6a6a6;">{{index + 1}}</td>
                            <td class="text-truncate" style="max-width: 50px;">{{item.title}}</td>
                            <td v-if="item.change === 'UP'"><img src="@/assets/caret-up-fill.svg"></td>
                            <td v-else-if="item.change === 'DOWN'"><img src="@/assets/caret-down-fill.svg"></td>
                            <td v-else-if="item.change === 'EQUAL'"><img src="@/assets/dash.svg"></td>
                            <td v-else><img src="@/assets/plus.svg"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col border p-3" style="width: 20%; margin-left: 5px; margin-right: 5px">
                <h3 class="text-center">여성</h3>
                <div>
                    <table>
                        <colgroup>
                            <col style="width: 15%">
                            <col style="width: 80%">
                            <col style="width: 15%">
                        </colgroup>
                        <tbody>
                        <tr v-for="(item, index) in female" :key="index">
                            <td class="text-center align-middle" style="background-color: #a6a6a6;">{{index + 1}}</td>
                            <td class="text-truncate" style="max-width: 50px;">{{item.title}}</td>
                            <td v-if="item.change === 'UP'"><img src="@/assets/caret-up-fill.svg"></td>
                            <td v-else-if="item.change === 'DOWN'"><img src="@/assets/caret-down-fill.svg"></td>
                            <td v-else-if="item.change === 'EQUAL'"><img src="@/assets/dash.svg"></td>
                            <td v-else><img src="@/assets/plus.svg"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "TrendMain",
    data() {
        return {
            time: "",
            teenagers: [],
            twenty: [],
            thirty: [],
            male: [],
            female: [],
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            const API_URL = `http://localhost:8080/trends/total`;
            axios.get(API_URL)
              .then((response) => {
                  let data = response.data.data;
                  console.log(data);
                  this.time = data.time;
                  this.teenagers = data.teenager;
                  this.twenty = data.twenty;
                  this.thirty = data.thirty;
                  this.male = data.male;
                  this.female = data.female;
              })
        },
    },
}
</script>