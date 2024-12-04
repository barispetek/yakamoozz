// Menü bağlantıları ile smooth scroll işlevi
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        const headerHeight = document.querySelector('.header-full-width').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// 'Scroll Down' butonu ile smooth scroll işlevi
const scrollDownBtn = document.querySelector('.scrollDown a');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector('#aircraft');
        const headerHeight = document.querySelector('.header-full-width').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
}

// Header'ın renk değişimi ve navlink aktif durumu
const header = document.querySelector('.header-full-width');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 50);

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href').slice(1) === currentSection
            );
        });
    });
});

// Bölüm görünürlük efekti
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.2 }
);

sections.forEach(section => observer.observe(section));

// Tema değiştirme butonu
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
    });
}

// Scroll-to-Top Butonu
const scrollToTopBtn = document.getElementById('scroll-to-top');
if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Bölüm görünürlük kontrolü (scroll ile)
const revealSection = () => {
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 150) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealSection);
revealSection();

// Carousel işlevselliği (Aircraft Cards)
const carouselContainer = document.querySelector('.carousel-container');
const cards = document.querySelectorAll('.aircraft-card');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');
let currentIndex = 0;

const updateCards = () => {
    cards.forEach((card, index) => {
        if (index === currentIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
};

const showNextCard = () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Döngüsel geçiş için başa dön
    }
    updateCards();
};

const showPrevCard = () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = cards.length - 1; // Döngüsel geçiş için sona dön
    }
    updateCards();
};

rightArrow.addEventListener('click', showNextCard);
leftArrow.addEventListener('click', showPrevCard);

updateCards();

// Arşiv Kaydırıcı işlevselliği
const slides = document.querySelectorAll('.archive-slide');
let currentSlideIndex = 0;

const changeSlide = () => {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        }
    });
};

const showNextSlide = () => {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length; 
    changeSlide();
};

const showPrevSlide = () => {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length; 
    changeSlide();
};

const leftArrowArchive = document.querySelector('.archive-prev');
const rightArrowArchive = document.querySelector('.archive-next');

if (leftArrowArchive) {
    leftArrowArchive.addEventListener('click', showPrevSlide);
}

if (rightArrowArchive) {
    rightArrowArchive.addEventListener('click', showNextSlide);
}

setInterval(showNextSlide, 5000); 

changeSlide();

const thumbnails = document.querySelectorAll('.archive-thumbnail');
const mainImage = document.querySelector('.archive-slide img');

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        const newImageSrc = thumbnail.querySelector('img').src;
        mainImage.src = newImageSrc;
    });
});
