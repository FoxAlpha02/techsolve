/**
 * Main JavaScript File
 * Tech Training Institute Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    initMobileNav();
    
    // Hero Slider
    initSlider();
    
    // Testimonial Slider
    initTestimonialSlider();
    
    // Counter Animation for Stats
    initCounterAnimation();
    
    // Gallery functionality
    initGallery();
    
    // Course Search functionality
    initCourseSearch();
    
    // FAQ Accordion
    initFaqAccordion();
    
    // Contact Form Validation
    initContactForm();
    
    // Back to Top Button
    initBackToTop();
    
    // Newsletter Form Submission
    initNewsletterForm();

    // Initialize course enrollment modal functionality (handles "Enrol Now" clicks)
    initCourseEnrollment();

    // Initialize Top Bar features
    initTopBar();

    // Initialize main menu navigation (filtering and scrolling)
    initMenuNavigation();
});

// Modern website interactions and effects

// Cursor effects
const createCustomCursor = () => {
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let cursorVisible = true;
    let cursorEnlarged = false;

    document.addEventListener('mousemove', (e) => {
        if (cursorVisible) {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.16,
                ease: 'power3.out'
            });
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        }
    });

    // Hover effect for links and buttons
    const handleMouseEnter = () => {
        if (!cursorEnlarged) {
            cursorEnlarged = true;
            gsap.to(cursor, {
                scale: 2,
                duration: 0.2
            });
            gsap.to(cursorDot, {
                scale: 0.5,
                duration: 0.2
            });
        }
    };

    const handleMouseLeave = () => {
        if (cursorEnlarged) {
            cursorEnlarged = false;
            gsap.to(cursor, {
                scale: 1,
                duration: 0.2
            });
            gsap.to(cursorDot, {
                scale: 1,
                duration: 0.2
            });
        }
    };

    document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
    });
};

// Magnetic buttons effect
const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            gsap.to(button, {
                x: (x - rect.width / 2) / rect.width * 20,
                y: (y - rect.height / 2) / rect.height * 20,
                duration: 0.3,
                ease: 'power3.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
};

// Modern image reveal effect
const initImageReveal = () => {
    const images = document.querySelectorAll('.reveal-image');
    
    images.forEach(image => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('image-reveal-wrapper');
        image.parentNode.insertBefore(wrapper, image);
        wrapper.appendChild(image);
        
        gsap.set(wrapper, { overflow: 'hidden' });
        gsap.set(image, { scale: 1.2 });
        
        ScrollTrigger.create({
            trigger: wrapper,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 1.5,
                    ease: 'power3.out'
                });
            }
        });
    });
};

// Smooth section transitions
const initSectionTransitions = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
};

// Dynamic background effect
const initDynamicBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.classList.add('background-canvas');
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const properties = {
        particleCount: 50,
        particleSize: 3,
        speed: 1,
        connectDistance: 100
    };
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = Math.random() * properties.speed * 2 - properties.speed;
            this.vy = Math.random() * properties.speed * 2 - properties.speed;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }
    }
    
    const init = () => {
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle());
        }
        animate();
    };
    
    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(particle => {
            particle.update();
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, properties.particleSize, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(79, 70, 229, 0.1)';
            ctx.fill();
            
            particles.forEach(particle2 => {
                const dx = particle.x - particle2.x;
                const dy = particle.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < properties.connectDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.strokeStyle = `rgba(79, 70, 229, ${1 - distance / properties.connectDistance})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    init();
};

// Text splitting animation
const initTextSplitting = () => {
    const headings = document.querySelectorAll('h1, h2');
    
    headings.forEach(heading => {
        const text = heading.textContent;
        heading.textContent = '';
        
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            heading.appendChild(span);
            
            gsap.to(span, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 80%'
                },
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.05
            });
        });
    });
};

// Initialize all modern effects
document.addEventListener('DOMContentLoaded', () => {
    createCustomCursor();
    initMagneticButtons();
    initImageReveal();
    initSectionTransitions();
    initDynamicBackground();
    initTextSplitting();
    
    // Add smooth scrolling with GSAP ScrollToPlugin
    gsap.registerPlugin(ScrollToPlugin);
    
    // Initialize custom scroll progress
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
    });
});

// Add CSS for new effects
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
        mix-blend-mode: difference;
    }
    
    .cursor-dot {
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
    }
    
    .background-canvas {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0.5;
    }
    
    .image-reveal-wrapper {
        overflow: hidden;
    }
    
    .reveal-image {
        transform-origin: center;
        will-change: transform;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        transform-origin: left;
        transform: scaleX(0);
        z-index: 1000;
    }
`;

document.head.appendChild(style);

/**
 * Initialize the mobile navigation
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Mobile Dropdown Toggle
    const dropdownToggle = document.querySelectorAll('.has-dropdown > a');
    
    dropdownToggle.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                // Allow default behavior (filtering/scrolling) unless it's just opening dropdown
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown')) {
                     e.preventDefault(); // Prevent scrolling/filtering only if it's a dropdown toggle
                const dropdown = this.nextElementSibling;
                dropdown.classList.toggle('active');
                
                // Toggle the chevron icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-chevron-down');
                    icon.classList.toggle('fa-chevron-up');
                     }
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 768 && navMenu && navMenu.classList.contains('active')) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
                navMenu.classList.remove('active');
            }
        }
    });
}

/**
 * Initialize the main hero slider
 */
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot[data-slide]'); // Ensure dots have data-slide attribute
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (!slides.length || slides.length < 2) return; // Don't init if less than 2 slides
    
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000);
    let isAnimating = false;
    
    function showSlide(index) {
        if (isAnimating || index < 0 || index >= slides.length) return;
        isAnimating = true;
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        if (dots[index]) { // Check if dot exists
        dots[index].classList.add('active');
        }
        

        // Allow next animation after transition ends (adjust time if needed)
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot) => { // Removed index as we use data-slide
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide')); // Get index from data attribute
            if (!isNaN(slideIndex) && currentSlide !== slideIndex) {
                currentSlide = slideIndex;
                showSlide(currentSlide);
                resetInterval();
            }
        });
    });
    
    // Event listeners for prev/next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });
    
    // Reset interval on interaction
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Pause slider on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            resetInterval(); // Restart interval
        });
    }
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
            resetInterval();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
            resetInterval();
        }
    }
}

