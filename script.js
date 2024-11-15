jQuery(document).ready(function(){
  $(function() {
    $(".tabmenu>li>a").click(function(){
      $(this).parent().addClass("active")
      .siblings()
      .removeClass("active");
      return false;
    });
  });
});