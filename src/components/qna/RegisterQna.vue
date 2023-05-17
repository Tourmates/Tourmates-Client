<template>
    <div>
        <section class='container'>
            <div>
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <th class='align-middle'>말머리</th>
                        <td>
                            <select class="form-select w-50" aria-label="Default select example" name="tag">
                                <option value="관광지" selected>관광지</option>
                                <option value="문화시설">문화시설</option>
                                <option value="축제공연행사">축제공연행사</option>
                                <option value="여행코스">여행코스</option>
                                <option value="레포츠">레포츠</option>
                                <option value="숙박">숙박</option>
                                <option value="쇼핑">쇼핑</option>
                                <option value="음식점">음식점</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th class='align-middle'>제목</th>
                        <td>
                            <div>
                                <input type="text" class="form-control" id="title" name='title'
                                       placeholder="제목을 입력하세요.">
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
                    <button class="btn btn-outline-primary ms-2" type="button" @click="register">등록</button>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name: "RegisterQna",
}
</script>