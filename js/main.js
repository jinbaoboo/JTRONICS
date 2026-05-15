document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  document.querySelectorAll('.partner-logo-img').forEach((image) => {
    image.addEventListener('error', () => {
      image.closest('.partner-card')?.classList.add('is-logo-missing');
    });

    if (image.complete && image.naturalWidth === 0) {
      image.closest('.partner-card')?.classList.add('is-logo-missing');
    }
  });

  document.querySelectorAll('.epson-products-image').forEach((image) => {
    image.addEventListener('error', () => {
      image.closest('.epson-products-visual')?.classList.add('is-image-missing');
    });

    if (image.complete && image.naturalWidth === 0) {
      image.closest('.epson-products-visual')?.classList.add('is-image-missing');
    }
  });

  document.querySelectorAll('.aura-product-image').forEach((image) => {
    image.addEventListener('error', () => {
      image.closest('.aura-product-visual')?.classList.add('is-image-missing');
    });

    if (image.complete && image.naturalWidth === 0) {
      image.closest('.aura-product-visual')?.classList.add('is-image-missing');
    }
  });

  document.querySelectorAll('.gmsl-product-image').forEach((image) => {
    image.addEventListener('error', () => {
      image.closest('.gmsl-product-visual')?.classList.add('is-image-missing');
    });

    if (image.complete && image.naturalWidth === 0) {
      image.closest('.gmsl-product-visual')?.classList.add('is-image-missing');
    }
  });

  document.querySelectorAll('.location-map-image').forEach((image) => {
    image.addEventListener('error', () => {
      image.closest('.location-map')?.classList.add('is-image-missing');
    });

    if (image.complete && image.naturalWidth === 0) {
      image.closest('.location-map')?.classList.add('is-image-missing');
    }
  });

  document.querySelectorAll('.naver-map-open').forEach((mapButton) => {
    mapButton.addEventListener('click', () => {
      const mapUrl = mapButton.dataset.mapUrl;

      if (mapUrl && window.confirm('네이버지도로 보시겠습니까?')) {
        window.location.href = mapUrl;
      }
    });
  });

  const naverMapElement = document.getElementById('naver-map');

  if (naverMapElement) {
    if (window.naver?.maps) {
      const lat = Number(naverMapElement.dataset.lat);
      const lng = Number(naverMapElement.dataset.lng);
      const title = naverMapElement.dataset.title || '라이프오피스텔';
      const position = new window.naver.maps.LatLng(lat, lng);
      const map = new window.naver.maps.Map(naverMapElement, {
        center: position,
        zoom: 17,
        minZoom: 14,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });
      const marker = new window.naver.maps.Marker({
        position,
        map,
        title,
      });
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div class="naver-info-window"><strong>${title}</strong><span>서울특별시 영등포구 63로 40</span></div>`,
      });

      infoWindow.open(map, marker);
      naverMapElement.closest('.location-map')?.classList.add('is-map-ready');
    } else {
      naverMapElement.closest('.location-map')?.classList.add('is-map-error');
    }
  }

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.home-carousel-slide'));
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const currentDisplay = carousel.querySelector('[data-carousel-current]');
    const totalDisplay = carousel.querySelector('[data-carousel-total]');
    let currentIndex = 0;
    let timerId;

    if (slides.length === 0) {
      return;
    }

    if (totalDisplay) {
      totalDisplay.textContent = String(slides.length);
    }

    const showSlide = (nextIndex) => {
      currentIndex = (nextIndex + slides.length) % slides.length;

      slides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === currentIndex);
      });

      if (currentDisplay) {
        currentDisplay.textContent = String(currentIndex + 1);
      }
    };

    const startAutoPlay = () => {
      window.clearInterval(timerId);
      timerId = window.setInterval(() => {
        showSlide(currentIndex + 1);
      }, 3000);
    };

    prevButton?.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoPlay();
    });

    nextButton?.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoPlay();
    });

    carousel.addEventListener('mouseenter', () => window.clearInterval(timerId));
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('focusin', () => window.clearInterval(timerId));
    carousel.addEventListener('focusout', startAutoPlay);

    showSlide(0);
    startAutoPlay();
  });

  if (!header || !menuToggle || !navMenu) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove('is-menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '메뉴 열기');
  };

  const openMenu = () => {
    header.classList.add('is-menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', '메뉴 닫기');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.contains('is-menu-open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});