/**
 * Initialize the testimonial slider
 */
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.t-dot[data-slide]'); // Ensure dots have data-slide
    
    if (!testimonialSlides.length || testimonialSlides.length < 2) return; // Don't init if less than 2 slides
    
    let currentTestimonial = 0;
    let testimonialInterval = setInterval(nextTestimonial, 4000);
    
    function showTestimonial(index) {
         if (index < 0 || index >= testimonialSlides.length) return;

        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
         if(testimonialDots[index]){ // Check if dot exists
        testimonialDots[index].classList.add('active');
         }

    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    }
    
    // Event listeners for testimonial dots
    testimonialDots.forEach((dot) => { // Removed index
        dot.addEventListener('click', () => {
             const slideIndex = parseInt(dot.getAttribute('data-slide')); // Get index from data attribute
             if (!isNaN(slideIndex) && currentTestimonial !== slideIndex) {
                currentTestimonial = slideIndex;
            showTestimonial(currentTestimonial);
            resetTestimonialInterval();
            }
        });
    });
    
    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 4000);
    }
    
    // Touch swipe for testimonials
    const testimonialContainer = document.querySelector('.testimonial-slider');
    if (testimonialContainer) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        testimonialContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Next testimonial
                nextTestimonial();
                resetTestimonialInterval();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Previous testimonial
                currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
                showTestimonial(currentTestimonial);
                resetTestimonialInterval();
            }
        }, { passive: true });
    }
}

/**
 * Initialize counter animation for stats section with improved effects
 */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (!statNumbers.length) return;
    
    const options = {
        threshold: 0.4,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-count'));
                // Check if already animated
                if (target.dataset.animated === 'true' || isNaN(targetNumber)) return;

                target.dataset.animated = 'true'; // Mark as animated
                let count = 0;
                
                const duration = Math.min(3000, Math.max(1500, targetNumber < 100 ? 2000 : 3000));
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameDuration);
                const incrementPerFrame = targetNumber / totalFrames;
                
                function animateCount() {
                    count += incrementPerFrame;
                    const currentCount = Math.min(Math.floor(count), targetNumber); // Ensure it doesn't exceed target

                    target.textContent = currentCount.toLocaleString();
                    
                    if (currentCount < targetNumber) {
                        requestAnimationFrame(animateCount);
                    } else {
                        target.textContent = targetNumber.toLocaleString(); // Ensure final value is exact
                    }
                }
                
                requestAnimationFrame(animateCount);
                
                // Unobserve after animation starts to prevent re-triggering
                observer.unobserve(target);
                
                // Add animation to the stat item
                const statItem = target.closest('.stat-item');
                if (statItem) {
                    statItem.classList.add('animate-stat');
                }
            }
        });
    }, options);
    
    statNumbers.forEach(number => {
        number.dataset.animated = 'false'; // Initialize animation state
        countObserver.observe(number);
    });
    
    // Add a scroll event to create a parallax effect on the stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const sectionTop = statsSection.offsetTop;
            const sectionHeight = statsSection.offsetHeight;
            
            // Only apply effect when in viewport
            if (scrollTop > sectionTop - window.innerHeight && 
                scrollTop < sectionTop + sectionHeight) {
                const yPos = (scrollTop - sectionTop) * 0.2;
                statsSection.style.backgroundPosition = `center ${-yPos}px`;
            }
        });
    }
}

