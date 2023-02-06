import { insertLast } from "./insert.js";


//할인이 없을때
const createItem = ({
  id = "",
  name = "",
  price = "",
  saleRatio = "",
  salePrice = "",
  image = {
    thumbnail: "",
    alt: "",
  },
} = {}) => {
  return /*html */`
  <div class="item-card swiper-slide">
  <div class="item">
    <p class="item-thumbnail">
      <img src="${image.thumbnail}" 
      alt="${image.alt}" />
    </p>
    <div class="cart-icon">
      <img src="./assets/icon/Cart.png" alt="장바구니 아이콘" />
    </div>
  </div>
  <a href="#" class="item-detail">
    <h3 class="item-title">${name}</h3>
    <p class="discount-price"><span class="item-price"> ${price}원</span></p>
  </a>  
  `;
};


//할인이 있을때
const createSaleItem = ({
  id = "",
  name = "",
  price = "",
  saleRatio = "",
  salePrice = "",
  image = {
    thumbnail: "",
    alt: "",
  },
} = {}) => {
  return /*html */`
  <div class="item-card swiper-slide">
    <div class="item">
      <p class="item-thumbnail">
        <img src="${image.thumbnail}" alt="${image.alt}" />
      </p>
      <div class="cart-icon">
        <img src="./assets/icon/Cart.png" alt="장바구니 아이콘" />
      </div>
    </div>
    <a href="#" class="item-detail">
      <h3 class="item-title">${name}</h3>
      <p class="discount-price"><span class="discount" class ="is-sale">${saleRatio * 100}%</span><span class="item-price"> ${salePrice}원</span></p>
      <del class="origin-price is-sale">${price}원</del>
    </a>
  </div>
  `
};


export function renderItem(target, data) {
  insertLast(target, createItem(data));
}

export function renderSaleItem(target, data) {
  insertLast(target, createSaleItem(data));
}