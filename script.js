// ========== MENU HAMBURGER ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== TEMA CLARO / ESCURO ==========
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// ========== VALIDAÇÃO DO FORMULÁRIO ==========
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Limpar mensagens de erro anteriores
    clearErrors();
    
    let isValid = true;
    
    // Pegar valores
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    
    // Validação do Nome
    if (nome === '') {
        showError('error-nome', 'Por favor, informe seu nome.');
        isValid = false;
    }
    
    // Validação do Email
    if (email === '') {
        showError('error-email', 'Por favor, informe seu e-mail.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('error-email', 'Por favor, informe um e-mail válido.');
        isValid = false;
    }
    
    // Validação do Assunto
    if (assunto === '') {
        showError('error-assunto', 'Por favor, informe o assunto.');
        isValid = false;
    }
    
    // Validação da Mensagem
    if (mensagem === '') {
        showError('error-mensagem', 'Por favor, escreva sua mensagem.');
        isValid = false;
    }
    
    // Se tudo estiver válido
    if (isValid) {
        // Simulação de envio
        formMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        // Limpar formulário
        form.reset();
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }, 5000);
    } else {
        formMessage.textContent = 'Por favor, corrija os erros acima.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');
    
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== FECHAR MENU AO CLICAR FORA (MOBILE) ==========
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Bônus: Destacar link ativo no menu conforme scroll
window.addEventListener('scroll', () => {
    const sections = ['sobre', 'formacao', 'portfolio', 'contato'];
    let current = 'home';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = sectionId;
            }
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});