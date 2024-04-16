$(document).ready(function(){
    $(window).scroll(function(){
        // Check if top recommendation is in viewport
        if(isElementInViewport($('.fade-left'))){
            $('.fade-left').animate({
                opacity: 1,
                left: '0'
            }, 1000);
        }

        // Check if bottom recommendation is in viewport
        if(isElementInViewport($('.fade-right'))){
            $('.fade-right').animate({
                opacity: 1,
                left: '0'
            }, 1000);
        }
    });
});

// Function to check if element is in viewport
function isElementInViewport(el) {
    var rect = el[0].getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= $(window).height() &&
        rect.right <= $(window).width()
    );
}