/**
 * Initialize gallery with filtering and lightbox functionality
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.querySelector('.gallery-modal');
    const galleryContainer = document.querySelector('.gallery-container'); // Need the container
    
    if (!galleryContainer || !galleryItems.length) return; // Check container too
    
    // Gallery filtering
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items
                const filterValue = button.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    const matchesFilter = filterValue === 'all' || itemCategory === filterValue;

                    // Apply styles for fade-out/fade-in effect
                    if (matchesFilter) {
                         // If it was hidden, prepare for fade-in
                         if (item.style.display === 'none') {
                             item.style.opacity = '0';
                             item.style.transform = 'scale(0.8)';
                             item.style.display = 'block'; // Use default display (grid item)
                             // Force reflow to apply initial styles before transition
                             void item.offsetWidth;
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                         }
                    } else {
                         // Fade out
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                         // Hide after transition
                        setTimeout(() => {
                            // Only hide if it still doesn't match (in case filter changed quickly)
                            const currentFilterValue = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                            if (currentFilterValue !== 'all' && itemCategory !== currentFilterValue) {
                            item.style.display = 'none';
                            }
                         }, 300); // Match transition duration
                    }
                });
            });
        });
    }
    
    // Lightbox functionality
    if (modal) {
        const modalImg = modal.querySelector('.gallery-full-img');
        const modalCaption = modal.querySelector('.gallery-caption');
        const closeButton = modal.querySelector('.gallery-close');
        const prevButton = modal.querySelector('.gallery-prev');
        const nextButton = modal.querySelector('.gallery-next');
        
        let currentIndex = 0;
        let visibleGalleryArray = []; // Array of currently visible items for navigation
        
        function updateVisibleGalleryArray() {
            visibleGalleryArray = [];
        galleryItems.forEach((item, index) => {
                // Check if item is currently displayed (not display: none)
                if (item.offsetParent !== null) { // More reliable check than style.display
                    const imgLink = item.querySelector('.gallery-zoom')?.getAttribute('href');
                    const title = item.querySelector('.gallery-info h3')?.textContent || '';
                    const description = item.querySelector('.gallery-info p')?.textContent || '';

                    if(imgLink) {
                        visibleGalleryArray.push({
                src: imgLink,
                title: title,
                            description: description,
                            originalIndex: index // Keep track of original index if needed
                        });
                    }
                }
            });
        }


        // Event listeners for opening the modal
        galleryContainer.addEventListener('click', (e) => {
             const zoomLink = e.target.closest('.gallery-zoom');
             if (zoomLink) {
                e.preventDefault();
                 updateVisibleGalleryArray(); // Update array based on current filters
                 const clickedItem = zoomLink.closest('.gallery-item');

                 // Find the index within the *visible* array
                 currentIndex = visibleGalleryArray.findIndex(itemData =>
                     itemData.src === zoomLink.getAttribute('href')
                 );

                 if (currentIndex !== -1) {
                openModal(currentIndex);
                 }
             }
        });
        
        
        function openModal(index) {
            if (index < 0 || index >= visibleGalleryArray.length) return;

            modal.style.display = 'block';
            updateModalContent(index);
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
            
            // Add fade-in animation
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10); // Short delay
        }
        
        function closeModal() {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }, 300); // Match transition duration
        }
        
        function updateModalContent(index) {
             if (index < 0 || index >= visibleGalleryArray.length) return;

            const currentItem = visibleGalleryArray[index];
            modalImg.src = currentItem.src;
            modalImg.alt = currentItem.title;
            modalCaption.innerHTML = `<h3>${currentItem.title}</h3><p>${currentItem.description}</p>`;

            // Add fade effect for image change
            modalImg.style.opacity = '0';
            setTimeout(() => {
                modalImg.style.opacity = '1';
            }, 50); // Shorter delay for image swap
        }
        
        function showNext() {
            currentIndex = (currentIndex + 1) % visibleGalleryArray.length;
            updateModalContent(currentIndex);
        }
        
        function showPrev() {
            currentIndex = (currentIndex - 1 + visibleGalleryArray.length) % visibleGalleryArray.length;
            updateModalContent(currentIndex);
        }
        
        // Event listeners
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', showPrev);
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', showNext);
        }
        
        // Close modal when clicking outside of the image/controls
        modal.addEventListener('click', (e) => {
             // Close if click is directly on the modal background, not on content/image/buttons
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal || modal.style.display === 'none') return; // Check if modal is active
            
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'ArrowRight') {
                showNext();
            }
        });
    }
}

/**
 * Initialize course search functionality
 */
