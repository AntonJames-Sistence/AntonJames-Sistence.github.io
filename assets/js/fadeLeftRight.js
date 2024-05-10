document.addEventListener("DOMContentLoaded", function() {
    const fadeSideElements = document.querySelectorAll('.fade-side');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.left = '0px';
                observer.unobserve(entry.target);
            }
        });
    });

    fadeSideElements.forEach(element => {
        observer.observe(element);
    });
});
