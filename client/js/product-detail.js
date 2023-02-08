import { getNode, getNodes } from "../lib/dom/getNode.js";
import { attr } from "../lib/dom/attr.js";
import { insertFirst, insertLast } from "../lib/dom/insert.js";
import { addClass, removeClass } from "../lib/dom/css.js";
import { tiger } from "../lib/utils/tiger.js";
import { loadStorage } from "../lib/utils/storage.js";

const productSection = getNode(".product-detail");
const productTextSection = getNode(".product-detail-text");
const productDescriptionSection = getNode("#product-description");
const productDetailSection = getNode("#product-detail");
const eachPrice = getNode(".each-product-price");
const totalPrice = getNode(".total-price-number");
const cartSections = getNodes(".cart-alarm");
const productName = getNode(".product-counter-container p");

const priceToString = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const productImageTemplate = ({ image }) => {
  return `
  <img
    src="./${image.view}"
    alt="${image.alt}"
    width="400px"
    height="500px"
  />  
  `;
};

const infoTextTemplate = ({
  name,
  description,
  price,
  saleRatio,
  salePrice,
}) => {
  const priceTemplate = priceToString(price); //가격 표시 변경하기
  const salePriceTemplate = priceToString(salePrice); //가격 표시 변경하기
  return salePrice === 0
    ? `
  <span class="early-delivery">샛별배송</span>
      <h1 class="product-title">${name}</h1>
      <h2 class="product-sub-title">${description}</h2>
      <span class="product-price">${priceTemplate}<small>원</small></span>
      <p class="login-notice">로그인 후, 적립 혜택이 제공됩니다.</p>
  `
    : `
    <span class="early-delivery">샛별배송</span>
    <h1 class="product-title">${name}</h1>
    <h2 class="product-sub-title">${description}</h2>
    <div>
      <div class="product-price">
        <span class="sale-ratio">${saleRatio * 100}%</span>
        <span class="product-price">${salePriceTemplate}<small>원</small></span>
      </div>
      <del class="original-price">${priceTemplate}원</del>
    </div>
    <p class="login-notice">로그인 후, 적립 혜택이 제공됩니다.</p>
  `;
};

const detailInfoTextTemplate = ({ name, description, image }) => {
  return `
          <img
            src="./${image.banner}"
            alt="${image.alt}"
            width="1050px"
            height="670px"
          />

          <div class="product-description-text">
            <h3>
              <small>${description}</small>
              ${name}
            </h3>
            <p>
              쫄면의 진가는 매콤새콤한 양념과 탱탱한 면발에서 찾을 수 있지요.
              풀무원은 이 맛을 더 부담 없이 즐길 수 있도록 튀기지 않고 만든
              탱탱쫄면을 선보입니다. 밀가루와 감자 전분을 적절히 배합해 탄력이
              좋고, 입에 넣었을 때는 찰지게 씹히죠. 고추장을 넣어 숙성한
              비빔장은 자연스럽고 깊은 맛을 냅니다. 간단하게 조리해 마지막 한
              가닥까지 탱탱한 식감을 즐겨보세요. 취향에 따라 다양한 고명을 올려
              드셔도 좋아요.
            </p>
          </div>
  `;
};

const detailInfoImageTemplate = ({ image }) => {
  return `
  <section>
  <h3 class="a11y-hidden">상품 영양 정보</h3>
  <img
    src="./${image.info}"
    alt="${image.alt}"
    aria-describedby="product-health-info"
    width="1050px"
    height="1066px"
  />
</section>
`;
};

const cartBubbleTemplate = ({ name, image }) => {
  return `
  <img
  src="./${image.thumbnail}"
  alt="${image.alt}"
  width="46px"
  height="60px"
  class="alarm-image"
/>
<div class="alarm-text">
  <h2>${name}</h2>
  <p>장바구니에 상품을 담았습니다.</p>
</div>
  `;
};

const getRecentItems = async () => {
  let recentItems = await loadStorage("recentItems");
  return recentItems[0].id;
};

const getData = async (productId) => {
  let response = await tiger.get("http://localhost:3000/products");
  let data = await response.data;
  let filterProduct = data.find((data) => data.id === productId);
  return filterProduct;
};

