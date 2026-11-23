document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Acordeão do FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = header.nextElementSibling;

            // Fechar outros itens abertos (opcional)
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                if (accItem !== item) {
                    accItem.classList.remove('active');
                    accItem.querySelector('.accordion-body').style.maxHeight = null;
                }
            });

            // Alternar estado atual
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                body.style.maxHeight = null;
            }
        });
    });

    // 3. Validação do Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');

        // Validação simples
        if (name.value.trim() === '') {
            setError(name, 'Por favor, insira seu nome.');
            isValid = false;
        } else {
            setSuccess(name);
        }

        if (email.value.trim() === '') {
            setError(email, 'Por favor, insira seu e-mail.');
            isValid = false;
        } else if (!isEmailValid(email.value)) {
            setError(email, 'Por favor, insira um e-mail válido.');
            isValid = false;
        } else {
            setSuccess(email);
        }

        if (phone.value.trim() === '') {
            setError(phone, 'Por favor, insira seu telefone.');
            isValid = false;
        } else {
            setSuccess(phone);
        }

        if (message.value.trim() === '') {
            setError(message, 'Por favor, escreva sua mensagem.');
            isValid = false;
        } else {
            setSuccess(message);
        }

        if (isValid) {
            successMsg.style.display = 'block';
            contactForm.reset();
            // Remover estilos de sucesso após alguns segundos
            setTimeout(() => {
                successMsg.style.display = 'none';
                document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
                    input.style.borderColor = '#E2E8F0';
                });
            }, 5000);
        }
    });

    function setError(input, message) {
        const formGroup = input.parentElement;
        const errorSmall = formGroup.querySelector('.error-msg');
        errorSmall.innerText = message;
        input.style.borderColor = '#ef4444';
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        const errorSmall = formGroup.querySelector('.error-msg');
        errorSmall.innerText = '';
        input.style.borderColor = '#10b981';
    }

    function isEmailValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});