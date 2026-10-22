/**
 * gitCoreX Main JavaScript
 * Handles mobile drawer, accessible accordions, scroll-reveals,
 * URL query parameters for contact preselection, Web3Forms integration,
 * dynamic career mailto link, and client-side validation.
 */

// ============================================================
// WEB3FORMS CONFIGURATION
// ============================================================
const WEB3FORMS_ACCESS_KEY = '20b5c5ff-f10b-4dbb-bbac-a89dfaa452df';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // 1. Mobile Navigation Drawer Toggle
    const menuToggle = document.getElementById('menuToggle');
    const primaryNavbar = document.getElementById('primaryNavbar');
    const header = document.querySelector('.header');

    if (menuToggle && primaryNavbar) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = primaryNavbar.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close when clicking outside header
        document.addEventListener('click', function (e) {
            if (header && !header.contains(e.target) && primaryNavbar.classList.contains('is-open')) {
                primaryNavbar.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && primaryNavbar.classList.contains('is-open')) {
                primaryNavbar.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                menuToggle.focus();
            }
        });
    }

    // 2. Sticky Header Elevation on Scroll
    function handleHeaderScroll() {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // 3. Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 250) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }, { passive: true });

        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Accessible Accordion (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (questionBtn && answer) {
            questionBtn.addEventListener('click', function () {
                const isCurrentlyActive = item.classList.contains('active');

                // Close all sibling accordions in same container
                faqItems.forEach(function (otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherBtn = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                        if (otherAnswer) otherAnswer.style.display = 'none';
                    }
                });

                if (isCurrentlyActive) {
                    item.classList.remove('active');
                    questionBtn.setAttribute('aria-expanded', 'false');
                    answer.style.display = 'none';
                } else {
                    item.classList.add('active');
                    questionBtn.setAttribute('aria-expanded', 'true');
                    answer.style.display = 'block';
                }
            });
        }
    });

    // 5. Scroll-Reveal Animations with IntersectionObserver
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback or reduced motion
        revealElements.forEach(function (el) {
            el.classList.add('is-revealed');
        });
    }

    // 6. Contact Form URL Parameter Auto-Selection
    // e.g. contact.html?package=starter-website or contact.html?service=erp
    const serviceSelect = document.getElementById('contactService');
    const messageField = document.getElementById('contactMessage');

    if (serviceSelect) {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        const packageParam = urlParams.get('package');

        if (packageParam) {
            const packageMap = {
                'starter-website': {
                    serviceVal: 'Website Development',
                    label: 'Starter Website Package'
                },
                'business-website': {
                    serviceVal: 'Website Development',
                    label: 'Business Website Package'
                },
                'ecommerce': {
                    serviceVal: 'Website Development',
                    label: 'E-Commerce Package'
                },
                'erp-setup': {
                    serviceVal: 'ERP Solutions',
                    label: 'ERP Setup Package'
                }
            };

            const pkg = packageMap[packageParam.toLowerCase()];
            if (pkg) {
                for (let i = 0; i < serviceSelect.options.length; i++) {
                    if (serviceSelect.options[i].value === pkg.serviceVal) {
                        serviceSelect.selectedIndex = i;
                        break;
                    }
                }
                if (messageField && !messageField.value) {
                    messageField.value = 'I am interested in the ' + pkg.label + '. Please provide a detailed quote and timeline.';
                }
            }
        } else if (serviceParam) {
            const lowerParam = serviceParam.toLowerCase();
            for (let i = 0; i < serviceSelect.options.length; i++) {
                if (serviceSelect.options[i].value.toLowerCase().includes(lowerParam)) {
                    serviceSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    // Helper: HTML escaping for safe DOM insertion
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Helper: Display inline form alert
    function showFormAlert(container, type, messageHtml) {
        if (!container) return;
        container.className = 'form-status-alert status-' + type;
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
        container.innerHTML = '<i class="fas ' + icon + '"></i><div>' + messageHtml + '</div>';
        container.style.display = 'flex';
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 7. Contact Consultation Form Submission (Web3Forms fetch)
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const statusDiv = document.getElementById('consultationFormStatus');
            const submitBtn = document.getElementById('submitBtn');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

            // Honeypot check (botcheck)
            const botcheck = consultationForm.querySelector('input[name="botcheck"]');
            if (botcheck && botcheck.checked) {
                console.warn('Bot detected via honeypot.');
                return;
            }

            // Input fields
            const nameInput = document.getElementById('contactName');
            const phoneInput = document.getElementById('contactPhone');
            const emailInput = document.getElementById('contactEmail');
            const serviceInput = document.getElementById('contactService');
            const budgetInput = document.getElementById('contactBudget');
            const timelineInput = document.getElementById('contactTimeline');
            const messageInput = document.getElementById('contactMessage');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim().replace(/[^0-9]/g, '') : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const service = serviceInput ? serviceInput.value : '';
            const budget = budgetInput ? budgetInput.value : '';
            const timeline = timelineInput ? timelineInput.value : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Client-side validations
            if (name.length < 2) {
                showFormAlert(statusDiv, 'error', 'Please enter your full name.');
                if (nameInput) nameInput.focus();
                return;
            }

            if (phone.length !== 10) {
                showFormAlert(statusDiv, 'error', 'Please enter a valid 10-digit mobile number.');
                if (phoneInput) phoneInput.focus();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert(statusDiv, 'error', 'Please enter a valid email address.');
                if (emailInput) emailInput.focus();
                return;
            }

            if (!service) {
                showFormAlert(statusDiv, 'error', 'Please select a service of interest.');
                if (serviceInput) serviceInput.focus();
                return;
            }

            if (message.length < 5) {
                showFormAlert(statusDiv, 'error', 'Please provide a brief description of your project requirements.');
                if (messageInput) messageInput.focus();
                return;
            }

            // Disable button & show spinner
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Sending Inquiry...</span>';
            }

            if (statusDiv) {
                statusDiv.style.display = 'none';
            }

            const payload = {
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: 'gitCoreX Website Inquiry: ' + service + ' - ' + name,
                from_name: 'gitCoreX Website',
                name: name,
                phone: phone,
                email: email,
                service: service,
                budget: budget,
                timeline: timeline,
                message: message,
                botcheck: botcheck && botcheck.checked ? 'true' : ''
            };

            try {
                const response = await fetch(WEB3FORMS_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.status === 200 && data.success) {
                    consultationForm.reset();
                    showFormAlert(
                        statusDiv,
                        'success',
                        '<strong>Thank you, ' + escapeHtml(name) + '!</strong> Your consultation request has been delivered to gitCoreX. Our technical solutions team will review your specifications and reach out within 24 hours.'
                    );
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (err) {
                console.error('Web3Forms Error:', err);
                showFormAlert(
                    statusDiv,
                    'error',
                    '<strong>We could not send your message right now.</strong> Please contact us directly at <a href="tel:+919900020043">+91 9900020043</a> or email <a href="mailto:gitcorex26@gmail.com">gitcorex26@gmail.com</a>.'
                );
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    }

    // 8. Careers Application Form Submission & Dynamic Mailto Role Update
    const careerForm = document.getElementById('careerForm');
    if (careerForm) {
        const roleRadios = careerForm.querySelectorAll('input[name="status"]');

        function updateCareerMailto() {
            const selectedRadio = careerForm.querySelector('input[name="status"]:checked');
            const role = selectedRadio ? selectedRadio.value : 'Web Developer';
            const mailtoBtn = document.getElementById('careerResumeMailto');
            const mailtoDirect = document.getElementById('resumeDirectLink');
            const mailtoBtnText = document.getElementById('mailtoBtnText');
            const subject = encodeURIComponent('gitCoreX Career Application Resume - ' + role);
            const href = 'mailto:gitcorex26@gmail.com?subject=' + subject;

            if (mailtoBtn) mailtoBtn.href = href;
            if (mailtoDirect) mailtoDirect.href = href;
            if (mailtoBtnText) mailtoBtnText.textContent = 'Email Resume for ' + role;
        }

        roleRadios.forEach(function (radio) {
            radio.addEventListener('change', updateCareerMailto);
        });
        updateCareerMailto();

        careerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const statusDiv = document.getElementById('careerFormStatus');
            const submitBtn = document.getElementById('careerSubmitBtn');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

            // Honeypot check
            const botcheck = careerForm.querySelector('input[name="botcheck"]');
            if (botcheck && botcheck.checked) {
                console.warn('Bot detected via honeypot.');
                return;
            }

            // Input fields
            const nameInput = document.getElementById('careerName');
            const phoneInput = document.getElementById('careerPhone');
            const emailInput = document.getElementById('careerEmail');
            const expInput = document.getElementById('careerExperience');
            const selectedRadio = careerForm.querySelector('input[name="status"]:checked');
            const role = selectedRadio ? selectedRadio.value : 'Web Developer';
            const detailsInput = document.getElementById('careerDetails');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim().replace(/[^0-9]/g, '') : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const experience = expInput ? expInput.value.trim() : '';
            const details = detailsInput ? detailsInput.value.trim() : '';

            // Client-side validations
            if (name.length < 2) {
                showFormAlert(statusDiv, 'error', 'Please enter your full legal name.');
                if (nameInput) nameInput.focus();
                return;
            }

            if (phone.length !== 10) {
                showFormAlert(statusDiv, 'error', 'Please enter a valid 10-digit mobile number.');
                if (phoneInput) phoneInput.focus();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormAlert(statusDiv, 'error', 'Please enter a valid email address.');
                if (emailInput) emailInput.focus();
                return;
            }

            if (experience === '' || isNaN(experience) || Number(experience) < 0) {
                showFormAlert(statusDiv, 'error', 'Please enter your years of relevant experience.');
                if (expInput) expInput.focus();
                return;
            }

            if (details.length < 5) {
                showFormAlert(statusDiv, 'error', 'Please provide a brief summary of your background and technical skills.');
                if (detailsInput) detailsInput.focus();
                return;
            }

            // Disable button & show spinner
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Submitting Application...</span>';
            }

            if (statusDiv) {
                statusDiv.style.display = 'none';
            }

            const payload = {
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: 'gitCoreX Career Application: ' + role + ' - ' + name,
                from_name: 'gitCoreX Careers',
                name: name,
                phone: phone,
                email: email,
                position: role,
                experience: experience + ' Year(s)',
                background_and_skills: details,
                botcheck: botcheck && botcheck.checked ? 'true' : ''
            };

            try {
                const response = await fetch(WEB3FORMS_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.status === 200 && data.success) {
                    careerForm.reset();
                    updateCareerMailto();
                    const mailtoSubject = encodeURIComponent('gitCoreX Career Application Resume - ' + role);
                    showFormAlert(
                        statusDiv,
                        'success',
                        '<strong>Thank you, ' + escapeHtml(name) + '!</strong> Your application for <strong>' + escapeHtml(role) + '</strong> has been submitted.<br><br><strong>Next Step:</strong> Please <a href="mailto:gitcorex26@gmail.com?subject=' + mailtoSubject + '">email your resume to gitcorex26@gmail.com</a> with subject <em>"gitCoreX Career Application Resume - ' + escapeHtml(role) + '"</em> to complete your application.'
                    );
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (err) {
                console.error('Web3Forms Error:', err);
                showFormAlert(
                    statusDiv,
                    'error',
                    '<strong>Application submission could not be completed right now.</strong> Please email your resume and details directly to <a href="mailto:gitcorex26@gmail.com">gitcorex26@gmail.com</a> or contact us at <a href="tel:+919900020043">+91 9900020043</a>.'
                );
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    }

});