<template>
    <tr>
        <th class="text-center">{{ tripPlanId }}</th>
        <td>
            <router-link :to="`/tripPlans/${tripPlanId}`">{{ title }}</router-link>
        </td>
        <td class="text-center">{{ nickname }}</td>
        <td class="text-center">{{ hit }}</td>
        <td class="text-center">{{ createdDate }}</td>
    </tr>
</template>
<script>
export default {
    name: "TripPlanListRow",
    props: {
        tripPlanId: {type: Number},
        title: {type: String},
        nickname: {type: String},
        hit: {type: Number},
        createdDate: {type: String},
    },
}
</script>