


// 팝업창 닫기
let body = document.querySelector("body");
let popup = document.querySelector(".popup");
let popupCloseOneDayBtn = document.querySelector(".close-oneday");
let popupCloseBtn = document.querySelector(".popup-close");
// let popUpBox = document.querySelector(".popup-box");
let isClose = document.querySelector(".is-open");

//하루동안 닫기
function onPopupCloseOneDayHandler(e) {
  e.preventDefault();
  popup.parentNode.removeChild(popup);
}

//하루동안 닫기 버튼을 눌렀을 때 그 날짜엔 팝업창이 뜨지 않게 하는 것 구현 예정


//팝업창 닫기
function onPopupCloseHandler(e) {
  e.preventDefault();
  popup.parentNode.removeChild(popup);
}

popupCloseOneDayBtn.addEventListener("click", onPopupCloseOneDayHandler);
popupCloseBtn.addEventListener("click", onPopupCloseHandler);
