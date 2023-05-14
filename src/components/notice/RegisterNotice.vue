<template>
    <section class='container'>
        <table class="table table-bordered">
            <tbody>
            <tr>
                <th class='align-middle'>제목</th>
                <td>
                    <div class="row">
                        <div class="col-10">
                            <input type="text" class="form-control" id="title" name='title' placeholder="제목을 입력하세요.">
                        </div>
                        <div class="col-2">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                상단고정
                            </label>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <th class='align-middle'>내용</th>
                <td>
                    <textarea class='form-control' name='content' rows='20'></textarea>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-center">
            <button class="btn btn-outline-secondary me-2" type="button">취소</button>
            <button class="btn btn-outline-primary ms-2" type="submit">등록</button>
        </div>
    </section>
</template>
<script>
export default {
    name: "RegisterNotice",
}
</script>