import { getNode } from "../lib/dom/getNode.js";
import { attr } from "../lib/dom/attr.js";
import { insertFirst, insertLast } from "../lib/dom/insert.js";
// 임시데이터
// 할인 하는 상품
// const product = {
//   id: "product-rksk",
//   name: "[대구 반할만떡] 유부호만두",
//   description: "유부로 속을 든든히 채운 군만두",
//   price: 6900,
//   saleRatio: 0.24,
//   salePrice: 5244,
//   image: {
//     thumbnail: "ubuho/thumbnail.jpg",
//     view: "ubuho/detail_view.jpg",
//     banner: "ubuho/detail_banner.jpg",
//     info: "ubuho/detail_info.jpg",
//     alt: "유부호 만두",
//   },
//   stock: 3,
// };
// 할인 안하는 상품
const product = {
  id: "product-ekfk",
  name: "[풀무원] 탱탱쫄면 (4개입)",
  description: "튀기지 않아 부드럽고 매콤한",
  price: 4980,
  saleRatio: 0,
  salePrice: 0,
  image: {
    thumbnail: "tangtang/thumbnail.jpg",
    view: "tangtang/detail_view.jpg",
    banner: "tangtang/detail_banner.jpg",
    info: "tangtang/detail_info.jpg",
    alt: "풀무원 탱탱쫄면",
  },
  stock: 10,
};

const productSection = getNode(".product-detail");
const productTextSection = getNode(".product-detail-text");
const productDescriptionSection = getNode("#product-description");
const productDetailSection = getNode("#product-detail");
const eachPrice = getNode(".each-product-price");
const totalPrice = getNode(".total-price-number");

const priceToString = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const productImageTemplate = () => {
  const { image } = product;
  return `
  <img
    src="./assets/${image.view}"
    alt="${image.alt}"
    width="400px"
    height="500px"
  />  
  `;
};

const infoTextTemplate = () => {
  const { name, description, price, saleRatio, salePrice } = product;
  const priceTemplate = priceToString(price); //가격 표시 변경하기
  const salePriceTemplate = priceToString(salePrice); //가격 표시 변경하기
  return salePrice === 0
    ? `
  <span class="early-delivery">샛별배송</span>
      <h1 class="product-title">${name}</h1>
      <h2 class="product-sub-title">${description}</h2>
      <span class="product-price">${priceTemplate}<small>원</small></span>
      <p class="login-notice">로그인 후, 적립 혜택이 제공됩니다.</p>
      <div class="about-product">
        <dl>
          <dt>배송</dt>
          <dd>
            <p>샛별배송</p>
            <p class="sub-description">
              23시 전 주문 시 내일 아침 7시 전 도착<br />
              (대구 부산 울산 샛별배송 운영시간 별도 확인)
            </p>
          </dd>
        </dl>
        <dl>
          <dt>판매자</dt>
          <dd>
            <p>칼리</p>
          </dd>
        </dl>
        <dl>
          <dt>포장타임</dt>
          <dd>
            <p>상온(종이포장)</p>
            <p class="sub-description">
              택배배송은 에코 포장이 스티로폼으로 대체됩니다.
            </p>
          </dd>
        </dl>
        <dl>
          <dt>판매단위</dt>
          <dd>
            <p>1분</p>
          </dd>
        </dl>
        <dl>
          <dt>중량/용량</dt>
          <dd>
            <p>123*4봉</p>
          </dd>
        </dl>
        <dl>
          <dt>원산지</dt>
          <dd>
            <p>상세페이지 별도표기</p>
          </dd>
        </dl>
        <dl>
          <dt>알레르기 정보</dt>
          <dd>
            <p class="sub-description allergy-description">
              -대두, 밀, 쇠고기 함유
            </p>
            <p class="sub-description allergy-description">
              -계란, 우유, 메밀, 땅콩, 고등어, 게, 돼지고기, 새우, 복숭아,
              토마토, 아황산류, 호두, 잣, 닭고기, 오징어, 조개류(굴, 전복,
              홍합 포함)를 사용한 제품과 같은 제조시설에서 제조
            </p>
          </dd>
        </dl>
      </div>
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
    <div class="about-product">
      <dl>
        <dt>배송</dt>
        <dd>
          <p>샛별배송</p>
          <p class="sub-description">
            23시 전 주문 시 내일 아침 7시 전 도착<br />
            (대구 부산 울산 샛별배송 운영시간 별도 확인)
          </p>
        </dd>
      </dl>
      <dl>
        <dt>판매자</dt>
        <dd>
          <p>칼리</p>
        </dd>
      </dl>
      <dl>
        <dt>포장타임</dt>
        <dd>
          <p>상온(종이포장)</p>
          <p class="sub-description">
            택배배송은 에코 포장이 스티로폼으로 대체됩니다.
          </p>
        </dd>
      </dl>
      <dl>
        <dt>판매단위</dt>
        <dd>
          <p>1분</p>
        </dd>
      </dl>
      <dl>
        <dt>중량/용량</dt>
        <dd>
          <p>123*4봉</p>
        </dd>
      </dl>
      <dl>
        <dt>원산지</dt>
        <dd>
          <p>상세페이지 별도표기</p>
        </dd>
      </dl>
      <dl>
        <dt>알레르기 정보</dt>
        <dd>
          <p class="sub-description allergy-description">
            -대두, 밀, 쇠고기 함유
          </p>
          <p class="sub-description allergy-description">
            -계란, 우유, 메밀, 땅콩, 고등어, 게, 돼지고기, 새우, 복숭아,
            토마토, 아황산류, 호두, 잣, 닭고기, 오징어, 조개류(굴, 전복,
            홍합 포함)를 사용한 제품과 같은 제조시설에서 제조
          </p>
        </dd>
      </dl>
    </div>
  `;
};