function initCourseSearch() {
    const searchInput = document.getElementById('courseSearchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchButton = document.getElementById('searchButton');
    const searchResultsContainer = document.querySelector('.search-results'); // container
    const courseResults = searchResultsContainer ? searchResultsContainer.querySelectorAll('.course-result') : []; // items inside
    const emptyMessage = searchResultsContainer ? searchResultsContainer.querySelector('.search-empty') : null; // empty message inside


    if (!searchInput || !searchResultsContainer || !courseResults.length) return; // Check all elements
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const category = categoryFilter ? categoryFilter.value : ''; // Handle optional filter
        let resultsFound = false;
        
        courseResults.forEach(result => {
            const titleElement = result.querySelector('h3');
            const descriptionElement = result.querySelector('p');
            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const description = descriptionElement ? descriptionElement.textContent.toLowerCase() : '';
            const resultCategory = result.getAttribute('data-category');
            
            const matchesSearch = searchTerm === '' || 
                                 title.includes(searchTerm) || 
                                 description.includes(searchTerm);
                                 
            const matchesCategory = category === '' || !category || resultCategory === category;
            
            if (matchesSearch && matchesCategory) {
                result.style.display = 'flex'; // Use flex as in original CSS
                resultsFound = true;
            } else {
                result.style.display = 'none';
            }
        });
        
        // Show/hide empty message
        if (emptyMessage) {
            emptyMessage.style.display = resultsFound ? 'none' : 'block'; // Or 'flex' if it's styled that way
        }
        
        // Highlight search terms
        if (searchTerm) {
            highlightSearchTerms(searchTerm);
        } else {
            removeHighlights();
        }
    }
    
    function highlightSearchTerms(term) {
        removeHighlights(); // Remove existing highlights first
        
        courseResults.forEach(result => {
            if (result.style.display !== 'none') { // Only highlight visible results
                const title = result.querySelector('h3');
                const description = result.querySelector('p');
                
                if (title) title.innerHTML = highlightText(title.textContent, term);
                if (description) description.innerHTML = highlightText(description.textContent, term);
            }
        });
    }
    
    function highlightText(text, term) {
         if (!text || !term) return text; // Basic check
        // Escape special regex characters in the search term
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }
    
    function removeHighlights() {
        const highlights = searchResultsContainer.querySelectorAll('.highlight');
        highlights.forEach(el => {
             // Replace the highlight span with its text content
            const parent = el.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(el.textContent), el);
                // Normalize combines adjacent text nodes (optional but good practice)
                parent.normalize();
            }
        });
    }
    
    // Event listeners
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        // Use 'input' for real-time searching (optional) or 'keyup' for Enter key
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
         // Optional: trigger search on input clear
         searchInput.addEventListener('input', () => {
            if (searchInput.value === '') {
                performSearch();
            }
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', performSearch);
    }
    
    // Add CSS for highlighting if not already present
     if (!document.getElementById('highlight-style')) {
    const style = document.createElement('style');
        style.id = 'highlight-style'; // Give it an ID to prevent duplicates
    style.textContent = `
        .highlight {
            background-color: yellow;
            padding: 0 2px;
            border-radius: 2px;
            font-weight: bold;
                color: #333; /* Ensure text color is readable */
        }
    `;
    document.head.appendChild(style);
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle'); // The span containing the icon

        if (!question || !answer || !toggle) return; // Ensure all parts exist
        
        question.addEventListener('click', () => {
            const isActive = answer.classList.contains('active');

            // Close all other answers first (optional, remove if multiple can be open)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    const otherIcon = otherToggle ? otherToggle.querySelector('i') : null;

                    if (otherAnswer) otherAnswer.classList.remove('active');
                    if (otherToggle) otherToggle.classList.remove('active');
                    if (otherIcon) otherIcon.className = 'fas fa-plus'; // Reset icon
                }
            });

            // Toggle current answer and icon
            answer.classList.toggle('active');
                toggle.classList.toggle('active');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.className = answer.classList.contains('active') ? 'fas fa-minus' : 'fas fa-plus';
            }
        });
    });
}

