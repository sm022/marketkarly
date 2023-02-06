import { getNode } from "../lib/dom/getNode.js";
import { addClass, css, removeClass } from "../lib/dom/css.js";

// 최상단 배너
const topBanner = getNode(".top-banner");
const closeButton = getNode(".close-icon");
// 헤더
const normalHeader = getNode(".normal-header");
const scrollHeader = getNode(".scroll-header");
const main = getNode("main");

// 카테고리 메뉴
const categoryMenu = getNode(".category-menu");
const scrollCategoryMenu = getNode(".scroll-header-inner .category-menu");
const categoryList = getNode(".category-list");
const scrollCategoryList = getNode(".scroll-header-inner .category-list");

const onClickCloseHandler = () => {
  css(topBanner, "display", "none");
};

const onMouseoverHandler = () => {
  addClass(categoryList, "is-active");
  addClass(scrollCategoryList, "is-active");
};

const onMouseoutHandler = () => {
  removeClass(categoryList, "is-active");
  removeClass(scrollCategoryList, "is-active");
};

closeButton.addEventListener("click", onClickCloseHandler);
categoryMenu.addEventListener("mouseover", onMouseoverHandler);
scrollCategoryMenu.addEventListener("mouseover", onMouseoverHandler);
categoryMenu.addEventListener("mouseout", onMouseoutHandler);
scrollCategoryMenu.addEventListener("mouseout", onMouseoutHandler);
// 링크마다 해당하는 부분에 도달하면 is-selected 클래스 추가
// 이전 링크는 is-selected 제거
// footer 위에 도달하면 마지막 위치에 있다가 스크롤 올릴 때 고정되어 나타남
// 쓰로틀, 디바운스 추가해보기
const onScrollHandler = () => {
  let windowTop = window.scrollY;
  // console.log(windowTop);
  const normalClassList = normalHeader.classList;

  if (windowTop > 160 && !normalClassList.contains("close")) {
    addClass(normalHeader, "close");
    removeClass(scrollHeader, "close");
    css(main, "padding-top", "240px");
  }
  if (windowTop === 0 && normalClassList.contains("close")) {
    addClass(scrollHeader, "close");
    removeClass(normalHeader, "close");
    css(main, "padding-top", "0");
  }
};

window.addEventListener("scroll", onScrollHandler);
