import { xhrPromise } from '/client/lib/utils/xhr.js';
import CartItemDataClass from '/client/lib/data-class/cart-item.data-class.js';
import { checkImagePath } from '../lib/constant.js';
import { getNode, getNodes } from '/client/lib/dom/getNode.js';
import { css } from '../lib/dom/css.js';
import { loadStorage, saveStorage } from '../lib/utils/storage.js';

class CartProcessClass {
  isSelectAll = true;

  getTotalPrice(foods, deliveryPrice) {
    // foods.reduce((a, b) => {
    //   console.log(a, b);
    //   console.log(a.getPrice().price, b.getPrice().price);
    // });
  }

  // 각 아이템 가져오기

  getFrozenItems() {
    return this.foods.filter((food) => food.type === 'FROZEN');
  }

  getColdItems() {
    return this.foods.filter((food) => food.type === 'COLD');
  }

  getNormalItems() {
    return this.foods.filter((food) => food.type === 'NORMAL');
  }

  async setDefaultFoods() {
    const foods = await this.getFoodsFromApi();
    this.defaultFoods = foods.map((food) => new CartItemDataClass(food));
  }

  /**
   * API에서 음식 데이터를 가져오는 메서드
   */
  async getFoodsFromApi() {
    const url = 'http://localhost:3000/products';

    //API요청을 위해 xhrPromise 사용
    return xhrPromise({ url }).catch((err) => []);
  }

  /**
   * 데이터를 가져오고 가져온 데이터를 데이터 클래스로 변환
   */
  async loadFoods() {
    let foods = await loadStorage('foods');
    if (!foods || foods.length < 1) {
      foods = await this.getFoodsFromApi();
      if (foods.length < 1) {
        // 데이터가 없는 경우
        alert('아이템을 가져오지 못했습니다. 서버 상태를 확인해주세요.');
      }
    }

    console.log(foods);
    await saveStorage('foods', foods);
    this.foods = foods.map((food) => new CartItemDataClass(food));
  }

  async forceLoadFoods() {
    const foods = await this.getFoodsFromApi();
    if (foods.length < 1) {
      // 데이터가 없는 경우
      alert('아이템을 가져오지 못했습니다. 서버 상태를 확인해주세요.');
    }

    await saveStorage('foods', foods);
    this.foods = foods.map((food) => new CartItemDataClass(food));
  }

  /**
   * 총 결제 가격
   */

  calculateResultPricesToScreen() {
    let totalPrice = 0;
    let totalSalePrice = 0;
    const priceResult = this.foods.forEach((food) => {
      const { price, salePrice } = food.getPrice();
      totalPrice += price;
      totalSalePrice += salePrice;
    });

    const shipmentPrice = 3000;
    this.totalPrice.children[1].childNodes[0].nodeValue = totalPrice;
    this.totalSalePrice.children[1].childNodes[0].nodeValue = totalSalePrice;
    this.totalPaymentPrice.children[1].childNodes[0].nodeValue = totalPrice - totalSalePrice + shipmentPrice;
  }

  /**
   * 각 선택버튼에 이벤트 추가
   */
  applySelectEvent() {
    this.foods.forEach((food) => food.applySelectEvent());
  }

  /**
   * 전채선택 이벤트 적용
   */
  applyToggleSelectAllEvent() {
    //모든 전채선택 버튼을 동일한 동작 적용
    for (let i = 0; i < this.checkAlls.length; i++) {
      this.checkAlls[i].addEventListener('click', () => {
        if (this.isSelectAll) {
          this.checkAlls[0].setAttribute('src', checkImagePath(false));
          this.checkAlls[1].setAttribute('src', checkImagePath(false));
        } else {
          this.checkAlls[0].setAttribute('src', checkImagePath(true));
          this.checkAlls[1].setAttribute('src', checkImagePath(true));
        }

        this.foods.forEach((food) => (this.isSelectAll ? food.unSelect() : food.select()));
        this.isSelectAll = this.isSelectAll ? false : true;
      });
    }
  }

  /**
   * 선택 삭제 했을때 화면에서 지우기
   */
  async applyDeleteEvent() {
    this.foods.forEach((food) => {
      food.getDeleteElement().addEventListener('click', async () => {
        food.removeElement();
        this.foods = this.foods.filter((f) => f.id !== food.id);
        await saveStorage('foods', this.foods);
      });
    });
  }

  /**
   * 아코디언 메뉴
   */
  listItemAccordion() {
    document.querySelectorAll('.click-down').forEach((btn) => {
      btn.addEventListener('click', () => {
        switch (btn.id) {
          case 'frozen-down-btn':
            const frozenEls = this.getFrozenItems().map((item) => document.getElementById(item.id));
            frozenEls.forEach((item) => this.toggleDisplay(item));
            break;

          case 'cold-down-btn':
            const coldEls = this.getColdItems().map((item) => document.getElementById(item.id));
            coldEls.forEach((item) => this.toggleDisplay(item));
            break;

          case 'normal-down-btn':
            const normalEls = this.getNormalItems().map((item) => document.getElementById(item.id));
            normalEls.forEach((item) => this.toggleDisplay(item));
            break;
        }

        this.rotateDownImage(getNode(`#${btn.id} > img`));
      });
    });

    // const list = document.querySelectorAll('.main-list');
    // const buttonsImgs = document.querySelectorAll('.click-down-img');
    // buttons.forEach(() =>
    //   addEventListener('click', () => {
    //     if (list.style.display === 'none') {
    //       list.style.display = 'block';
    //     } else {
    //       list.style.display = 'none';
    //       // buttonsImgs.style.transform('rotate(180deg)');
    //     }
    //   })
    // );
  }

