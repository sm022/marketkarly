const checkedFalse = document.querySelector('#check-false');

const toggleCheckImg = checkedFalse.addEventListener('click', () => {
  document.querySelector('img').setAttribute('src', './assets/icon/isChecked=true.png');
});
