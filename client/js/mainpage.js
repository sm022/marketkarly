


const swiper = new Swiper('.swiper-E', {
  autoplay:true,
  loop:true,
  slidesPerView:'auto',
  speed:2000,
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