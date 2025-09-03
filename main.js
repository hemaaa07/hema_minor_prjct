import './style.css';
import $ from 'jquery';

// Wait for DOM to be ready
$(document).ready(function() {
  
  // Navigation functionality
  const navbar = $('#navbar');
  const navToggle = $('#nav-toggle');
  const navMenu = $('#nav-menu');
  const navLinks = $('.nav-link');
  
  // Mobile menu toggle
  navToggle.on('click', function() {
    $(this).toggleClass('active');
    navMenu.toggleClass('active');
  });
  
  // Close mobile menu when clicking on nav links
  navLinks.on('click', function() {
    navToggle.removeClass('active');
    navMenu.removeClass('active');
  });
  
  // Smooth scrolling for navigation links
  navLinks.on('click', function(e) {
    e.preventDefault();
    const targetId = $(this).attr('href');
    const targetSection = $(targetId);
    
    if (targetSection.length) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - 80
      }, 800);
    }
  });
  
  // Navbar scroll effect
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
      navbar.addClass('scrolled');
    } else {
      navbar.removeClass('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
  });
  
  // Update active navigation link based on scroll position
  function updateActiveNavLink() {
    const scrollPos = $(window).scrollTop() + 100;
    
    $('section[id]').each(function() {
      const sectionTop = $(this).offset().top;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const sectionId = $(this).attr('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navLinks.removeClass('active');
        $(`.nav-link[href="#${sectionId}"]`).addClass('active');
      }
    });
  }
  
  // Animate skill bars when they come into view
  function animateSkillBars() {
    $('.skill-progress').each(function() {
      const skillBar = $(this);
      const skillPercentage = skillBar.data('width');
      const skillTop = skillBar.offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();
      
      if (windowBottom > skillTop && !skillBar.hasClass('animated')) {
        skillBar.addClass('animated');
        skillBar.animate({ width: skillPercentage + '%' }, 2000);
      }
    });
  }
  
  // Portfolio filtering
  $('.filter-btn').on('click', function() {
    const filter = $(this).data('filter');
    
    // Update active filter button
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    
    // Filter portfolio items
    $('.portfolio-item').each(function() {
      const portfolioItem = $(this);
      const category = portfolioItem.data('category');
      
      if (filter === 'all' || category === filter) {
        portfolioItem.removeClass('hidden');
      } else {
        portfolioItem.addClass('hidden');
      }
    });
  });
  
  // Contact form submission
  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      subject: $('#subject').val(),
      message: $('#message').val()
    };
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Simulate form submission
    const submitBtn = $(this).find('button[type="submit"]');
    const originalText = submitBtn.text();
    
    submitBtn.text('Sending...').prop('disabled', true);
    
    setTimeout(function() {
      submitBtn.text('Message Sent!').css('background', 'var(--success-500)');
      $('#contact-form')[0].reset();
      
      setTimeout(function() {
        submitBtn.text(originalText).css('background', '').prop('disabled', false);
      }, 2000);
    }, 1000);
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).addClass('fade-in-up');
        
        // Trigger skill bar animations when skills section is visible
        if ($(entry.target).hasClass('skills')) {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);
  
  // Observe sections for animations
  $('section').each(function() {
    observer.observe(this);
  });
  
  // Initialize skill bars animation on scroll
  $(window).on('scroll', animateSkillBars);
  
  // Parallax effect for hero section
  $(window).on('scroll', function() {
    const scrolled = $(window).scrollTop();
    const parallaxSpeed = 0.5;
    
    $('.hero').css('transform', `translateY(${scrolled * parallaxSpeed}px)`);
  });
  
  // Smooth reveal animations for elements
  $('.about-stats .stat').each(function(index) {
    $(this).css('animation-delay', `${index * 0.2}s`);
  });
  
  // Initialize page
  updateActiveNavLink();
  
  // Add loading effect
  $('body').addClass('fade-in');
  
  // Portfolio item hover effects
  $('.portfolio-item').on('mouseenter', function() {
    $(this).find('img').css('transform', 'scale(1.1)');
  }).on('mouseleave', function() {
    $(this).find('img').css('transform', 'scale(1)');
  });
  
});

// Add CSS for body fade-in effect
const style = document.createElement('style');
style.textContent = `
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  body.fade-in {
    opacity: 1;
  }
`;
document.head.appendChild(style);