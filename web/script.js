// 动态生成25颗全屏流星（数量可自行调整）
function createShootingStars(count = 25) {
    const nightBg = document.querySelector('.night-bg');
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'shooting_star';
        // 全屏随机坐标：0 ~ 100vw / 0 ~ 100vh，铺满整个屏幕
        const randomLeft = Math.random() * 100;
        const randomTop = Math.random() * 100;
        const delay = Math.floor(Math.random() * 9000);
        star.style.left = `${randomLeft}vw`;
        star.style.top = `${randomTop}vh`;
        star.style.animationDelay = `${delay}ms`;
        nightBg.appendChild(star);
    }
}

// 菜单交互元素
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');
const navItems = document.querySelectorAll('.nav-link');
const goWorkBtn = document.getElementById('goWork');

// 动态设置导航栏高度变量
function setNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
}

// 菜单切换
function toggleMenu() {
    const isActive = !navLinks.classList.contains('active');
    menuToggle.classList.toggle('active', isActive);
    navLinks.classList.toggle('active', isActive);
    menuOverlay.classList.toggle('active', isActive);
    document.body.classList.toggle('menu-open', isActive);
    menuToggle.setAttribute('aria-expanded', isActive);
    navLinks.setAttribute('aria-hidden', !isActive);
}

// 关闭菜单
function closeMenu() {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
}

// 页面加载初始化
document.addEventListener('DOMContentLoaded', () => {
    setNavbarHeight();
    createShootingStars(25);
});

// 窗口缩放更新导航高度+大屏自动关菜单
window.addEventListener('resize', () => {
    setNavbarHeight();
    if (window.innerWidth > 768) closeMenu();
});

// 事件绑定
menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', closeMenu);
navItems.forEach(item => item.addEventListener('click', closeMenu));
goWorkBtn.addEventListener('click', () => {
    document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
});