/**
 * Initialize contact form validation and submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error messages and field styles
        const errorElements = contactForm.querySelectorAll('.form-error');
        errorElements.forEach(el => el.textContent = '');
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => field.classList.remove('error-field')); // Remove error style
        
        // Get form fields
        const nameField = contactForm.querySelector('#name');
        const emailField = contactForm.querySelector('#email');
        const subjectField = contactForm.querySelector('#subject');
        const messageField = contactForm.querySelector('#message');
        const formMessage = contactForm.querySelector('.form-message'); // For success/general errors
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Validation flags
        let isValid = true;
        
        // Validate name
        if (nameField && nameField.value.trim() === '') {
            showError(nameField, 'Please enter your name');
            isValid = false;
        } else if (nameField && nameField.value.trim().length < 2) {
            showError(nameField, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        if (emailField && emailField.value.trim() === '') {
            showError(emailField, 'Please enter your email');
            isValid = false;
        } else if (emailField && !isValidEmail(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (subjectField && subjectField.value.trim() === '') {
            showError(subjectField, 'Please enter a subject');
            isValid = false;
        }
        
        // Validate message
        if (messageField && messageField.value.trim() === '') {
            showError(messageField, 'Please enter your message');
            isValid = false;
        } else if (messageField && messageField.value.trim().length < 10) {
            showError(messageField, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If form is valid, simulate submission
        if (isValid) {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.classList.add('submitting'); // Add class for spinner
                submitButton.innerHTML = 'Sending...'; // Change text
            }


            // Simulate form submission (replace with actual fetch/AJAX call)
            setTimeout(() => {
                 if (submitButton) {
                     submitButton.disabled = false;
                     submitButton.classList.remove('submitting');
                     submitButton.innerHTML = 'Send Message'; // Restore text
                 }

                
                if (formMessage) {
                    formMessage.className = 'form-message success'; // Add success class
                    formMessage.textContent = 'Your message has been sent successfully! We will get back to you soon.';
                    formMessage.style.display = 'block'; // Make it visible
                }
                
                // Reset form
                contactForm.reset();
                 formFields.forEach(field => field.classList.remove('error-field')); // Clear any potential error styles

                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (formMessage) {
                        formMessage.style.display = 'none';
                         formMessage.className = 'form-message'; // Reset class
                         formMessage.textContent = ''; // Clear text
                    }
                }, 5000);
            }, 1500); // Simulate network delay
        } else {
             // Optionally display a general error message if needed
             if (formMessage) {
                 // formMessage.className = 'form-message error';
                 // formMessage.textContent = 'Please correct the errors above.';
                 // formMessage.style.display = 'block';
             }
        }
    });
    
    function showError(field, message) {
        if (!field) return;
        field.classList.add('error-field'); // Add error style to field
        const errorElement = field.closest('.form-group')?.querySelector('.form-error'); // Find error span within group
        if (errorElement) {
            errorElement.textContent = message;
        }
        // Optional: focus the first invalid field
         // if (!document.querySelector('.error-field:focus')) {
         //    field.focus();
         // }
    }
    
    function isValidEmail(email) {
        // Simple regex, consider a more robust one if needed
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Add loading spinner CSS if not already present
     if (!document.getElementById('spinner-style')) {
    const style = document.createElement('style');
         style.id = 'spinner-style';
    style.textContent = `
            .submitting {
            position: relative;
            pointer-events: none;
                opacity: 0.8;
        }
        
            .submitting::after {
            content: '';
            position: absolute;
                width: 16px; /* Smaller spinner */
                height: 16px;
                border: 2px solid transparent;
            border-top-color: white;
            border-radius: 50%;
            animation: spinner 0.8s linear infinite;
            right: 15px;
                top: calc(50% - 8px); /* Adjust for smaller size */
        }
        
        @keyframes spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }

             .error-field {
                border-color: var(--accent-color) !important; /* Use !important cautiously */
        }
    `;
    document.head.appendChild(style);
    }
}

/**
 * Initialize back to top button functionality
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Initialize newsletter form submission
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const email = emailInput ? emailInput.value.trim() : '';
        
        // Simple validation
        if (!email) {
            alert('Please enter your email address.');
            if (emailInput) emailInput.focus();
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            if (emailInput) emailInput.focus();
            return;
        }
        
        // Add loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            // Basic loading text, could add a spinner span if needed
            submitBtn.textContent = 'Subscribing...';
        }
        
        // Simulate server request
        setTimeout(() => {
            // Show success message (using alert for simplicity)
            alert(`Thank you for subscribing with ${email}! You have been added to our newsletter.`);
            
            // Reset form and button
            newsletterForm.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe'; // Restore original text
            }
        }, 1500);
    });
}

/**
 * Add page preloader
 */
function addPreloader() {
    // Check if preloader already exists
     if (document.querySelector('.preloader')) return;

    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `<div class="loader"></div>`;
    document.body.insertBefore(preloader, document.body.firstChild); // Insert at the beginning
    
    
    // Hide preloader when page content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                 if (preloader.parentNode) { // Check if still attached
                     preloader.parentNode.removeChild(preloader);
                 }
            }, 500); // Match CSS transition
        }, 500); // Minimum display time (adjust as needed)
    });

    // Add preloader CSS if not already present
     if (!document.getElementById('preloader-style')) {
    const style = document.createElement('style');
         style.id = 'preloader-style';
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
                z-index: 99999; /* Ensure it's on top */
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.5s ease;
                opacity: 1; /* Start visible */
        }
        
        .loader {
            width: 50px;
            height: 50px;
                border: 5px solid #f3f3f3; /* Light grey */
                border-top: 5px solid var(--secondary-color, #3498db); /* Use variable or fallback */
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    }
}

// Call preloader function immediately (runs before DOMContentLoaded)
addPreloader();



// Course data object (assuming this is loaded or defined elsewhere if needed for modal)
// This seems to be primarily for the *single* course view modal, populated in initCourseEnrollment
const courseData = {
    1: {
        id: 1,
        title: "Digital Marketing", // Updated title to match card
        duration: "75 Hours",
        schedule: "Sunday, Tuesday & Thursday (6:00 PM - 8:00 PM)", // Example
        fee: "TK. 10,000 (Regular: TK. 12,000)",
        mode: "Online & Offline (Hybrid)",
        trainer: "John Smith", // Example
        location: "TechsolveTraining Lab, Dhaka", // Example
        overview: "This comprehensive Digital Marketing course covers SEO, SEM, social media marketing, content strategy, email marketing, and analytics. Learn the tools and techniques to drive online growth."
    },
    2: {
        id: 2,
        title: "Web Development", // Updated title
        duration: "90 Hours",
        schedule: "Monday, Wednesday & Friday (7:00 PM - 9:00 PM)", // Example
        fee: "TK. 21,000 (Regular: TK. 25,000)",
        mode: "Online & Offline (Hybrid)",
        trainer: "Sarah Johnson", // Example
        location: "TECHSOLVE Training Lab, Dhaka", // Example
        overview: "Become a full-stack web developer. Master HTML, CSS, JavaScript, popular frameworks like React or Angular, Node.js, databases, and deployment strategies for building modern web applications."
    },
    3: {
        id: 3,
        title: "Post Graduate Diploma (PGD) in Graphic Design", // Match card
        duration: "144 Hours",
        schedule: "Saturday & Sunday (10:00 AM - 2:00 PM)", // Example
        fee: "TK. 42,900",
        mode: "Online & Offline (Hybrid)",
        trainer: "Michael Chen", // Example
        location: "TECHSOLVE Training Lab, Dhaka", // Example
        overview: "An advanced program covering visual communication principles, typography, layout design, branding, UI/UX fundamentals, and industry-standard software like Adobe Creative Suite. Build a professional portfolio."
    }

    // Add more courses if needed
};

/**
 * Initialize course enrollment modal functionality (for single course details)
 */
function initCourseEnrollment() {
    const modal = document.getElementById('courseModal');
    if (!modal) return;

    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const authTabs = modal.querySelectorAll('.auth-tab');
    const authForms = modal.querySelectorAll('.auth-form');
    const singleCourseView = modal.querySelector('.single-course-view');
    const listView = modal.querySelector('.list-view'); // The container for the list

    // Handle "Enrol Now" clicks on course cards
    document.querySelectorAll('.enroll-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const courseCard = this.closest('.course-card');
            const courseId = courseCard ? courseCard.dataset.courseId : null;
            if (courseId && courseData[courseId]) {
                // Close the list modal *first*, then open the single course modal
                closeModal();
                // Need a slight delay to ensure close animation finishes before opening again
                setTimeout(() => openSingleCourseModal(courseId), 350);
            }
        });
    });
    
    // Close modal listeners (apply generally)
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (modalClose) modalClose.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Handle auth tab switching (only relevant for single course view)
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
             // Ensure this only runs when the single course view is active
            if(singleCourseView && singleCourseView.style.display !== 'none') {
            const targetTab = this.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}Form`) {
                    form.classList.add('active');
                }
            });
            }
        });
    });
    
    // Handle form submissions (only relevant for single course view)
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here (e.g., AJAX request)
             if(singleCourseView && singleCourseView.style.display !== 'none') {
                alert('Form submitted successfully! (Simulation)');
            closeModal();
            }
        });
    });
}


