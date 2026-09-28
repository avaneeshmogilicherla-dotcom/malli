/* ============================================
   MALLI RESTAURANT — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ---------- Preloader ---------- */
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 1800);
  });

  // Fallback: hide preloader after 4s no matter what
  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 4000);

  /* ---------- Custom Cursor ---------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursorDot && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX - 4 + 'px';
      cursorDot.style.top = mouseY - 4 + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX - 20 + 'px';
      cursorRing.style.top = ringY - 20 + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .gallery-item, .room-dot, .menu-item');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });
  }

  /* ---------- Navigation Scroll Effect ---------- */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  /* ---------- Mobile Menu Toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ---------- Smooth Scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- Scroll Reveal Animations ---------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Stagger Reveal for Grid Items ---------- */
  const staggerItems = document.querySelectorAll('.stagger-item');
  
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1
  });

  staggerItems.forEach(el => staggerObserver.observe(el));

  /* ---------- Room Carousel & Video Sync ---------- */
  const roomTrack = document.querySelector('.rooms-track');
  const roomSlides = document.querySelectorAll('.room-slide');
  const roomDots = document.querySelectorAll('.room-dot');
  const roomVideos = document.querySelectorAll('.room-video');
  const prevBtn = document.querySelector('.rooms-prev');
  const nextBtn = document.querySelector('.rooms-next');
  let currentRoom = 0;
  const totalRooms = roomSlides.length;

  function syncRoomVideos() {
    roomVideos.forEach((vid, i) => {
      if (i === currentRoom) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }

  function goToRoom(index) {
    if (index < 0) index = totalRooms - 1;
    if (index >= totalRooms) index = 0;
    currentRoom = index;
    
    if (roomTrack) {
      roomTrack.style.transform = `translateX(-${currentRoom * 100}%)`;
    }
    
    roomDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentRoom);
    });

    syncRoomVideos();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToRoom(currentRoom - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToRoom(currentRoom + 1));
  
  roomDots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToRoom(i));
  });

  // Sound toggle button for each room video
  document.querySelectorAll('.room-slide').forEach(slide => {
    const video = slide.querySelector('.room-video');
    const soundBtn = slide.querySelector('.room-sound-btn');
    if (!video || !soundBtn) return;

    const iconMuted = soundBtn.querySelector('.sound-icon-muted');
    const iconUnmuted = soundBtn.querySelector('.sound-icon-unmuted');

    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      if (!video.muted) {
        // Mute other videos if unmuting this one
        roomVideos.forEach(v => {
          if (v !== video) {
            v.muted = true;
            const otherBtn = v.closest('.room-slide')?.querySelector('.room-sound-btn');
            if (otherBtn) {
              const m = otherBtn.querySelector('.sound-icon-muted');
              const u = otherBtn.querySelector('.sound-icon-unmuted');
              if (m) m.style.display = 'block';
              if (u) u.style.display = 'none';
            }
          }
        });
      }
      if (iconMuted) iconMuted.style.display = video.muted ? 'block' : 'none';
      if (iconUnmuted) iconUnmuted.style.display = video.muted ? 'none' : 'block';
    });
  });

  // Auto-advance rooms every 7 seconds
  let roomInterval = setInterval(() => goToRoom(currentRoom + 1), 7000);

  // Pause on hover
  const roomsSection = document.querySelector('.rooms');
  if (roomsSection) {
    roomsSection.addEventListener('mouseenter', () => clearInterval(roomInterval));
    roomsSection.addEventListener('mouseleave', () => {
      roomInterval = setInterval(() => goToRoom(currentRoom + 1), 7000);
    });

    // Pause videos when rooms section is out of viewport to save system resources
    if ('IntersectionObserver' in window) {
      const roomsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeVid = roomVideos[currentRoom];
            if (activeVid) activeVid.play().catch(() => {});
          } else {
            roomVideos.forEach(v => v.pause());
          }
        });
      }, { threshold: 0.2 });
      roomsObserver.observe(roomsSection);
    }
  }

  /* ---------- Touch/Swipe Support for Carousel ---------- */
  let touchStartX = 0;
  let touchEndX = 0;

  if (roomTrack) {
    roomTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    roomTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToRoom(currentRoom + 1);
        else goToRoom(currentRoom - 1);
      }
    }, { passive: true });
  }

  /* ---------- Menu Category Tabs ---------- */
  const menuCatBtns = document.querySelectorAll('.menu-cat-btn');
  const menuContents = document.querySelectorAll('.menu-content');

  menuCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      menuCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      menuContents.forEach(content => {
        content.style.display = content.dataset.category === category ? 'grid' : 'none';
      });
    });
  });

  /* ---------- Testimonial Slider ---------- */
  const testimonials = document.querySelectorAll('.testimonial-slide');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.style.opacity = i === index ? '1' : '0';
      t.style.position = i === index ? 'relative' : 'absolute';
      t.style.visibility = i === index ? 'visible' : 'hidden';
    });
  }

  if (testimonials.length > 0) {
    showTestimonial(0);
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll('.counter');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target);
        const suffix = entry.target.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease out quad
          const eased = 1 - (1 - progress) * (1 - progress);
          const current = Math.floor(eased * target);
          
          entry.target.textContent = current + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* ---------- Hero Particles ---------- */
  const particlesContainer = document.querySelector('.hero-particles');
  
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
      particlesContainer.appendChild(particle);
    }
  }

  /* ---------- Parallax Effect ---------- */
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = el.dataset.parallax || 0.3;
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (visible) {
        el.style.transform = `translateY(${scrollY * speed}px)`;
      }
    });
  });

  /* ---------- Form Validation ---------- */
  const reservationForm = document.querySelector('.reservation-form');
  
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const inputs = reservationForm.querySelectorAll('[required]');
      let valid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = '#9B3D47';
          setTimeout(() => {
            input.style.borderColor = '';
          }, 2000);
        }
      });

      if (valid) {
        // Success feedback
        const submitBtn = reservationForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'RESERVATION RECEIVED';
        submitBtn.style.background = '#4a7c59';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          reservationForm.reset();
        }, 3000);
      }
    });
  }

  /* ---------- Interactive 3D Cursor Tilt (From Team Lead Reference) ---------- */
  const hero3d = document.getElementById('hero3d');
  const hero3dContent = document.getElementById('hero3dContent');
  if (hero3d && hero3dContent) {
    hero3d.addEventListener('mousemove', (e) => {
      const rect = hero3d.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      hero3dContent.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    hero3d.addEventListener('mouseleave', () => {
      hero3dContent.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  // Room card 3D tilt following cursor
  document.querySelectorAll('.room-slide, .room-visual, .menu-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  });

  /* ---------- Keyboard Navigation ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close mobile menu
      if (navLinks && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    }
  });

});

