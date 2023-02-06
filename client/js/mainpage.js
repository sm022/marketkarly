
const swiper_E = new Swiper('.swiper-E', {
  autoplay : {  
    delay : 3000, 
    disableOnInteraction : false,  
  },
  loop:true,
  slidesPerView:'auto',
  speed:400,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    },
  navigation: {
    nextEl: '.event-button-next',
    prevEl: '.event-button-prev',
  },
});


const swiper_R = new Swiper('.swiper-R', {
  loopFillGroupWithBlank: 'auto',
  spaceBetween: 18,
  loop:true,
  speed:400,
  parallax: true,
  navigation: {
    nextEl: '.recommend-next-button',
    prevEl: '.recommend-prev-button',
  },
});

const swiper_S = new Swiper('.swiper-S', {
  loopFillGroupWithBlank: 'auto',
  spaceBetween: 18,
  loop:true,
  speed:400,
  parallax: true,
  navigation: {
    nextEl: '.sale-next-button',
    prevEl: '.sale-prev-button',
  },
});