/**
 * Open the modal to show details for a SINGLE course.
 */
function openSingleCourseModal(courseId) {
    const modal = document.getElementById('courseModal');
    const course = courseData[courseId];
    
    if (!modal || !course) return;

    const singleCourseView = modal.querySelector('.single-course-view');
    const listView = modal.querySelector('.list-view');

    // Hide list view, show single view
    if (listView) listView.style.display = 'none';
    if (singleCourseView) singleCourseView.style.display = 'block';


    // Populate modal content for the specific course
    modal.querySelector('.modal-title').textContent = course.title || 'Course Details';
    modal.querySelector('.course-duration').textContent = course.duration || 'N/A';
    modal.querySelector('.course-schedule').textContent = course.schedule || 'N/A';
    modal.querySelector('.course-fee').textContent = course.fee || 'N/A';
    modal.querySelector('.course-mode').textContent = course.mode || 'N/A';
    modal.querySelector('.course-trainer').textContent = course.trainer || 'N/A';
    modal.querySelector('.course-location').textContent = course.location || 'N/A';
    modal.querySelector('.overview-text').textContent = course.overview || 'No overview available.';

     // Ensure default tab (e.g., login) is active
     const loginTab = modal.querySelector('.auth-tab[data-tab="login"]');
     const registerTab = modal.querySelector('.auth-tab[data-tab="register"]');
     const loginForm = modal.querySelector('#loginForm');
     const registerForm = modal.querySelector('#registerForm');

     if (loginTab) loginTab.classList.add('active');
     if (registerTab) registerTab.classList.remove('active');
     if (loginForm) loginForm.classList.add('active');
     if (registerForm) registerForm.classList.remove('active');

    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Add animation class (optional, ensure CSS exists)
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
         modalContent.style.animation = 'none'; // Reset animation
         void modalContent.offsetWidth; // Trigger reflow
         modalContent.style.animation = 'modalSlideIn 0.3s ease forwards'; // Reapply
    }
}


