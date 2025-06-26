// Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize contact page functionality
    initContactForm();
    initFormValidation();
    initContactAnimations();
    initFAQAccordion();
    initSocialLinks();
    
    // Contact Form Functionality
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = this.querySelector('#name').value.trim();
                const email = this.querySelector('#email').value.trim();
                const phone = this.querySelector('#phone').value.trim();
                const projectType = this.querySelector('#project-type').value;
                const subject = this.querySelector('#subject').value.trim();
                const message = this.querySelector('#message').value.trim();
                const privacy = this.querySelector('#privacy').checked;
                
                // Validate form
                if (!validateContactForm(name, email, projectType, subject, message, privacy)) {
                    return;
                }
                
                // Show loading state
                const submitBtn = this.querySelector('.contact-submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Success response
                    showNotification('¡Mensaje enviado con éxito! Te responderé en las próximas 24 horas.', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset button
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Clear validation states
                    clearValidationStates();
                    
                }, 2000);
            });
        }
    }
    
    // Form Validation
    function validateContactForm(name, email, projectType, subject, message, privacy) {
        let isValid = true;
        
        // Clear previous validation states
        clearValidationStates();
        
        // Validate name
        if (!name) {
            showFieldError('name', 'El nombre es requerido');
            isValid = false;
        } else if (name.length < 2) {
            showFieldError('name', 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
        } else {
            showFieldSuccess('name');
        }
        
        // Validate email
        if (!email) {
            showFieldError('email', 'El email es requerido');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError('email', 'Por favor, ingresa un email válido');
            isValid = false;
        } else {
            showFieldSuccess('email');
        }
        
        // Validate project type
        if (!projectType) {
            showFieldError('project-type', 'Por favor, selecciona un tipo de proyecto');
            isValid = false;
        } else {
            showFieldSuccess('project-type');
        }
        
        // Validate subject
        if (!subject) {
            showFieldError('subject', 'El asunto es requerido');
            isValid = false;
        } else if (subject.length < 5) {
            showFieldError('subject', 'El asunto debe tener al menos 5 caracteres');
            isValid = false;
        } else {
            showFieldSuccess('subject');
        }
        
        // Validate message
        if (!message) {
            showFieldError('message', 'El mensaje es requerido');
            isValid = false;
        } else if (message.length < 20) {
            showFieldError('message', 'El mensaje debe tener al menos 20 caracteres');
            isValid = false;
        } else {
            showFieldSuccess('message');
        }
        
        // Validate privacy checkbox
        if (!privacy) {
            showFieldError('privacy', 'Debes aceptar la política de privacidad');
            isValid = false;
        } else {
            showFieldSuccess('privacy');
        }
        
        return isValid;
    }
    
    // Show field error
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        field.classList.add('is-invalid');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    // Show field success
    function showFieldSuccess(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
        
        // Add success message
        const successDiv = document.createElement('div');
        successDiv.className = 'valid-feedback';
        successDiv.textContent = '¡Perfecto!';
        formGroup.appendChild(successDiv);
    }
    
    // Clear validation states
    function clearValidationStates() {
        const fields = document.querySelectorAll('.form-control');
        fields.forEach(field => {
            field.classList.remove('is-invalid', 'is-valid');
        });
        
        const feedbacks = document.querySelectorAll('.invalid-feedback, .valid-feedback');
        feedbacks.forEach(feedback => {
            feedback.remove();
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Real-time validation
    function initFormValidation() {
        const fields = document.querySelectorAll('.form-control');
        
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                const fieldId = this.id;
                const value = this.value.trim();
                
                switch(fieldId) {
                    case 'name':
                        if (value && value.length >= 2) {
                            showFieldSuccess(fieldId);
                        } else if (value) {
                            showFieldError(fieldId, 'El nombre debe tener al menos 2 caracteres');
                        }
                        break;
                    case 'email':
                        if (value && isValidEmail(value)) {
                            showFieldSuccess(fieldId);
                        } else if (value) {
                            showFieldError(fieldId, 'Por favor, ingresa un email válido');
                        }
                        break;
                    case 'subject':
                        if (value && value.length >= 5) {
                            showFieldSuccess(fieldId);
                        } else if (value) {
                            showFieldError(fieldId, 'El asunto debe tener al menos 5 caracteres');
                        }
                        break;
                    case 'message':
                        if (value && value.length >= 20) {
                            showFieldSuccess(fieldId);
                        } else if (value) {
                            showFieldError(fieldId, 'El mensaje debe tener al menos 20 caracteres');
                        }
                        break;
                }
            });
            
            field.addEventListener('input', function() {
                // Remove validation states on input
                this.classList.remove('is-invalid', 'is-valid');
                const formGroup = this.closest('.form-group');
                const feedbacks = formGroup.querySelectorAll('.invalid-feedback, .valid-feedback');
                feedbacks.forEach(feedback => {
                    feedback.remove();
                });
            });
        });
        
        // Project type validation
        const projectTypeSelect = document.getElementById('project-type');
        if (projectTypeSelect) {
            projectTypeSelect.addEventListener('change', function() {
                if (this.value) {
                    showFieldSuccess(this.id);
                }
            });
        }
        
        // Privacy checkbox validation
        const privacyCheckbox = document.getElementById('privacy');
        if (privacyCheckbox) {
            privacyCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    showFieldSuccess(this.id);
                }
            });
        }
    }
    
    // Contact page animations
    function initContactAnimations() {
        // Animate contact stats on scroll
        const contactStats = document.querySelectorAll('.stat-item');
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        contactStats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(30px)';
            stat.style.transition = `all 0.6s ease ${index * 0.2}s`;
            observer.observe(stat);
        });
        
        // Animate contact info cards
        const contactCards = document.querySelectorAll('.contact-info-card');
        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        contactCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.8s ease ${index * 0.2}s`;
            cardObserver.observe(card);
        });
        
        // Animate social media cards
        const socialCards = document.querySelectorAll('.social-link-card');
        const socialObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, { threshold: 0.3 });
        
        socialCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.8)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            socialObserver.observe(card);
        });
    }
    
    // FAQ Accordion functionality
    function initFAQAccordion() {
        const accordionButtons = document.querySelectorAll('.accordion-button');
        
        accordionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add smooth animation to accordion body
                const target = this.getAttribute('data-bs-target');
                const accordionBody = document.querySelector(target);
                
                if (accordionBody) {
                    accordionBody.style.transition = 'all 0.3s ease';
                }
            });
        });
    }
    
    // Social links functionality
    function initSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link-card');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-10px) scale(1)';
                }, 150);
                
                // Show notification (in real implementation, this would open the social media)
                const platform = this.querySelector('span').textContent;
                showNotification(`Redirigiendo a ${platform}...`, 'info');
            });
        });
    }
    
    // Enhanced notification system for contact page
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-weight: 500;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add floating animation to contact elements
    function addFloatingAnimation() {
        const elements = document.querySelectorAll('.element');
        
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    // Initialize floating animation
    addFloatingAnimation();
    
    // Add typing effect to contact title
    function initTypingEffect() {
        const contactTitle = document.querySelector('.contact-title');
        if (contactTitle) {
            const text = contactTitle.textContent;
            contactTitle.textContent = '';
            contactTitle.style.borderRight = '2px solid white';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    contactTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        contactTitle.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            setTimeout(typeWriter, 500);
        }
    }
    
    // Initialize typing effect
    initTypingEffect();
    
    // Add scroll to top functionality
    addScrollToTop();
    
    function addScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(scrollToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add hover effect
        scrollToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        });
        
        scrollToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
    }
    
    console.log('Contact page functionality initialized successfully!');
}); 