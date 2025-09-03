document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA DARK/LIGHT MODE TOGGLE ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Fungsi untuk menerapkan tema
    function applyTheme(theme) {
        if (theme === 'light') {
            htmlElement.setAttribute('data-theme', 'light');
            themeToggleButton.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggleButton.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }
    
    // Cek tema yang tersimpan di localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default ke dark
    applyTheme(savedTheme);

    // Event listener untuk tombol
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    });


    // --- LOGIKA EFEK TYPEWRITER ---
    const taglineElement = document.getElementById('tagline');
    if (taglineElement) {
        const roles = ["Seorang Web Developer", "Cybersecurity Enthusiast", "Pelajar SMKN 1 Surabaya"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            const currentText = isDeleting ? currentRole.substring(0, charIndex - 1) : currentRole.substring(0, charIndex + 1);
            
            taglineElement.textContent = currentText;
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

            let typeSpeed = 150;
            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }


    // --- LOGIKA MENU HAMBURGER ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Menutup menu saat link di-klik (untuk single page)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            }
        });
    });


    // --- LOGIKA HIGHLIGHT NAV-LINK SAAT SCROLL ---
    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 75) {
                current = section.getAttribute('id');
            }
        });
        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') == '#' + current) {
                a.classList.add('active');
            }
        });
    });

    // --- LOGIKA ANIMASI SAAT SCROLL (INTERSECTION OBSERVER) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target); // Animasi hanya sekali
            }
        });
    }, { threshold: 0.15 });
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});