import { xhrPromise } from '/client/lib/utils/xhr.js';
import CartItemDataClass from '/client/lib/data-class/cart-item.data-class.js';
import { checkImagePath } from '../lib/constant.js';
import { getNode, getNodes } from '/client/lib/dom/getNode.js';
import { css } from '../lib/dom/css.js';
import { loadStorage, saveStorage } from '../lib/utils/storage.js';

class CartProcessClass {
  isSelectAll = true;
  itemLength = 1;

  getTotalPrice(foods, deliveryPrice) {
    // foods.reduce((a, b) => {
    //   console.log(a, b);
    //   console.log(a.getPrice().price, b.getPrice().price);
    // });
  }

  getFrozenItems() {
    return this.foods.filter((food) => food.type === 'FROZEN');
  }

  getColdItems() {
    return this.foods.filter((food) => food.type === 'COLD');
  }

  getNormalItems() {
    return this.foods.filter((food) => food.type === 'NORMAL');
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
    if (!foods) {
      foods = await this.getFoodsFromApi();
      if (foods.length < 1) {
        // 데이터가 없는 경우
        alert('아이템을 가져오지 못했습니다. 서버 상태를 확인해주세요.');
      }
    }

    await saveStorage('foods', foods);
    this.foods = foods.map((food) => new CartItemDataClass(food));
  }

  /**
   * 각 선택버튼에 이벤트 추가
   */
  applySelectEvent() {
    this.foods.forEach((food) => {
      //하나의 엘리먼트에 이미지 src만 바꿔가면서 사용
      //각 체크 엘리먼트에 토글되는 이벤트 적용함
      food.getCheckElement().addEventListener('click', () => {
        food.toggleSelect();
        console.log('hello2');
      });
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
        console.log('hello1');

        this.foods.forEach((food) => (this.isSelectAll ? food.unSelect() : food.select()));
        this.isSelectAll = this.isSelectAll ? false : true;
      });
    }
  }

  /**
   * 선택 삭제 했을때 화면에서 지우기
   */
  singleDeleteEvent() {
    this.foods.forEach((food) => {
      const deleteBtn = food.getNodes('.delete-button');

      food.addEventListener('click', () => {
        console.log('hi');
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
            console.log(coldEls);
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
   * 아이템 리스트에 수량 추가 감소
   */

  countFoods() {
    this.foods.forEach((food) => {
      //하나의 엘리먼트에 이미지 src만 바꿔가면서 사용
      //각 체크 엘리먼트에 토글되는 이벤트 적용함
      const amountElement = food.getAmountElement();
      const minus = amountElement.querySelector('.product-minus-btn');
      const text = amountElement.querySelector('.count');
      const plus = amountElement.querySelector('.product-plus-btn');

      plus.addEventListener('click', () => {
        if (food.amount < 3) {
          food.amount += 1;
          text.innerText = food.amount;
        }
      });

      minus.addEventListener('click', () => {
        if (food.amount > 0) {
          food.amount -= 1;
          text.innerText = food.amount;
        }
      });
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
  }

  /**
   * 최초실행 메서드
   */
  async run() {
    await this.loadFoods();
    if (new URL(window.location.href).pathname === '/client/cart.html') {
      console.log('카트 페이지에서만 실행');
      this.loadElements();
      this.addFoodsToScreen();
      this.applySelectEvent();
      this.applyToggleSelectAllEvent();
      this.listItemAccordion();
      this.countFoods();
      this.orderButtonShowAlert();
      this.locationShowAlert();
      // this.getTotalPrice(this.foods, 1000);
    }
  }

  addFood() {
    this.itemLength += 1;

    // 로컬 스토리지에 데이터 추가
  }
}

const cartProcessClass = new CartProcessClass();
await cartProcessClass.run();
window.cartProcessClass = cartProcessClass;
