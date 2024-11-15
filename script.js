jQuery(document).ready(function () {
  // 탭 메뉴 클릭 시 클래스 추가 및 제거
  $(".tabmenu > li > a").click(function () {
    $(this).parent().addClass("active").siblings().removeClass("active");
    return false;
  });

  // 당첨 번호 메뉴 클릭 시 클래스 추가 및 제거
  $(".win_num_menu > li > a").click(function () {
    $(this).parent().addClass("checked").siblings().removeClass("checked");
    return false;
  });

  // 로또 데이터 슬라이드 기능
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

document.querySelector('.mobile_menu'),addEventListener('click', function() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none' ;
});
// 햄버거 메뉴 토글 기능 추가
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');
const closeMenu = document.getElementById('closeMenu')

//햄버거 메뉴 클릭시 메뉴 열기
mobileMenu.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto'; //스크롤 차단
});

//X 버튼 클릭시 메뉴 닫기
CloseMenu.addEventListener('click', ()=> {
  navMenu.classList.remove('open');
  document.body.style.overflow = 'auto'; //배경 스크롤 복원
})