/**
 * Close the course modal (used by both single and list views).
 */
function closeModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
         if (modalContent) {
             // Optional: Add fade-out animation before hiding
             modalContent.style.animation = 'modalSlideOut 0.3s ease forwards'; // Ensure CSS for modalSlideOut exists
             setTimeout(() => {
    modal.style.display = 'none';
                 modalContent.style.animation = ''; // Reset animation
    document.body.style.overflow = ''; // Restore background scrolling
             }, 300); // Match animation duration
         } else {
            // Fallback if no animation
            modal.style.display = 'none';
            document.body.style.overflow = '';
         }
    }
}



/**
 * Initialize Top Bar related features (scroll behavior, tracking)
 */
function initTopBar() {
    const topBar = document.querySelector('.top-bar');
    if (!topBar) return;

    // Add click tracking for contact links
    const contactLinks = topBar.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default mailto: and tel: behavior, just track
            const type = this.href.startsWith('tel:') ? 'phone' : 'email';
            trackContactClick(type);
        });
    });

    // Add click tracking for social media links
    const socialLinks = topBar.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default link behavior (opening in new tab), just track
            const platform = this.getAttribute('title')?.split(' ').pop().toLowerCase() || 'unknown';
            trackSocialClick(platform);
        });
    });

    // Add scroll effect to show/hide top bar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const scrollThreshold = 50; // Pixels before hiding

        if (currentScroll <= scrollThreshold) { // Show if near top
            topBar.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll) { // Scrolling down
            topBar.style.transform = 'translateY(-100%)'; // Hide
        } else { // Scrolling up
            topBar.style.transform = 'translateY(0)'; // Show
        }

        lastScroll = currentScroll; // Update last scroll position
    }, { passive: true }); // Improve scroll performance
}

// Analytics tracking functions (placeholders)
function trackContactClick(type) {
    console.log(`Contact link clicked: ${type}`);
    // Replace with your actual analytics tracking code (e.g., ga('send', ...), gtag('event', ...))
}

function trackSocialClick(platform) {
    console.log(`Social media link clicked: ${platform}`);
    // Replace with your actual analytics tracking code
}


// ===============================================
// == NEW FUNCTIONS FOR MENU NAVIGATION/FILTERING ==
// ===============================================

/**
 * Initialize main menu navigation for course filtering and smooth scrolling.
 */
