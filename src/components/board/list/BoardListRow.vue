<template>
  <tr>
      <th class='align-middle text-center'>
          1
      </th>
      <td>
          <div>
              <router-link :to="`/boards/${boardId}`">{{ title }}</router-link>
          </div>
          <div>
              {{ nickname }} | {{ createdDate }}
          </div>
      </td>
      <td class='align-bottom'>
          조회수 {{ hit }}
      </td>
  </tr>
</template>
<script>
export default {
    name: "BoardListRow",
    props: {
        boardId: {type: Number},
        title: {type: String},
        nickname: {type: String},
        createdDate: {type: String},
        hit: {type: Number},
    },
}
</script>
<style scoped>
a {
    text-decoration: none;
    color: black;
}
</style>