<template>
    <tr>
        <th class='text-center'>
            <span v-if="pin" class="badge text-bg-primary">공지</span>
            <span v-else>1</span>
        </th>
        <td>
            <router-link :to="`/notices/${noticeId}`">{{ title }}</router-link>
        </td>
        <td class='text-center'>{{ createdDate }}</td>
    </tr>
</template>
<script>
export default {
    name: "NoticeListRow",
    props: {
        // no: {type: Number},
        noticeId: {type: Number},
        pin: {type: Boolean},
        title: {type: String},
        createdDate: {type: String},
    },
}
</script>
<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>