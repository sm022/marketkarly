import { getNode } from "../lib/dom/getNode.js";
import { insertFirst, insertLast } from "../lib/dom/insert.js";
// 임시데이터
// 할인 하는 상품
const product = {
  id: "product-rksk",
  name: "[대구 반할만떡] 유부호만두",
  description: "유부로 속을 든든히 채운 군만두",
  price: 6900,
  saleRatio: 0.24,
  salePrice: 5244,
  image: {
    thumbnail: "ubuho/thumbnail.jpg",
    view: "ubuho/detail_view.jpg",
    banner: "ubuho/detail_banner.jpg",
    info: "ubuho/detail_info.jpg",
    alt: "유부호 만두",
  },
  stock: 3,
};
// 할인 안하는 상품
// const product = {
//   id: "product-ekfk",
//   name: "[풀무원] 탱탱쫄면 (4개입)",
//   description: "튀기지 않아 부드럽고 매콤한",
//   price: 4980,
//   saleRatio: 0,
//   salePrice: 0,
//   image: {
//     thumbnail: "tangtang/thumbnail.jpg",
//     view: "tangtang/detail_view.jpg",
//     banner: "tangtang/detail_banner.jpg",
//     info: "tangtang/detail_info.jpg",
//     alt: "풀무원 탱탱쫄면",
//   },
//   stock: 10,
// };

const productSection = getNode(".product-detail");
const productTextSection = getNode(".product-detail-text");

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
  const priceTemplate = price; //가격 표시 변경하기
  const salePriceTemplate = salePrice; //가격 표시 변경하기
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
const renderPage = () => {
  // xhr or fetch로 데이터 가져오기
  // renderTemplate 함수 인자로 데이터 전달
  let imageTemplate = productImageTemplate();
  let textTemplate = infoTextTemplate();
  insertFirst(productSection, imageTemplate);
  insertFirst(productTextSection, textTemplate);
};
window.onload = renderPage;
