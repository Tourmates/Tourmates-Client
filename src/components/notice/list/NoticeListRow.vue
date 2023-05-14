<template>
    <tr>
        <th class='text-center'>1</th>
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
        title: {type: String},
        createdDate: {type: String},
    },
}
</script>