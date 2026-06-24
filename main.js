// ==========================================
// InfluenceMe - Main Application Logic
// ==========================================

console.log("InfluenceMe: main.js loaded");

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Initialize Animate On Scroll (AOS) with error prevention
  try {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
      });
      console.log("InfluenceMe: AOS initialized successfully");
    } else {
      console.warn("InfluenceMe: AOS library is not loaded on the window");
    }
  } catch (error) {
    console.error("InfluenceMe: Error during AOS initialization:", error);
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 3. Mobile Navigation Menu Toggle (Conditional Checks)
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (menuToggle && navMenu) {
    const menuIcon = menuToggle.querySelector('i');
    
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      if (menuIcon) {
        if (navMenu.classList.contains('active')) {
          menuIcon.className = 'fa-solid fa-xmark';
        } else {
          menuIcon.className = 'fa-solid fa-bars-staggered';
        }
      }
    });

    // Close mobile menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (menuIcon) {
          menuIcon.className = 'fa-solid fa-bars-staggered';
        }
      });
    });
  }

  // 4. Services Section Inline Accordion Toggle (Fully Clickable Cards & Toggling Support)
  const accordionCards = document.querySelectorAll('.service-accordion-card');
  console.log("InfluenceMe: Found accordion cards count =", accordionCards.length);

  if (accordionCards.length > 0) {
    accordionCards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        console.log(`InfluenceMe: Clicked card index ${index + 1}`);

        // Check if the card is already active
        const isActive = card.classList.contains('active');

        // Deactivate all cards
        accordionCards.forEach(c => {
          c.classList.remove('active');
        });

        // Toggle active state: if the clicked card was not active, open it now
        if (!isActive) {
          card.classList.add('active');
          console.log(`InfluenceMe: Card index ${index + 1} expanded`);
        } else {
          console.log(`InfluenceMe: Card index ${index + 1} collapsed`);
        }
      });
    });
  }

  // 5. Success Modal Close Handlers (Shared between Contact and Creator forms)
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (successModal) {
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
      });
    }

    // Close modal when clicking on background backdrop
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // 6. Contact Form Submission (Mock handling)
  const contactForm = document.getElementById('contactForm');
  if (contactForm && successModal) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log("InfluenceMe: Contact Form submitted!");
      
      // Show success modal
      successModal.classList.add('active');
      
      // Reset the form
      contactForm.reset();
    });
  }

  // 7. Creator Application Form Interactive Logic
  const creatorForm = document.getElementById('creatorForm');
  const pitchText = document.getElementById('pitchText');
  const charCount = document.getElementById('charCount');
  const uploadZone = document.getElementById('uploadZone');
  const mediaKitInput = document.getElementById('mediaKit');
  const uploadLabel = document.getElementById('uploadLabel');
  const customSelects = document.querySelectorAll('.custom-select');

  // A. Custom Select Dropdowns
  customSelects.forEach(select => {
    const trigger = select.querySelector('.select-trigger');
    const options = select.querySelectorAll('.select-option');
    const selectValue = select.querySelector('.select-value');
    const hiddenInput = select.querySelector('input[type="hidden"]');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other open selects
        customSelects.forEach(otherSelect => {
          if (otherSelect !== select) {
            otherSelect.classList.remove('active');
          }
        });
        select.classList.toggle('active');
      });
      
      // Accessibility: support space/enter click
      trigger.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          trigger.click();
        }
      });
    }

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = option.getAttribute('data-value');
        
        if (selectValue) selectValue.textContent = val;
        if (hiddenInput) hiddenInput.value = val;
        
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        select.classList.remove('active');
      });
    });
  });

  // Close select dropdowns when clicking outside
  document.addEventListener('click', () => {
    customSelects.forEach(select => {
      select.classList.remove('active');
    });
  });

  // B. Drag-and-Drop File Upload
  if (uploadZone && mediaKitInput) {
    // Trigger file dialog on click
    uploadZone.addEventListener('click', () => {
      mediaKitInput.click();
    });

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      uploadZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    // Highlight drop zone
    ['dragenter', 'dragover'].forEach(eventName => {
      uploadZone.addEventListener(eventName, () => {
        uploadZone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      uploadZone.addEventListener(eventName, () => {
        uploadZone.classList.remove('dragover');
      }, false);
    });

    // Handle dropped files
    uploadZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        mediaKitInput.files = files;
        updateFileName(files[0].name);
      }
    });

    // Handle file dialog change
    mediaKitInput.addEventListener('change', () => {
      const files = mediaKitInput.files;
      if (files.length > 0) {
        updateFileName(files[0].name);
      }
    });

    function updateFileName(name) {
      if (uploadLabel) {
        uploadLabel.innerHTML = `Selected File: <strong>${name}</strong> (Click to change)`;
      }
    }
  }

  // C. Character Count Validation
  if (pitchText && charCount) {
    pitchText.addEventListener('input', () => {
      const len = pitchText.value.length;
      charCount.textContent = `${len} characters (min 50 characters required)`;
      if (len < 50) {
        charCount.classList.add('error');
      } else {
        charCount.classList.remove('error');
      }
    });
  }

  // D. Creator Onboarding Form Submission
  if (creatorForm) {
    creatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Final validation check for textarea character length
      const len = pitchText ? pitchText.value.length : 0;
      if (len < 50) {
        if (pitchText) pitchText.focus();
        if (charCount) charCount.classList.add('error');
        return;
      }
      
      // Show success modal
      if (successModal) {
        successModal.classList.add('active');
      }
      
      // Reset form fields
      creatorForm.reset();
      
      // Reset custom selects
      customSelects.forEach(select => {
        const selectValue = select.querySelector('.select-value');
        const hiddenInput = select.querySelector('input[type="hidden"]');
        if (select.id === 'nicheSelect') {
          if (selectValue) selectValue.textContent = 'Select a niche...';
        } else if (select.id === 'audienceSelect') {
          if (selectValue) selectValue.textContent = 'Select range...';
        }
        if (hiddenInput) hiddenInput.value = '';
        select.querySelectorAll('.select-option').forEach(opt => opt.classList.remove('selected'));
      });
      
      // Reset file upload zone label
      if (uploadLabel) {
        uploadLabel.innerHTML = 'Drop your media kit here or <span>browse</span>';
      }
      
      // Reset char count label
      if (charCount) {
        charCount.textContent = '0 characters (min 50 characters required)';
        charCount.classList.remove('error');
      }
    });
  }

  // 8. Hero Section Carousel Implementation
  const carouselWrapper = document.querySelector('.hero-carousel-wrapper');
  const track = document.getElementById('heroCarouselTrack');
  const indicatorsContainer = document.getElementById('carouselIndicators');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (carouselWrapper && track && indicatorsContainer) {
    const originalCards = Array.from(track.children);
    const originalCount = originalCards.length;
    const cloneStartCount = 5; // Clone all 5 items to prepend
    const cloneEndCount = 5;   // Clone all 5 items to append

    // Clone cards for seamless infinite scroll
    const lastClones = originalCards.slice(-cloneStartCount).map(card => card.cloneNode(true));
    const firstClones = originalCards.slice(0, cloneEndCount).map(card => card.cloneNode(true));

    // Add cloned helper classes to target styling adjustments if needed
    lastClones.forEach(clone => clone.classList.add('cloned-card'));
    firstClones.forEach(clone => clone.classList.add('cloned-card'));

    // Insert prepended and appended clones in correct sequence
    const originalFirstCard = track.firstChild;
    lastClones.forEach(clone => track.insertBefore(clone, originalFirstCard));
    firstClones.forEach(clone => track.appendChild(clone));

    const allCards = Array.from(track.children);
    let currentIndex = cloneStartCount; // Start at the first original card index
    let isTransitioning = false;
    let autoplayTimer = null;

    function getGap() {
      const style = window.getComputedStyle(track);
      const gapStr = style.gap || '32px';
      return parseFloat(gapStr) || 32;
    }

    function updateCarousel(animate = true) {
      if (animate) {
        track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
      } else {
        track.style.transition = 'none';
      }

      const cardWidth = allCards[0].getBoundingClientRect().width;
      const gap = getGap();
      const viewportWidth = carouselWrapper.querySelector('.hero-carousel-viewport').clientWidth;
      
      // Calculate translation offset to mathematically center the active card
      const translateX = -currentIndex * (cardWidth + gap) + (viewportWidth - cardWidth) / 2;
      track.style.transform = `translateX(${translateX}px)`;

      // Identify active centered card relative to visible window
      allCards.forEach((card, idx) => {
        if (idx === currentIndex) {
          card.classList.add('active-slide');
        } else {
          card.classList.remove('active-slide');
        }
      });

      // Update dot indicators highlight
      const activeOriginalIndex = (currentIndex - cloneStartCount + originalCount) % originalCount;
      const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
      dots.forEach((dot, idx) => {
        if (idx === activeOriginalIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function moveToSlide(targetIndex) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex = targetIndex;
      updateCarousel(true);
    }

    function nextSlide() {
      moveToSlide(currentIndex + 1);
    }

    function prevSlide() {
      moveToSlide(currentIndex - 1);
    }

    // Handle seamless infinite snapping after transition animation finishes
    track.addEventListener('transitionend', () => {
      isTransitioning = false;
      
      // Snap from end clone to start original
      if (currentIndex >= originalCount + cloneStartCount) {
        currentIndex = cloneStartCount;
        updateCarousel(false);
      }
      // Snap from start clone to end original
      else if (currentIndex < cloneStartCount) {
        currentIndex = originalCount + cloneStartCount - 1;
        updateCarousel(false);
      }
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    indicatorsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.indicator-dot');
      if (!dot) return;
      
      const targetOriginalIndex = parseInt(dot.getAttribute('data-index'), 10);
      moveToSlide(targetOriginalIndex + cloneStartCount);
      resetAutoplay();
    });

    function startAutoplay() {
      if (autoplayTimer) return;
      autoplayTimer = setInterval(nextSlide, 3500);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Autoplay pauses when hovering on desktop/tap on mobile
    carouselWrapper.addEventListener('mouseenter', stopAutoplay);
    carouselWrapper.addEventListener('mouseleave', startAutoplay);
    carouselWrapper.addEventListener('touchstart', stopAutoplay, { passive: true });
    carouselWrapper.addEventListener('touchend', startAutoplay, { passive: true });

    // Handle window resize dynamically to adjust translation
    window.addEventListener('resize', () => {
      updateCarousel(false);
    });

    // Touch Swipe Gestures support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    }, { passive: true });

    function handleGesture() {
      const swipeThreshold = 55;
      if (touchStartX - touchEndX > swipeThreshold) {
        nextSlide();
        resetAutoplay();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        prevSlide();
        resetAutoplay();
      }
    }

    // Give DOM a small layout paint delay to ensure dimensions are loaded correctly before initializing
    setTimeout(() => {
      updateCarousel(false);
      startAutoplay();
    }, 150);
  }

  // 9. Brand Campaign Dropdown Interactivity
  const dropdownContainers = document.querySelectorAll('.brand-dropdown-container');

  dropdownContainers.forEach(container => {
    const trigger = container.querySelector('.brand-dropdown-trigger');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const isActive = container.classList.contains('active');
        
        // Close other dropdowns
        dropdownContainers.forEach(otherContainer => {
          otherContainer.classList.remove('active');
        });

        if (!isActive) {
          container.classList.add('active');
        }
      });
    }
  });

  // Close open dropdowns if user clicks outside
  document.addEventListener('click', () => {
    dropdownContainers.forEach(container => {
      container.classList.remove('active');
    });
  });


  // 11. Ensure social media and external links open in a new tab
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.startsWith('http://') || href.startsWith('https://') || href.includes('instagram.com'))) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

});
// ==========================================
// InfluenceMe - Main Application Logic End
// ==========================================
