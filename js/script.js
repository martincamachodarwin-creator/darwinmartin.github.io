// Agrega al inicio del archivo para verificar EmailJS
console.log('EmailJS cargado:', typeof emailjs !== 'undefined');

// Verifica que el formulario existe
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    console.log('Formulario encontrado:', !!form);
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Formulario enviado - prevenido recarga');
        });
    }
});
// Configuración de GitHub
const GITHUB_USERNAME = 'martincamachodarwin-creator';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

// Cargar proyectos desde GitHub
async function loadProjects() {
    const container = document.getElementById('projects-container');
    
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error('Error al cargar proyectos');
        
        const projects = await response.json();
        
        if (projects.length === 0) {
            container.innerHTML = '<div class="loading">No se encontraron proyectos públicos.</div>';
            return;
        }
        
        container.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-content">
                    <h3>${project.name}</h3>
                    <p>${project.description || 'Proyecto de desarrollo backend'}</p>
                    
                    <div class="project-tech">
                        ${project.language ? `<span>${project.language}</span>` : ''}
                        <span>GitHub</span>
                    </div>
                    
                    <div class="project-links">
                        <a href="${project.html_url}" target="_blank" class="btn btn-outline">
                            <i class="fab fa-github"></i> Ver Código
                        </a>
                        ${project.homepage ? `
                            <a href="${project.homepage}" target="_blank" class="btn btn-primary">
                                <i class="fas fa-external-link-alt"></i> Ver Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = `
            <div class="loading">
                Error al cargar proyectos. <a href="https://github.com/${GITHUB_USERNAME}" target="_blank">Ver GitHub</a>
            </div>
        `;
    }
}

// Menu móvil
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form submission
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
             // Obtener el botón de submit dentro del formulario
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

           // Mostrar estado de carga
            submitBtn.textContent = 'Enviando...';
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;

             // Verificar que EmailJS esté cargado
            if (typeof emailjs === 'undefined') {
                alert('Error: EmailJS no está cargado correctamente');
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
                return;
            }
            
            // Enviar email con EmailJS
            emailjs.send('service_sa64f2f', 'template_esq952r', {
                from_name: form.name.value,
                from_email: form.email.value,
                subject: form.subject.value,
                message: form.message.value,
                to_email: 'martincamachodarwin@gmail.com',
                date: new Date().toLocaleString('es-ES')
            })
            .then(function(response) {
                console.log('Email enviado con éxito!', response.status, response.text);
                
                // Mostrar mensaje de éxito
                alert('✅ ¡Mensaje enviado! Te responderé en breve.');
                
                // Limpiar formulario
                form.reset();
            })
            .catch(function(error) {
                console.error('Error al enviar email:', error);
                
                // Mostrar mensaje de error
                alert('❌ Error al enviar el mensaje. Por favor, intenta nuevamente.');
            })
            .finally(function() {
                // Restaurar botón
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
            });
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
});

// Animaciones al hacer scroll
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    document.querySelectorAll('.skill-category, .project-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Toggle de tema
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    setupSmoothScroll();
    setupContactForm();
    setupAnimations();
    setupThemeToggle();
    loadProjects();
    
    // Mostrar niveles de habilidad con animación
    setTimeout(() => {
        document.querySelectorAll('.skill-level-fill').forEach(skill => {
            skill.style.width = skill.style.width;
        });
    }, 500);
});

// Efecto de parallax suave en el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});