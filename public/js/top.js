$(function(){
$('.category_btn').click(function(){
    if($(this).hasClass('category_btn_active')){}
    else{
        $('.category_btn_active').removeClass('category_btn_active');
        $(this).addClass('category_btn_active');
    }
});

});

