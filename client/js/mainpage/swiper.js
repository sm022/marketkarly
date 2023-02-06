
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
  slidesPerView: 4,
  slidesperGroup: 4,
  spaceBetween: 2,
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
  slidesPerView: 4,
  slidesperGroup: 4,
  spaceBetween: 2,
  loop:true,
  speed:400,
  parallax: true,
  navigation: {
    nextEl: '.sale-next-button',
    prevEl: '.sale-prev-button',
  },
});

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