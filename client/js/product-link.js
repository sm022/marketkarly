import { getNode, getNodes } from "../lib/dom/getNode.js";
import { addClass, containClass, css, removeClass } from "../lib/dom/css.js";
const linkContainer = getNode(".hyper-link-container");
const productDescription = getNode("#product-description");

const hyperLinks = getNodes(".hyper-link-container a");

const onScrollHandler = () => {
  let windowTop = window.scrollY;
  if (windowTop >= 1230 && !containClass(linkContainer, "is-fixed")) {
    addClass(linkContainer, "is-fixed");
    css(productDescription, "padding-top", "80px");
  }
  if (windowTop >= 1230 && windowTop < 2830) {
    addClass(hyperLinks[0], "is-selected");
  }
  if (!(windowTop >= 1230 && windowTop < 2830)) {
    removeClass(hyperLinks[0], "is-selected");
  }
  if (windowTop >= 2830 && windowTop < 4860) {
    addClass(hyperLinks[1], "is-selected");
  }
  if (!(windowTop >= 2830 && windowTop < 4860)) {
    removeClass(hyperLinks[1], "is-selected");
  }
  if (windowTop >= 4860 && windowTop < 6550) {
    addClass(hyperLinks[2], "is-selected");
  }
  if (!(windowTop >= 4860 && windowTop < 6550)) {
    removeClass(hyperLinks[2], "is-selected");
  }
  if (windowTop >= 6550) {
    addClass(hyperLinks[3], "is-selected");
  }
  if (!(windowTop >= 6550)) {
    removeClass(hyperLinks[3], "is-selected");
  }

  if (windowTop <= 1180 && containClass(linkContainer, "is-fixed")) {
    removeClass(linkContainer, "is-fixed");
    css(productDescription, "padding-top", "0");
    removeClass(hyperLinks[0], "is-selected");
    removeClass(hyperLinks[1], "is-selected");
    removeClass(hyperLinks[2], "is-selected");
  }
};
window.addEventListener("scroll", onScrollHandler);
