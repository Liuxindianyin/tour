document.addEventListener('DOMContentLoaded', function () {
    // 原有的导航菜单切换代码
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('burger-active');
    });

    // 平滑滚动代码保持不变
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 景点滑块代码保持不变
    const slides = document.querySelectorAll('.attraction-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
    nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

    showSlide(0);
    setInterval(() => showSlide(currentSlide + 1), 5000);

    // 表单提交代码保持不变
    const form = document.getElementById('booking-form');
    const debugInfo = document.getElementById('debug-info');

    form.addEventListener('submit', function (e) {
        // ... 保持原有的表单提交代码不变 ...
    });

    // 滚动触发动画代码保持不变
    const fadeInElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkFade);
    checkFade();

    // 添加星空效果
    const starfieldCanvas = document.getElementById('starfield');
    const starCtx = starfieldCanvas.getContext('2d');

    starfieldCanvas.width = window.innerWidth;
    starfieldCanvas.height = window.innerHeight;

    const stars = [];
    const numStars = 200;

    class Star {
        constructor() {
            this.x = Math.random() * starfieldCanvas.width;
            this.y = Math.random() * starfieldCanvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > starfieldCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > starfieldCanvas.height) this.speedY *= -1;
        }

        draw() {
            starCtx.fillStyle = 'white';
            starCtx.beginPath();
            starCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            starCtx.fill();
        }
    }

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    function animateStars() {
        starCtx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }

    animateStars();

    // 添加樱花效果
    const cherryCanvas = document.getElementById('cherry-blossom');
    const cherryCtx = cherryCanvas.getContext('2d');

    cherryCanvas.width = window.innerWidth;
    cherryCanvas.height = window.innerHeight;

    const petals = [];
    const numPetals = 50;

    class Petal {
        constructor() {
            this.x = Math.random() * cherryCanvas.width;
            this.y = Math.random() * cherryCanvas.height - cherryCanvas.height;
            this.size = Math.random() * 5 + 5;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 1 + 1;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            if (this.y > cherryCanvas.height) {
                this.y = -this.size;
                this.x = Math.random() * cherryCanvas.width;
            }
        }

        draw() {
            cherryCtx.save();
            cherryCtx.translate(this.x, this.y);
            cherryCtx.rotate(this.rotation * Math.PI / 180);
            cherryCtx.fillStyle = '#FFB7C5';
            cherryCtx.beginPath();
            cherryCtx.moveTo(0, 0);
            cherryCtx.quadraticCurveTo(this.size / 2, -this.size, this.size, 0);
            cherryCtx.quadraticCurveTo(this.size / 2, this.size / 3, 0, 0);
            cherryCtx.fill();
            cherryCtx.restore();
        }
    }

    for (let i = 0; i < numPetals; i++) {
        petals.push(new Petal());
    }

    function animatePetals() {
        cherryCtx.clearRect(0, 0, cherryCanvas.width, cherryCanvas.height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animatePetals);
    }

    animatePetals();

    // 窗口大小调整时重新设置画布大小
    window.addEventListener('resize', () => {
        starfieldCanvas.width = window.innerWidth;
        starfieldCanvas.height = window.innerHeight;
        cherryCanvas.width = window.innerWidth;
        cherryCanvas.height = window.innerHeight;
        stars.length = 0;
        petals.length = 0;
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
        for (let i = 0; i < numPetals; i++) {
            petals.push(new Petal());
        }
    });
});