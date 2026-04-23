import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// === PERFORMANCE: Use requestAnimationFrame for scroll ===
const navbar = document.querySelector('.navbar')
let ticking = false

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50)
      ticking = false
    })
    ticking = true
  }
}, { passive: true })

// === Mobile Menu Toggle ===
const menuBtn = document.querySelector('.mobile-menu-btn')
const navLinks = document.querySelector('.nav-links')

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open')
    menuBtn.classList.toggle('active')
  })

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open')
      menuBtn.classList.remove('active')
    })
  })
}

// === Theme Toggle with Persistence ===
const themeToggle = document.getElementById('themeToggle')
const root = document.documentElement

// Load saved theme or respect system preference
const savedTheme = localStorage.getItem('shubho-theme')
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme)
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.setAttribute('data-theme', 'dark')
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark'
    const newTheme = isDark ? 'light' : 'dark'
    root.setAttribute('data-theme', newTheme)
    localStorage.setItem('shubho-theme', newTheme)
  })
}

// === Hero Entrance — Butter Smooth ===
const heroTl = gsap.timeline({
  defaults: { ease: 'power3.out' }
})

heroTl
  .from('.hero-text h1', {
    y: 40,
    opacity: 0,
    duration: 1,
  })
  .from('.hero-description', {
    y: 25,
    opacity: 0,
    duration: 0.8,
  }, '-=0.6')
  .from('.hero-text .btn-order', {
    y: 20,
    opacity: 0,
    duration: 0.6,
  }, '-=0.5')
  .from('.hero-img-wrap', {
    scale: 0.92,
    opacity: 0,
    duration: 1.4,
    ease: 'power4.out',
  }, '-=1.2')

// === Scroll Reveals — GPU-Accelerated with Y-Only Transforms ===
// Product cards: staggered reveal
gsap.utils.toArray('.product-card').forEach((card, i) => {
  gsap.from(card, {
    y: 60,
    opacity: 0,
    duration: 0.7,
    delay: i * 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 90%',
      toggleActions: 'play none none none',
    }
  })
})

// Heritage sections: slide in from alternate sides
gsap.utils.toArray('.heritage').forEach((section, i) => {
  const text = section.querySelector('.heritage-text')
  const visual = section.querySelector('.hero-visual')

  if (text) {
    gsap.from(text, {
      x: i % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
      }
    })
  }

  if (visual) {
    gsap.from(visual, {
      x: i % 2 === 0 ? 50 : -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
      }
    })
  }
})

// CTA box: scale up reveal
gsap.from('.cta-box', {
  scale: 0.9,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.cta',
    start: 'top 85%',
  }
})
