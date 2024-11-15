//이벤트 기능을 구현할 때 호환성 문제를 해결해 줄 자바스크립 라이브러리 jquer
jQuery(document).ready(function(){
  $(function() {
    $(".tabmenu>li>a").click(function(){
      $(this).parent().addClass("active")
      .siblings()
      .removeClass("active");
      return false;
    });
  });
  //탭 메뉴를 누르면 클래스가 추가되고 기존 클래스 삭제하는 기능
});