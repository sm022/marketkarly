
let popupWrapper = document.querySelector(".popup-wrapper");

export function setCookie(name, value, expiredays) {
  let todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays);
  document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';'
}

export function getCookie() {
  const cookiedata = document.cookie;

  if (cookiedata.indexOf('popup') < 0){
    popupWrapper.classList.add('flex');
    popupWrapper.classList.remove('hidden');
  } else {
    popupWrapper.classList.add('hidden');
    popupWrapper.classList.remove('flex');
  }
}