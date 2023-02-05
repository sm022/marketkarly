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

const renderPage = () => {
  // xhr or fetch로 데이터 가져오기
  // renderTemplate 함수 인자로 데이터 전달
  let imageTemplate = productImageTemplate();
  insertFirst(productSection, imageTemplate);
};
window.onload = renderPage;