  rotateDownImage(img) {
    if (img.style.transform === 'rotate(180deg)') {
      img.style.transform = 'rotate(360deg)';
    } else {
      img.style.transform = 'rotate(180deg)';
    }
  }

  toggleDisplay(el) {
    if (el.style.display === 'none') {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  }

  /**
   * 아이템 수량 추가 감소 이벤트 적용
   */
  applyModifyFoodAmount() {
    this.foods.forEach((food) => {
      food.applyPlusAmount();
      food.applyMinusAmount();
    });
  }

  /**
   * 주문하기 버튼 클릭했을 때 표시
   */

  orderButtonShowAlert() {
    const orderBtn = getNode('.cradit-order');
    orderBtn.addEventListener('click', () => {
      alert('등록되지 않은 기능입니다');
    });
  }
  /**
   * 배송지 변경 이벤트
   */
  locationShowAlert() {
    const locationChangeBtn = getNode('.address li:nth-child(3) > button ');
    locationChangeBtn.addEventListener('click', () => {
      alert('등록되지 않은 기능입니다.');
    });
  }
  /**
   * 화면에 음식 정보데이터 추가
   */
  addFoodsToScreen() {
    this.foods.map((food) => {
      if (document.getElementById(food.id)) {
        return;
      }

      switch (food.type) {
        case 'COLD':
          this.coldList.appendChild(food.toElement());
          break;

        case 'FROZEN':
          this.frozenList.appendChild(food.toElement());
          break;

        case 'NORMAL':
          this.normalList.appendChild(food.toElement());
          break;

        default:
          alert('올바르지 않은 타입의 식품입니다.', food.name);
          return;
      }
    });
  }

  loadElements() {
    this.checkAlls = document.getElementsByClassName('check-all');
    this.coldList = getNode('.cold-list').querySelector('.main-list');
    this.frozenList = getNode('.frozen-list').querySelector('.main-list');
    this.normalList = getNode('.normal-list').querySelector('.main-list');
    const totalPriceElements = getNodes('.pay-item');
    this.totalPrice = totalPriceElements[0];
    this.totalSalePrice = totalPriceElements[1];
    this.totalPaymentPrice = getNode('.total-up');
  }

  /**
   * 최초실행 메서드
   */
  async run() {
    await this.loadFoods();
    if (new URL(window.location.href).pathname === '/client/cart.html') {
      this.setDefaultFoods();
      this.loadElements();
      this.addFoodsToScreen();
      this.applySelectEvent();
      this.applyToggleSelectAllEvent();
      await this.applyDeleteEvent();
      this.listItemAccordion();
      this.applyModifyFoodAmount();
      this.orderButtonShowAlert();
      this.locationShowAlert();
      this.calculateResultPricesToScreen();
    }
  }

  /**
   * food.id를 입력으로 받아서 수량(amount)을 증가시키고 수량을 반환
   */
  async addFoodToCart(foodId) {
    if (typeof foodId !== 'string') {
      alert('올바른 푸드 ID가 아닙니다. 문자열을 입력해주세요.');
      return;
    }

    let food = this.foods.find((food) => food.id === foodId);
    if (!food) {
      const newFood = this.defaultFoods.find((food) => food.id === foodId);
      this.foods.push(newFood);
      this.addFoodsToScreen();
      newFood.applyPlusAmount();
      newFood.applyMinusAmount();
      newFood.applySelectEvent();

      await saveStorage('foods', this.foods);
      return newFood.amount;
    }

    food.plusAmount();

    await saveStorage('foods', food);
    return food.amount;
  }

  getFoodsAmount() {
    return this.foods.length;
  }

  async removeFood(foodId) {
    if (typeof foodId !== 'string') {
      alert('올바른 푸드 ID가 아닙니다. 문자열을 입력해주세요.');
      return false;
    }

    const food = this.foods.find((food) => food.id === foodId);
    if (!food) {
      alert('foodId에 해당하는 식품을 찾을 수 없습니다. foodId를 다시 확인해주세요.');
    }

    this.foods = this.foods.filter((food) => food.id !== foodId);
    await saveStorage('foods', this.foods);
    food.removeElement();
    return true;
  }
}

const cartProcessClass = new CartProcessClass();
await cartProcessClass.run();
window.cartProcessClass = cartProcessClass;

//데이터 추가 할떄
//await cartProcessClass.addFoodToCart('food.id')
//await cartProcessClass.addFoodToCart('product-ckzk') -> 이미 있으면 수량이 추가된다

//데이터 리셋
//await cartProcessClass.forceLoadFoods()

//데이터 삭제
//await cartProcessClass.removeFood('product-akqk') -> 삭제됨
