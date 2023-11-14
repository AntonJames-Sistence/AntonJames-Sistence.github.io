document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.getElementById("imageContainer");
  let scrollAmount = 329; // Adjust this value as needed
  let scrolling = false;

  const scrollLeftButton = document.getElementById("scrollLeft");
  const scrollRightButton = document.getElementById("scrollRight");

  function smoothScroll(left) {
    const startTime = performance.now();
    const startScroll = imageContainer.scrollLeft;
    const endScroll = left;

    function step(currentTime) {
      if (!scrolling) return;

      const elapsedTime = currentTime - startTime;
      if (elapsedTime < 500) {
        // Adjust the duration as needed
        imageContainer.scrollLeft = easeInOutQuad(
          elapsedTime,
          startScroll,
          endScroll - startScroll,
          500,
        );
        requestAnimationFrame(step);
      } else {
        imageContainer.scrollLeft = endScroll;
        scrolling = false;
      }
    }

    requestAnimationFrame(step);
  }

  scrollLeftButton.addEventListener("click", function () {
    if (!scrolling) {
      scrolling = true;
      smoothScroll(Math.max(imageContainer.scrollLeft - scrollAmount, 0));
    }
  });

  scrollRightButton.addEventListener("click", function () {
    if (!scrolling) {
      scrolling = true;
      smoothScroll(
        Math.min(
          imageContainer.scrollLeft + scrollAmount,
          imageContainer.scrollWidth - imageContainer.clientWidth,
        ),
      );
    }
  });
});

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}
