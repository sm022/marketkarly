export default class CartItemDataClass {
  storeType = ['FROZEN', 'COLD', 'NORMAL'];
  id;
  type;
  name;
  description;
  price;
  salePrice;
  saleRatio;
  stock;
  amount;
  image;
  isSelect = true;

  constructor(args) {
    const { id, type, name, description, price, salePrice, saleRatio, image, stock } = args;
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.price = price;
    this.salePrice = salePrice;
    this.saleRatio = saleRatio;
    this.stock = stock;
    this.amount = 1;
    this.image = image;
  }

  getPrice() {
    return { price: this.price, salePrice: this.salePrice };
  }

  select() {
    this.isSelect = true;

    // 돔 가져와서 on 처리
  }

  unSelect() {
    this.isSelect = false;

    // 돔 가져와서 off 처리
  }

  toElement() {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.id = this.id;
    const priceInfo = +this.saleRatio > 0 ? `<span class="original-price">${this.price} 원</span>` : '';
    listItem.innerHTML = `
                  <div class="item-left">
                    <!-- 상품 이름과 사진 체크유무 -->
                    <div class="list-pr-info">
                      <img id="check-false" class="is-checked-false" src="./assets/icon/isChecked=false.png" alt="전채선택">
                      <a href="/" class="list-image">
                        <img src="${this.image.thumbnail}" alt="상품이미지">
                      </a>
                      <div class="product-name">
                        <span> ${this.name} </span>
                      </div>
                    </div>
                  </div>
                  <div class="item-right">
                    <!-- 상품 수량변경 -->
                    <div class="product-count">
                      <button type="button" value="-" aria-label="수량내리기" class="product-minus-btn">
                        <img src="./assets/icon/Minus=true.png" alt="수량내리기">
                      </button>
                      <div class="count" id="count-result">${this.amount}</div>
                      <button type="button" value="+" aria-label="수량올리기" class="product-plus-btn">
                        <img src="./assets/icon/Plus=false.png" alt="수량올리기">
                      </button>
                    </div>
                    <!-- 상품 가격 표시 -->
                    <div class="product-price">
                      <span class="discount-price">${this.salePrice} 원</span>
                      ${priceInfo}
                    </div>
                    <!-- 상품 삭제 버튼 -->
                    <button class="delete-button">
                      <img src="./assets/icon/Cancel.png" alt="상품 삭제">
                    </button>
                  </div>`;
    return listItem;
  }
}

// setStoreType(type) {
//   if (!this.storeType.includes(type)) {
//     throw new Error('올바르지 않은 보관 타입입니다.');
//   }

//   this.type = type;
// }
