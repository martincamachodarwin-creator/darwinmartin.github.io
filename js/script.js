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
            console.log('📨 Formulario enviado - Iniciando proceso...');
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Estado de carga
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Verificar que EmailJS está cargado
            if (typeof emailjs === 'undefined') {
                console.error('❌ EmailJS no está cargado');
                alert('Error: EmailJS no está cargado. Recarga la página.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // Verificar que emailjs.send existe
            if (typeof emailjs.send !== 'function') {
                console.error('❌ emailjs.send no es una función');
                alert('Error: EmailJS no funciona correctamente.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // Mostrar datos que se enviarán
            const formData = {
                from_name: form.name.value,
                from_email: form.email.value,
                subject: form.subject.value,
                message: form.message.value,
                to_email: 'martincamachodarwin@gmail.com',
                date: new Date().toLocaleString('es-ES')
            };
            
            console.log('📤 Datos a enviar:', formData);
            
            // Enviar email - SIN .then() en init
            emailjs.send('service_sa64f2f', 'template_esq952r', formData)
            .then(function(response) {
                console.log('✅ Email enviado con éxito!', response);
                alert('✅ ¡Mensaje enviado! Te responderé en breve.');
                form.reset();
            })
            .catch(function(error) {
                console.error('❌ Error al enviar email:', error);
                console.log('Código de error:', error.status);
                console.log('Texto de error:', error.text);
                
                if (error.status === 400) {
                    alert('❌ Error en la configuración. Verifica los IDs de EmailJS.');
                } else {
                    alert('❌ Error al enviar el mensaje. Por favor, intenta nuevamente.');
                }
            })
            .finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}


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