const detailInfoTextTemplate = () => {
  const { name, description, image } = product;
  return `
          <img
            src="./assets/${image.banner}"
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

const detailInfoImageTemplate = () => {
  const { image } = product;
  return `
  <section>
  <h3 class="a11y-hidden">상품 영양 정보</h3>
  <img
    src="./assets/${image.info}"
    alt="${image.alt}"
    aria-describedby="product-health-info"
    width="1050px"
    height="1066px"
  />
</section>
`;
};

const renderPage = () => {
  // xhr or fetch로 데이터 가져오기
  // renderTemplate 함수 인자로 데이터 전달
  let imageTemplate = productImageTemplate();
  let textTemplate = infoTextTemplate();
  let productDescriptionTemplate = detailInfoTextTemplate();
  let productDeatilTemplate = detailInfoImageTemplate();
  let stringEachPrice = priceToString(product.price);

  insertFirst(productSection, imageTemplate);
  insertFirst(productTextSection, textTemplate);
  insertFirst(productDescriptionSection, productDescriptionTemplate);
  insertFirst(productDetailSection, productDeatilTemplate);

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

const onClickMinusHandler = () => {
  let quantity = Number(productQuantity.textContent);
  // 함수로 분리해보기
  let each = parseInt(eachPrice.textContent.split(",").join(""));
  let sum = parseInt(totalPrice.textContent.split(",").join(""));
  if (quantity <= 1) {
    return;
  }
  // 마이너스 버튼 비활성화 로직 다시 생각
  if (quantity <= 2) {
    attr(minusImg, "src", "./assets/icon/Minus.png");
  }
  productQuantity.textContent = quantity - 1;
  totalPrice.innerHTML = priceToString(sum - each) + "<small>원</small>";
};
const onClickPlusHandler = () => {
  attr(minusImg, "src", "./assets/icon/Minus_able.png");
  let quantity = Number(productQuantity.textContent);
  // 함수로 분리해보기
  let each = parseInt(eachPrice.textContent.split(",").join(""));
  let sum = parseInt(totalPrice.textContent.split(",").join(""));
  productQuantity.textContent = quantity + 1;
  totalPrice.innerHTML = priceToString(sum + each) + "<small>원</small>";
};

minusButton.addEventListener("click", onClickMinusHandler);
plusButton.addEventListener("click", onClickPlusHandler);
