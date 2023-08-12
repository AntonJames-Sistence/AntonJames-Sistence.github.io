document.addEventListener("DOMContentLoaded", function() {
    var scrollArrow = document.getElementById("scrollArrow");
  
    window.addEventListener("scroll", function() {
        var screenHeight = window.innerHeight;
        var scrollThreshold = screenHeight * 1.5;

        if (window.scrollY > scrollThreshold) {
            scrollArrow.style.opacity = "1";
        } else {
            scrollArrow.style.opacity = "0";
        }
    });
  
    scrollArrow.addEventListener("click", function() {
      scrollToTop();
    });
  
    function scrollToTop() {
      // Smooth scrolling animation
      var scrollStep = -window.scrollY / 40;
      var scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    }
  });
  