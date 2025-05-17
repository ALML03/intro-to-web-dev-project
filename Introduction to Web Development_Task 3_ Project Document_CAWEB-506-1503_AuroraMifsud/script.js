// home page

// JavaScript for enhanced functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize tooltip (if Bootstrap JS is loaded)
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Artwork Filtering and Sorting (Basic implementation)
    const sortButtons = document.querySelectorAll('.sort-option');
    const artworkContainer = document.getElementById('artwork-container');
    
    if (sortButtons.length > 0 && artworkContainer) {
        sortButtons.forEach(button => {
            button.addEventListener('click', function() {
                const sortType = this.getAttribute('data-sort');
                
                // Remove active class from all buttons
                sortButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get all artwork items
                const artworkItems = [].slice.call(artworkContainer.querySelectorAll('.col-lg-4'));
                
                // Sort items based on data attribute
                artworkItems.sort((a, b) => {
                    const aValue = parseFloat(a.getAttribute(`data-sort-${sortType}`));
                    const bValue = parseFloat(b.getAttribute(`data-sort-${sortType}`));
                    return bValue - aValue; // Descending order
                });
                
                // Reappend items to container in new order
                artworkItems.forEach(item => {
                    artworkContainer.appendChild(item);
                });
                
                // Simple animation
                artworkItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, index * 100);
                });
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Simple animation for artwork cards on scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.artwork-card, .artist-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.classList.add('animated');
            }
        });
    };
    
    // Call once to check initial state
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email === '') {
                showToast('Please enter your email address.');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            emailInput.value = '';
            showToast('Thank you for subscribing!', 'success');
        });
    }
    
    // Simple toast notification function
    function showToast(message, type = 'danger') {
        // Create toast container if doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toastEl = document.createElement('div');
        toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');
        
        // Create toast content
        toastEl.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        // Append toast to container
        toastContainer.appendChild(toastEl);
        
        // Initialize Bootstrap toast
        if (typeof bootstrap !== 'undefined') {
            const toast = new bootstrap.Toast(toastEl, {
                autohide: true,
                delay: 3000
            });
            toast.show();
        } else {
            // Fallback if Bootstrap JS is not available
            toastEl.style.display = 'block';
            setTimeout(() => {
                toastEl.remove();
            }, 3000);
        }
    }
    
    // Heart animation on artwork buttons
    const heartButtons = document.querySelectorAll('.artwork-action-btn .fa-heart');
    heartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle active class for color change
            this.classList.toggle('active');
            
            // Add pulse animation
            this.classList.add('pulse');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 600);
        });
    });
    
    // Add animation classes to featured sections
    const addSectionAnimations = function() {
        // Get all section headings
        const sectionHeadings = document.querySelectorAll('.section-title');
        
        // Add animation classes based on visibility
        sectionHeadings.forEach(heading => {
            const headingPosition = heading.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.1;
            
            if (headingPosition < screenPosition) {
                heading.classList.add('fade-in');
            }
        });
    };
    
    // Run animations on load and scroll
    addSectionAnimations();
    window.addEventListener('scroll', addSectionAnimations);
});