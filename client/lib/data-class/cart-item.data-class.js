import { checkImagePath } from '../constant.js';

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
  isSelect;
  checkElement;

  constructor(args) {
    const { id, type, name, description, price, salePrice, saleRatio, image, stock } = args;
    this.id = id;
    this.name = name;
    this.description = description;
    if (!this.storeType.includes(type)) {
      alert('올바르지 않은 타입의 아이템이 추가됩니다. 확인 후 추가해주세요.');
    }
    this.type = type;
    this.price = price;
    this.salePrice = salePrice;
    this.saleRatio = saleRatio;
    this.stock = stock;
    this.amount = 1;
    this.image = image;
    this.isSelect = true;
  }

  getId() {
    return this.id;
  }

  getPrice() {
    return { price: this.price, salePrice: this.salePrice };
  }

  getIsSelect() {
    return this.isSelect;
  }

  /**
   * 아이템의 check 엘리먼트 가져오기
   * 이미 가져온 경우 저장된 엘리먼트 반환
   */
  getCheckElement() {
    if (this.checkElement) {
      return this.checkElement;
    }

    this.checkElement = document.getElementById(`check-${this.getId()}`);
    return this.checkElement;
  }

  //선택 되는 것만 결제 처리
  toggleSelect() {
    // 체크가 활성화 된 것만 가져와야한다
    // 활성화 된 것 의 값을 받아와야한다.
    const check = document.getElementById(`check-${this.id}`);
    if (!check || check.getAttribute('src') === checkImagePath(!this.isSelect)) {
      return;
    }

    check.setAttribute('src', checkImagePath(!this.isSelect));
    this.isSelect = this.isSelect ? false : true;
  }

  /**
   * 아이템의 delete 엘리먼트 가져오기
   */
  getDeleteElement() {
    const deleteBtn = getNode('.delete-button');
    console.log(deleteBtn);
  }

  select() {
    const check = document.getElementById(`check-${this.id}`);
    if (!check || check.getAttribute('src') === checkImagePath(true)) {
      this.isSelect = true;
      return;
    }

    check.setAttribute('src', checkImagePath(true));
    this.isSelect = true;
  }

  unSelect() {
    const check = document.getElementById(`check-${this.id}`);
    if (!check || check.getAttribute('src') === checkImagePath(false)) {
      return;
    }

    check.setAttribute('src', checkImagePath(false));
    this.isSelect = false;
  }

  toElement() {
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.id = this.id;

    const priceInfo = +this.saleRatio > 0 ? `<span class="original-price">${this.price} 원</span>` : '';
    const discountPriceInfo = `<span class="discount-price">${
      this.saleRatio === 0 ? this.price : this.salePrice
    } 원</span>`;

    listItem.innerHTML = `
                  <div class="item-left">
                    <!-- 상품 이름과 사진 체크유무 -->
                    <div class="list-pr-info">
                      <img id="check-${this.id}"  class="is-checked-false" src="${checkImagePath(
      this.isSelect
    )}" alt="전채선택">
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
                      ${discountPriceInfo}
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
