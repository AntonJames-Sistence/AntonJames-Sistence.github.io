$(document).ready(function () {
  $("#imageContainer").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: true,
    cssEase: "linear",
    waitForAnimate: true,
    pauseOnFocus: false,
    pauseOnHover: true,
    prevArrow: '<button type="button" class="slick-prev">Previous</button>',
    nextArrow: '<button type="button" class="slick-next">Next</button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
          speed: 1000,
          swipe: true,
          waitForAnimate: false,
        },
      },
    ],
  });
});
