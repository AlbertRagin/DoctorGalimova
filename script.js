// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close modal if open
            closeModal();
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Modal functionality
const modal = document.getElementById('modal');
const openModalBtns = document.querySelectorAll('#openModal, #openModalHero');
const closeModalBtn = document.getElementById('closeModal');
const modalForm = document.getElementById('modalForm');

// Open modal
openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
});

function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal
closeModalBtn.addEventListener('click', closeModal);

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Form submission for modal
modalForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('modalName').value;
    const phone = document.getElementById('modalPhone').value;
    const service = document.getElementById('modalService').value;
    
    alert(`Спасибо, ${name}!\nВаша заявка на "${getServiceName(service)}" принята.\nМы свяжемся с вами по номеру ${phone}`);
    
    modalForm.reset();
    closeModal();
});

// Form submission for contact form
const contactForm = document.getElementById('appointmentForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    
    alert(`Спасибо, ${name}!\nВаша заявка на "${getServiceName(service)}" принята.\nМы свяжемся с вами по номеру ${phone}`);
    
    contactForm.reset();
});

// Helper function to get service name
function getServiceName(value) {
    const services = {
        'rf': 'RF-лифтинг',
        'cleaning': 'Чистка лица',
        'botox': 'Ботулинотерапия',
        'meso': 'Мезотерапия',
        'plasma': 'Плазмотерапия',
        'care': 'Уходовые процедуры'
    };
    return services[value] || 'услуга';
}

// Service button click handler
document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        openModal();
        const service = this.getAttribute('data-service');
        const serviceSelect = document.getElementById('modalService');
        
        // Set service in modal dropdown
        for (let option of serviceSelect.options) {
            if (option.text.includes(service)) {
                serviceSelect.value = option.value;
                break;
            }
        }
    });
});

// Phone input formatting
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        value = '+7 (' + value;
    }
    if (value.length > 4) {
        value = value.slice(0, 4) + ') ' + value.slice(4);
    }
    if (value.length > 9) {
        value = value.slice(0, 9) + '-' + value.slice(9);
    }
    if (value.length > 12) {
        value = value.slice(0, 12) + '-' + value.slice(12);
    }
    if (value.length > 15) {
        value = value.slice(0, 15) + '-' + value.slice(15);
    }
    
    input.value = value.slice(0, 18);
}

// Add phone formatting to inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        formatPhone(this);
    });
});

// Initialize
console.log('Сайт Dr. Galimova загружен! 🎉');