function initMenuNavigation() {
    const navMenu = document.querySelector('.main-nav .nav-menu'); // Target the main nav menu
    if (!navMenu) return;

    navMenu.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return; // Didn't click on a link

        const href = link.getAttribute('href');
        const categoryFilter = link.dataset.filter; // Check for data-filter attribute
        const isSectionScroll = href && href.startsWith('#') && href.length > 1;

        // --- Handle Course Category Filtering ---
        if (categoryFilter) {
            e.preventDefault(); // Prevent default link behavior
            filterAndShowCourses(categoryFilter, link.textContent.trim()); // Pass category key and readable name
            // Close mobile menu if open
             if (window.innerWidth < 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('.menu-toggle')?.classList.remove('active'); // If toggle has active state
            }
        }
        // --- Handle Smooth Scrolling to Sections ---
        else if (isSectionScroll) {
            e.preventDefault(); // Prevent default hash jump
            scrollToSection(href); // href already includes the '#'
             // Close mobile menu if open
             if (window.innerWidth < 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('.menu-toggle')?.classList.remove('active');
            }
        }
        // Allow normal navigation for other links (e.g., Home, About dropdown items)
    });
}

/**
 * Filters courses based on category and displays them in the modal.
 * @param {string} category - The category key (e.g., 'web', 'design').
 * @param {string} categoryName - The display name (e.g., 'Web Development').
 */
function filterAndShowCourses(category, categoryName) {
    const allCourseCards = document.querySelectorAll('.upcoming-courses .course-card');
    const modal = document.getElementById('courseModal');
    if (!modal || !allCourseCards.length) return;

    const modalContent = modal.querySelector('.modal-content');
    const singleCourseView = modal.querySelector('.single-course-view');
    const listView = modal.querySelector('.list-view'); // The container for the list

    if (!modalContent || !singleCourseView || !listView) return;

    const filteredCards = [];
    allCourseCards.forEach(card => {
        if (card.dataset.category === category) {
            filteredCards.push(card.cloneNode(true)); // Clone the card
        }
    });

    // Prepare list view content
    listView.innerHTML = ''; // Clear previous list

    // Add category title
    const titleElement = document.createElement('h2');
    titleElement.className = 'filtered-list-title'; // Add class for styling
    titleElement.textContent = `${categoryName} Courses`;
    listView.appendChild(titleElement);

    if (filteredCards.length > 0) {
        // Append filtered course cards
        filteredCards.forEach(card => {
             // Re-attach event listener for 'Enrol Now' if needed, as cloneNode doesn't copy listeners
             const enrollLink = card.querySelector('.enroll-link');
             if (enrollLink) {
                 enrollLink.addEventListener('click', function(e) {
                     e.preventDefault();
                     const courseId = this.closest('.course-card')?.dataset.courseId;
                     if (courseId && courseData[courseId]) {
                         // Close the list modal *first*, then open the single course modal
                         closeModal();
                         // Need a slight delay to ensure close animation finishes before opening again
                         setTimeout(() => openSingleCourseModal(courseId), 350);
                     }
                 });
             }
            listView.appendChild(card);
        });
    } else {
        // Show a 'no courses found' message
        const noCoursesMessage = document.createElement('p');
        noCoursesMessage.textContent = `No upcoming courses found for the "${categoryName}" category at this time.`;
        noCoursesMessage.style.textAlign = 'center';
        noCoursesMessage.style.padding = '20px';
        listView.appendChild(noCoursesMessage);
    }

    // Hide single view, show list view
    singleCourseView.style.display = 'none';
    listView.style.display = 'block';

    // Show the modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Trigger modal animation
    modalContent.style.animation = 'none';
    void modalContent.offsetWidth;
    modalContent.style.animation = 'modalSlideIn 0.3s ease forwards';
}


/**
 * Smoothly scrolls to a section on the page.
 * @param {string} selector - The CSS selector for the target section (e.g., '#gallery-section').
 */
function scrollToSection(selector) {
    const section = document.querySelector(selector);
    if (section) {
        // Calculate offset if you have a sticky header
         const header = document.querySelector('.main-header');
         const headerHeight = header ? header.offsetHeight : 0;
         const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - headerHeight;


        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    } else {
        console.warn('Scroll target not found:', selector);
    }
}

// Ensure the modal close works universally
// The closeModal function defined earlier handles this.

// Add CSS for modal slide-out animation (if not already present)
if (!document.getElementById('modal-animation-style')) {
    const style = document.createElement('style');
    style.id = 'modal-animation-style';
    style.textContent = `
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes modalSlideOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(50px); opacity: 0; }
        }
        .modal-content { /* Apply base animation state */
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}
