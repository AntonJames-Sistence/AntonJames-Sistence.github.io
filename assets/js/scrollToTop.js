document.addEventListener("DOMContentLoaded", function () {
  let scrollArrow = document.getElementById("scrollArrow");

  window.addEventListener("scroll", function () {
    let screenHeight = window.innerHeight;
    let scrollThreshold = screenHeight * 1;

    if (window.scrollY > scrollThreshold) {
      scrollArrow.style.opacity = "1";
    } else {
      scrollArrow.style.opacity = "0";
    }
  });

  scrollArrow.addEventListener("click", function () {
    scrollToTop();
  });

  function scrollToTop() {
    // Smooth scrolling animation
    let scrollStep = -window.scrollY / 60;
    let scrollInterval = setInterval(function () {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }
});
