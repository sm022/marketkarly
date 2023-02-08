import { checkImagePath } from '../constant.js';
import { getNode } from '../dom/getNode.js';

export default class CartItemDataClass {
  storeType = ['FROZEN', 'COLD', 'NORMAL'];

  constructor(args) {
    const { id, type, name, description, price, salePrice, saleRatio, image, stock } = args;
    this.id = id;
    this.name = name;
    this.description = description;
    if (!this.storeType.includes(type)) {
      console.log('올바르지 않은 타입의 아이템이 추가됩니다. 확인 후 추가해주세요.');
    }
    this.type = type;
    this.price = price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    this.salePrice = salePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    this.saleRatio = saleRatio;
    this.stock = stock;
    this.amount = 1;
    this.image = image;
    this.isSelect = true;
  }

  getId() {
    return this.id;
  }

  getElement() {
    return this.element ? this.element : this.toElement();
  }

  getPrice() {
    return { price: +this.price.replace(/,/, ''), salePrice: +this.salePrice.replace(/,/, '') };
  }

  getIsSelect() {
    return this.isSelect;
  }

  getType() {
    return this.type;
  }

  /**
   * amount 엘리먼트 가져오기
   */
  getAmountElement() {
    if (this.amountElement) {
      return this.amountElement;
    }

    this.amountElement = document.getElementById(`${this.id}-count-amount`);
    return this.amountElement;
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

  /**
   * 아이템의 delete 엘리먼트 가져오기
   */
  getDeleteElement() {
    if (this.deleteElement) {
      return this.deleteElement;
    }

    this.deleteElement = document.getElementById(`${this.id}-delete-button`);
    return this.deleteElement;
  }

  getPlusElement() {
    if (this.plusElement) {
      return this.plusElement;
    }

    this.plusElement = document.getElementById(`${this.id}-plus-button`);
    return this.plusElement;
  }

  getMinusElement() {
    if (this.minusElement) {
      return this.minusElement;
    }

    this.minusElement = document.getElementById(`${this.id}-minus-button`);
    return this.minusElement;
  }

  minusAmount() {
    const text = this.getAmountElement().querySelector('.count');
    if (this.amount > 1) {
      this.amount -= 1;
      text.innerText = this.amount;
    }
  }

  plusAmount() {
    const text = this.getAmountElement().querySelector('.count');
    if (this.amount < 3) {
      this.amount += 1;
      text.innerText = this.amount;
    }
  }

  applySelectEvent() {
    this.getCheckElement().addEventListener('click', () => this.toggleSelect());
  }

  applyMinusAmount() {
    this.getMinusElement().addEventListener('click', () => this.minusAmount());
  }

  applyPlusAmount() {
    this.getPlusElement().addEventListener('click', () => this.plusAmount());
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

  removeElement() {
    this.getElement().remove();
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
    <img id="check-${this.id}"  class="is-checked-false" src="${checkImagePath(this.isSelect)}" alt="전채선택">
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
      <div class="product-count" id="${this.id}-count-amount">
      <button type="button" aria-label="수량내리기" id="${this.id}-minus-button">
      <img src="./assets/icon/Minus=true.png" alt="수량내리기">
      </button>
      <span class="count">${this.amount}</span>
      <button type="button" aria-label="수량올리기" id="${this.id}-plus-button">
      <img src="./assets/icon/Plus=false.png" alt="수량올리기">
      </button>
      </div>
      <!-- 상품 가격 표시 -->
      <div class="product-price">
      ${discountPriceInfo}
      ${priceInfo}  
      </div>
      <!-- 상품 삭제 버튼 -->
      <button id="${this.id}-delete-button">
      <img src="./assets/icon/Cancel.png" alt="상품 삭제">
      </button>
      </div>`;

    this.element = listItem;
    return listItem;
  }
}
