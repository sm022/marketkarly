
import { parse } from "../utils/index.js";


//데이터 가져와서 parse처리
let response = await parse.get("http://localhost:3000/products");


//parse처리한 데이터만 저장
let itemData = response.data;


//금액은 콤마처리해서 내보내기
export const setComma = itemData.map((item) => {
  return {
    ...item,
    salePrice: item.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    price: item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  };
});
