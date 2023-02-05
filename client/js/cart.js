import { xhrPromise } from '/client/lib/utils/xhr.js';
import CartItemDataClass from '/client/lib/data-class/cart-item.data-class.js';

import { getNode } from '/client/lib/dom/getNode.js';

class CartProcessClass {
  checkAlls = document.getElementsByClassName('check-all');
  coldList = getNode('.cold-list').querySelector('.main-list');
  frozenList = getNode('.frozen-list').querySelector('.main-list');
  normalList = getNode('.normal-list').querySelector('.main-list');
  isSelectAll = true;

  getTotalPrice(foods, deliveryPrice) {
    // foods.reduce((a, b) => {
    //   console.log(a, b);
    //   console.log(a.getPrice().price, b.getPrice().price);
    // });
  }

  /**
   * API에서 음식 데이터를 가져오는 함수
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
    const foods = await this.getFoodsFromApi();
    if (foods.length < 1) {
      // 데이터가 없는 경우0
      alert('아이템을 가져오지 못했습니다. 서버 상태를 확인해주세요.');
    }

    this.foods = foods.map((food) => new CartItemDataClass(food));
  }

  /**
   * 각 선택버튼에 이벤트 추가
   */
  applySelectEvent() {
    this.foods.forEach((food) => {
      //하나의 엘리먼트에 이미지 src만 바꿔가면서 사용
      //각 체크 엘리먼트에 토글되는 이벤트 적용함
      food.getCheckElement().addEventListener('click', () => food.toggleSelect());
    });
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
   * 화면에 음식 정보데이터 추가
   */
  addFoodsToScreen() {
    this.foods.map((food) => {
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

  /**
   * 최초실행 메서드
   */
  async run() {
    await this.loadFoods();
    this.addFoodsToScreen();
    this.applySelectEvent();
    this.applyToggleSelectAllEvent();

    // this.getTotalPrice(this.foods, 1000);
  }
}

const cartProcessClass = new CartProcessClass();
await cartProcessClass.run();
