// ===== CONTACT FORM FUNCTIONALITY =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitButton = document.getElementById('submitBtn');
        this.statusMessage = document.getElementById('statusMessage');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupValidation();
        }
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        // Validation rules
        switch (field.type) {
            case 'email':
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!this.isValidEmail(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'text':
                if (field.name === 'name' && !value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (field.name === 'subject' && !value) {
                    errorMessage = 'Subject is required';
                    isValid = false;
                }
                break;
            case 'textarea':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showStatus('Please fix the errors above.', 'error');
            return;
        }

        this.setLoading(true);

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // For now, we'll simulate a successful submission
            // In production, you would send this to your backend or email service
            await this.simulateSubmission(data);
            
            this.showStatus('Thank you! Your message has been sent successfully.', 'success');
            this.form.reset();
        } catch (error) {
            console.error('Submission error:', error);
            this.showStatus('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    async simulateSubmission(data) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate success (in real implementation, this would be an actual API call)
        console.log('Form data:', data);
        
        // You can integrate with services like:
        // - EmailJS
        // - Formspree
        // - Netlify Forms
        // - Custom backend API
    }

    setLoading(loading) {
        if (this.submitButton) {
            this.submitButton.disabled = loading;
            this.submitButton.textContent = loading ? 'Sending...' : 'Send Message';
        }
    }

    showStatus(message, type) {
        if (this.statusMessage) {
            this.statusMessage.textContent = message;
            this.statusMessage.className = `status-message ${type}`;
            this.statusMessage.style.display = 'block';

            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    this.statusMessage.style.display = 'none';
                }, 5000);
            }
        }
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactForm;
}
