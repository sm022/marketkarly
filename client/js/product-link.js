import { getNode, getNodes } from "../lib/dom/getNode.js";
import { addClass, containClass, css, removeClass } from "../lib/dom/css.js";
const linkContainer = getNode(".hyper-link-container");
const productDescription = getNode("#product-description");

const hyperLinks = getNodes(".hyper-link-container a");

const onScrollHandler = () => {
  let windowTop = window.scrollY;

  if (windowTop >= 1230 && !containClass(linkContainer, "is-fixed")) {
    addClass(linkContainer, "is-fixed");
    addClass(hyperLinks[0], "is-selected");
    css(productDescription, "padding-top", "80px");
  }
  // 상세정보 -> 상품설명
  if (windowTop < 2800 && containClass(hyperLinks[1], "is-selected")) {
    addClass(hyperLinks[0], "is-selected");
    removeClass(hyperLinks[1], "is-selected");
  }
  //상세정보 도달
  if (windowTop >= 2800 && !containClass(hyperLinks[1], "is-selected")) {
    addClass(hyperLinks[1], "is-selected");
    removeClass(hyperLinks[0], "is-selected");
  }
  // 링크 고정 해제
  if (windowTop <= 1180 && containClass(linkContainer, "is-fixed")) {
    removeClass(linkContainer, "is-fixed");
    css(productDescription, "padding-top", "0");
    removeClass(hyperLinks[0], "is-selected");
  }
};
window.addEventListener("scroll", onScrollHandler);
