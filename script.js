//이벤트 기능을 구현할 때 호환성 문제를 해결해 줄 자바스크립 라이브러리 jquery
jQuery(document).ready(function(){
  $(function() {
    $(".tabmenu>li>a").click(function(){
      $(this).parent().addClass("active")
      .siblings()
      .removeClass("active");
      return false;
    });
  $(function() {
    $(".win_num_menu>li>a").click(function(){
      $(this).parent().addCalss("checked")
      .siblings()
      .removeClass("checked");
      return false;
    });
  });
  //탭 메뉴를 누르면 클래스가 추가되고 기존 클래스 삭제하는 기능
  //로또 당첨번호 탭 메뉴를 누르면 클래스가 추가되고 기존 클래스 삭제하는 기능
  $(document).ready(function () {
  const slider = $(".lotto");

  async function fetchLottoData() {
    const latestDraw = 903; // 최신 회차 번호를 알고 있다면 여기서 변경.
    for (let i = latestDraw; i > latestDraw - 5; i--) {
      // 최근 5회차의 데이터를 슬라이드로 추가
      await addSlide(i);
    }
    initializeSlider();
  }

  async function addSlide(drawNumber) {
    const apiUrl = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drawNumber}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.returnValue === "success") {
        const numbers = [
          data.drwtNo1,
          data.drwtNo2,
          data.drwtNo3,
          data.drwtNo4,
          data.drwtNo5,
          data.drwtNo6,
        ];
        const bonus = data.bnusNo;

        // 슬라이드에 추가할 HTML 생성
        const slideHTML = `
          <div class="slide">
            <h2>${drawNumber}회 당첨 번호</h2>
            <p>번호: ${numbers.join(", ")}</p>
            <p>보너스: ${bonus}</p>
          </div>
        `;
        slider.append(slideHTML);
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  }

  function initializeSlider() {
    slider.slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
    });
  }

  fetchLottoData(); // 초기 데이터 로드
});

});
