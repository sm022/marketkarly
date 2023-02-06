import { getNode, getNodes } from "../lib/dom/getNode.js";
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

const linkContainer = getNode(".hyper-link-container");
const productDescription = getNode("#product-description");

const hyperLinks = getNodes(".hyper-link-container a");

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

// footer 위에 도달하면 마지막 위치에 있다가 스크롤 올릴 때 고정되어 나타남
// 쓰로틀, 디바운스 추가해보기
const onScrollHandler = () => {
  let windowTop = window.scrollY;
  const normalClassList = normalHeader.classList;
  const linkClassList = linkContainer.classList;

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

  //상품설명 도달
  if (windowTop >= 1230 && !linkClassList.contains("is-fixed")) {
    addClass(linkContainer, "is-fixed");
    addClass(hyperLinks[0], "is-selected");
    css(productDescription, "padding-top", "80px");
  }
  // 상세정보 -> 상품설명
  if (windowTop < 2800 && hyperLinks[1].classList.contains("is-selected")) {
    addClass(hyperLinks[0], "is-selected");
    removeClass(hyperLinks[1], "is-selected");
  }
  //상세정보 도달
  if (windowTop >= 2800 && !hyperLinks[1].classList.contains("is-selected")) {
    addClass(hyperLinks[1], "is-selected");
    removeClass(hyperLinks[0], "is-selected");
  }
  // 링크 고정 해제
  if (windowTop <= 1180 && linkClassList.contains("is-fixed")) {
    removeClass(linkContainer, "is-fixed");
    css(productDescription, "padding-top", "0");
    removeClass(hyperLinks[0], "is-selected");
  }
};

window.addEventListener("scroll", onScrollHandler);
