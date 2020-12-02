
//Chọn thể loại
$(document).on('click','.category-item' , (e) => {
    let el = e.target;
    let category = $(el).attr('data');
    if(category !== "all"){
        $('.category').val(category);
    }
    else{
        $('.category').val("")
    }
    $('.form-search')[0].submit();
})

//Chọn khu vực
$(document).on('click','.area-item' , (e) => {
    let el = e.target;
    if($(el).attr('data')){
        let area = $(el).attr('data');
        $('.area').val(area);
    }
    else{
        el = $(el).closest('li');
        let area = $(el).attr('data');
        $('.area').val(area);
    }
    $('.form-search')[0].submit();
})

//Chọn tên
$(document).on('change','.searchbar' , (e) => {
    let el = e.target;
    let title = $(el).val();
    $('.title').val(title);
    $('.form-search')[0].submit();
})

//Bỏ chọn khu vực

$(document).on('click','.btn-cancel-area' , (e) => {
    $('.area').val("");
})

//Nhấn nút chuyển trang
$(document).on('click','.page-link', (e) => {
    let el = e.target;
    let action = $(el).attr('action-type');
    let page = $('.page').val();
    page = parseInt(page);
    if(action == "sub"){
      $('.page').val(--page);
    }
    if(action == "add"){
      $('.page').val(++page);
    }

    $('#form-search')[0].submit();
  })

//hàm khi nhấn breadcrumb

$(document).on('click','.bread-category', (e) => {
    let el = e.target;
    let category = $(el).attr('data');
    $('.category').val(category);
    $('.form-search')[0].submit();
})

$(document).on('click','.btn-cancel-area', (e) => {
    let el = e.target;
    $('.area').val("");
    $('.form-search')[0].submit();
})

