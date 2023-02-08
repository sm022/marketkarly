
import { getNode, setComma } from '../../lib/index.js';


const swiper_RC = new Swiper('.swiper-RC', {
  direction: 'vertical',
  spaceBetween: 4,
  speed:200,
  parallax: true,
  navigation: {
    nextEl: '.recent-button-next',
    prevEl: '.recent-button-prev',
  },
});




const itemCard = getNode(".item-card");

const itemList = document.querySelectorAll('.item-card');


if (localStorage.recentItems === undefined) {
  localStorage.setItem('recentItems', JSON.stringify([]))
};

let recentItems = JSON.parse(localStorage.getItem('recentItems'));



//recentItems.unshift 함수
function addRecentItems(id, thumbnail, alt) {

  recentItems.unshift({id: id, thumbnail: thumbnail, alt: alt });


}


//id만 가지고 recentItems에 경로와 alt를 추가
async function getRecentItemData() {

  
  //데이터 가져오기
  const resultData = setComma;
  
  try {
    
    itemList.forEach((data) => {
      data.addEventListener("click", function() {
        
        resultData.forEach((itemData) => {
          
          
          //선택한 상품의 id값이 data.json에 있을 경우
          //해당 상품의 이미지 경로, alt를 최근 본 상품에 추가
          if (data.id === itemData.id) {
        
        addRecentItems(data.id, itemData.image.thumbnail, itemData.image.alt);
      }
    })

    //로컬 스토리지에 저장하기
    localStorage.setItem('recentItems', JSON.stringify(recentItems))

  })
})


  } catch (err) {
    console.log("최근 본 상품 이미지 경로 error");
  }



}
  
//클릭시 해당 상품을 recentItem에 추가하고, 그 recentItem을 로컬 스토리지에 저장하는 함수
getRecentItemData();


const recentWrapper = getNode('.recent-swiper-wrapper')

//로컬스토리지에서 최근 본 상품을 가져옴.
const items = JSON.parse(localStorage.getItem('recentItems'))

//데이터 렌더링
items.forEach(function (value) {

  let template = /*html */`<a href="http://localhost:5500/product-detail.html" class="swiper-slide recent-thumbnail">
  <img src="${value.thumbnail}" alt="${value.alt}" width="40px" height="51.41px" />
</a>`;
  

  recentWrapper.insertAdjacentHTML('beforeend', template)

})