const renderPage = async () => {
  const productId = await getRecentItems();
  console.log(productId);
  const product = await getData(productId);

  let imageTemplate = productImageTemplate(product);
  let textTemplate = infoTextTemplate(product);
  let productDescriptionTemplate = detailInfoTextTemplate(product);
  let productDeatilTemplate = detailInfoImageTemplate(product);
  let cartTemplate = cartBubbleTemplate(product);
  let stringEachPrice = priceToString(product.price);

  insertFirst(productSection, imageTemplate);
  insertFirst(productTextSection, textTemplate);
  insertFirst(productDescriptionSection, productDescriptionTemplate);
  insertFirst(productDetailSection, productDeatilTemplate);
  insertFirst(cartSections[0], cartTemplate);
  insertFirst(cartSections[1], cartTemplate);

  productName.textContent = product.name;
  eachPrice.innerHTML =
    product.saleRatio === 0
      ? stringEachPrice + "원"
      : `<del>${stringEachPrice}원</del><span>${priceToString(
          product.salePrice
        )}원</span>`;
  totalPrice.innerHTML =
    product.saleRatio === 0
      ? stringEachPrice + "<small>원</small>"
      : `${priceToString(product.salePrice)}<small>원</small>`;
};
window.onload = renderPage;

const minusButton = getNode(".minus-button");
const plusButton = getNode(".plus-button");
const productQuantity = getNode(".product-counter span");
const minusImg = getNode(".minus-button img");

const heartButton = getNode(".plus-wish");

const cartButton = getNode(".cart-button");
const scrollCartButton = getNode(".scroll-header-inner .cart-alarm");
const cartBubble = getNode(".cart-alarm");
const onClickMinusHandler = () => {
  let quantity = Number(productQuantity.textContent);
  let each =
    eachPrice.textContent.length > 11
      ? parseInt(eachPrice.textContent.slice(6).split(",").join(""))
      : parseInt(eachPrice.textContent.split(",").join(""));
  let sum = parseInt(totalPrice.textContent.split(",").join(""));

  if (quantity <= 1) {
    return;
  }
  // 마이너스 버튼 비활성화 로직 다시 생각
  if (quantity <= 2) {
    attr(minusImg, "src", "./assets/icon/Minus=true.png");
  }
  productQuantity.textContent = quantity - 1;
  totalPrice.innerHTML = priceToString(sum - each) + "<small>원</small>";
};
const onClickPlusHandler = () => {
  attr(minusImg, "src", "./assets/icon/Minus=false.png");
  let quantity = Number(productQuantity.textContent);
  // 함수로 분리해보기
  let each =
    eachPrice.textContent.length > 11
      ? parseInt(eachPrice.textContent.slice(6).split(",").join(""))
      : parseInt(eachPrice.textContent.split(",").join(""));
  let sum = parseInt(totalPrice.textContent.split(",").join(""));
  productQuantity.textContent = quantity + 1;
  console.log(eachPrice.textContent);
  totalPrice.innerHTML = priceToString(sum + each) + "<small>원</small>";
};

// 함수 분리하기
const onClickHeartHandler = (e) => {
  console.log(e.target);
  let imgSrc = attr(e.target, "src");
  // tab접근성 고려
  if (!imgSrc) {
    imgSrc = attr(e.target.children[0], "src");
    if (imgSrc.includes("false")) {
      attr(e.target.children[0], "src", "./assets/icon/wish_true.png");
    } else {
      attr(e.target.children[0], "src", "./assets/icon/wish_false.png");
    }
  } else {
    if (imgSrc.includes("false")) {
      attr(e.target, "src", "./assets/icon/wish_true.png");
    } else {
      attr(e.target, "src", "./assets/icon/wish_false.png");
    }
  }
};

const onClickCartHandler = () => {
  // 장바구니에 담긴 상품 목록 데이터의 길이를 파악하고
  // 0개면 cart-number 보여주지 않고 1부터 cart-number 보이게 하는 로직 추가하기
  removeClass(cartBubble, "is-not-exist");
  removeClass(scrollCartButton, "is-not-exist");
  setTimeout(() => {
    addClass(cartBubble, "is-not-exist");
    addClass(scrollCartButton, "is-not-exist");
  }, 2000);
};

cartButton.addEventListener("click", onClickCartHandler);
minusButton.addEventListener("click", onClickMinusHandler);
plusButton.addEventListener("click", onClickPlusHandler);
heartButton.addEventListener("click", onClickHeartHandler);
