
import { setCookie, getCookie } from './cookie.js';

// 팝업창 닫기
let popupWrapper = document.querySelector(".popup-wrapper");


const onPopupClose = (target) => {
  if (target.id === 'close-oneday') {
    setCookie('popup', 1, 1);
  }
  
  popupWrapper.classList.remove('flex');
  popupWrapper.classList.add('hidden');

};


popupWrapper.onclick = (e) => {
  const target = e.target;
  const condition = target.tagName === 'BUTTON' || target.classList.contains('popup-wrapper');
  
  if (!condition) return;
  
  onPopupClose(target);

};


getCookie();
