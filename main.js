/**
 * 🌿 WENDY'S GARDEN - MAIN JS (FINAL CLEAN VERSION)
 * Includes:
 * - Hero animation (session-based)
 * - Navbar scroll
 * - Shop filtering (search + price)
 * - Cart system
 * - Page transitions
 * - Burger menu
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     1. ELEMENTS
  ========================= */
  const navbar = document.querySelector('.navbar');
  const heroElements = document.querySelectorAll('.reveal, .hero-content .reveal');
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const searchInput = document.getElementById('plantSearch');
  const priceSlider = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const products = Array.from(document.querySelectorAll('.product-card'));

  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.menu-overlay');

  const cartIcon = document.getElementById('cartIcon');
  const cartDropdown = document.getElementById('cartDropdown');
  const cartList = document.getElementById('cartItems');
  const cartCount = document.querySelector('.cart-count');
  const totalLabel = document.getElementById('totalPrice');

  let cart = [];

  /* =========================
     2. HERO ANIMATION
  ========================= */
  const hasSeenHero = sessionStorage.getItem('hasSeenHero');

  if (hasSeenHero) {
    heroElements.forEach(el => {
      el.classList.add('active');
      el.style.transition = "none";
    });
  } else {
    setTimeout(() => {
      heroElements.forEach((el, i) => {
        setTimeout(() => el.classList.add('active'), i * 200);
      });
      sessionStorage.setItem('hasSeenHero', 'true');
    }, 300);
  }

  /* =========================
     3. NAVBAR SCROLL
  ========================= */
  const handleScroll = () => {
    if (window.scrollY > 50) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* =========================
     4. SCROLL REVEAL
  ========================= */
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  scrollElements.forEach(el => observer.observe(el));

  /* =========================
     5. SHOP FILTER
  ========================= */
  const updateShop = () => {
    const query = searchInput?.value.toLowerCase() || '';
    const maxPrice = parseInt(priceSlider?.value) || 1000;

    if (priceValue) priceValue.textContent = `P${maxPrice}`;

    products.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const price = parseInt(card.dataset.price);

      if (name.includes(query) && price <= maxPrice) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  };

  searchInput?.addEventListener('input', updateShop);
  priceSlider?.addEventListener('input', updateShop);

  document.getElementById('resetFilters')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (priceSlider) priceSlider.value = 1000;
    updateShop();
  });

  /* =========================
     6. CART SYSTEM
  ========================= */
  document.querySelectorAll('.btn-cart-add').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');

      const item = {
        name: card.dataset.name,
        price: parseInt(card.dataset.price)
      };

      cart.push(item);
      updateCartUI();

      // Button feedback
      button.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-shopping-cart"></i>';
      }, 1000);
    });
  });

  const updateCartUI = () => {
    if (!cartList || !cartCount || !totalLabel) return;

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      total += item.price;

      const li = document.createElement('li');
      li.style.cssText = "display:flex; justify-content:space-between; margin-bottom:10px;";

      li.innerHTML = `
        <span>${item.name}</span>
        <span>P${item.price}</span>
      `;

      cartList.appendChild(li);
    });

    cartCount.textContent = cart.length;
    totalLabel.textContent = total;
  };

  cartIcon?.addEventListener('click', () => {
    cartDropdown?.classList.toggle('active');
  });

  /* =========================
     7. PAGE TRANSITION
  ========================= */
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (!href || href.startsWith('#') || href.startsWith('http')) return;

      e.preventDefault();

      document.body.style.transition = "opacity 0.5s ease, filter 0.5s ease";
      document.body.style.opacity = "0";
      document.body.style.filter = "blur(8px)";

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });

  /* =========================
     8. BURGER MENU
  ========================= */
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      navLinks.classList.toggle('active');
      overlay?.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    overlay?.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  }

  /* =========================
     9. AUTO-MUTE VIDEOS
  ========================= */
  document.querySelectorAll("video").forEach(video => {
    video.muted = true;
  });

  console.log("🌿 Wendy's Garden: FULL SYSTEM READY 🚀");
});
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.menu-overlay');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');    // matches CSS
    navLinks.classList.toggle('active');  // slide in menu
    overlay.classList.toggle('active');
    document.body.classList.toggle('menu-open'); // optional
});

// Close menu when clicking overlay or links
overlay.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});
// =========================
// BURGER MENU & OVERLAY
// =========================
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.menu-overlay');

  if (!burger || !navLinks || !overlay) return;

  // Toggle menu
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');          // animate burger
    navLinks.classList.toggle('active');        // slide menu
    overlay.classList.toggle('active');         // show overlay
    document.body.classList.toggle('menu-open'); // prevent scroll if needed
  });

  // Close menu when clicking overlay
  overlay.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  });

  // Close menu when clicking any link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
});
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
});