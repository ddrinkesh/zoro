document.addEventListener('DOMContentLoaded', function() {
  const swiperElements = document.querySelectorAll('.swiper');
  
  swiperElements.forEach(container => {
    // Check if element has dynamic options from Liquid
    if (container.hasAttribute('data-slider-options')) {
      try {
        const rawOptions = container.getAttribute('data-slider-options');
        const options = JSON.parse(rawOptions);
        new Swiper(container, options);
        return; // Skip the custom hero slider logic below
      } catch (e) {
        console.error('Error parsing Swiper data-slider-options', e);
      }
    }

    // Fallback logic for custom hero slider (or other sliders without data attributes)
    const wrapper = container.parentElement;
    if (!wrapper || !wrapper.classList.contains('custom-hero-slider')) return;
    
    const isAutoplay = wrapper.dataset.autoplay === 'true';
    const speed = wrapper.dataset.speed ? parseInt(wrapper.dataset.speed) * 1000 : 5000;

    const swiperOptions = {
      loop: true,
      speed: 600, // transition speed
      grabCursor: true,
      navigation: {
        nextEl: container.querySelector('.swiper-button-next'),
        prevEl: container.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: container.querySelector('.swiper-pagination'),
        clickable: true,
      },
    };

    if (isAutoplay) {
      swiperOptions.autoplay = {
        delay: speed,
        disableOnInteraction: false,
      };
    }

    new Swiper(container, swiperOptions);
  });
});
