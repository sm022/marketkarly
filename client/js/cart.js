import { getNode, getNodes } from '../lib/dom/getNode.js';

const checkedFalse = getNodes('.is-checked-false');

function changeCheckImg() {
  for (let i = 0; i < checkedFalse.length; i++) {
    checkedFalse[i].addEventListener('click', checked);
  }
}
function checked() {
  if (checkedFalse.src.match('./assets/icon/isChecked=false.png')) {
    checkedFalse.src = './assets/icon/isChecked=true.png';
  } else {
    checkedFalse.src = './assets/icon/isChecked=false.png';
  }
}
