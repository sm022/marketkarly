import { xhrPromise } from '/client/lib/utils/xhr.js';
import CartItemDataClass from '/client/lib/data-class/cart-item.data-class.js';

import { getNode } from '/client/lib/dom/getNode.js';

class CartProcessClass {
  coldList = getNode('.cold-list').querySelector('.main-list');
  frozenList = getNode('.frozen-list').querySelector('.main-list');
  normalList = getNode('.normal-list').querySelector('.main-list');

  async loadFoodsFromApi() {
    const url = 'http://localhost:3000/products'; //api
    return xhrPromise({ url }).catch((err) => {
      console.log(err);
      return [];
    });
  }

  async loadFoods() {
    const foods = await this.loadFoodsFromApi();
    if (foods.length < 1) {
      alert('아이템을 가져오지 못했습니다. 서버 상태를 확인해주세요.');
    }

    return foods.map((food) => new CartItemDataClass(food));
  }

  async run() {
    const foods = await this.loadFoods();

    foods.map((food) => {
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
}

const cartProcessClass = new CartProcessClass();
await cartProcessClass.run();
