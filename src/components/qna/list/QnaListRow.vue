<template>
  <tr>
      <th>1</th>
      <td class="text-center">{{ type }}</td>
      <td>
          <router-link :to="`/qna/${questionId}`">{{ title }}</router-link>
      </td>
      <td class="text-center">{{ createdDate }}</td>
  </tr>
</template>
<script>
export default {
    name: "QnaListRow",
    props: {
        questionId: {type: Number},
        type: {type: String},
        title: {type: String},
        anonymous: {type: Boolean},
        createdDate: {type: String},
    }
}
</script>