import { renderItem, renderSaleItem, getNode, setComma } from "../../lib/index.js";



//추천 상품 목록
const recommendItemContainer = getNode(".recommend-item-container");

//특가 상품 목록
const saleItemContainer = getNode(".sale-item-container");


async function renderingItemList() {

  //data.json에서 가져와서 컴마처리까지 한 데이터
  const resultData = setComma;

  try {

    resultData.forEach((data) => {

      //할인율이 없을때
      if (data.saleRatio === 0) {
        renderItem(recommendItemContainer, data);
        renderItem(saleItemContainer, data);
      
      //할인 상품일 때
      } else if (data.saleRatio !== 0) {
        renderSaleItem(recommendItemContainer, data);
        renderSaleItem(saleItemContainer, data);
      }
    });
    
  } catch (err) {
    console.log("상품리스트 불러오기를 실패하였습니다.");
  }
}

//동적으로 렌더링하기
renderingItemList();