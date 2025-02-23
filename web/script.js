// 元素选择器
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');
const navItems = document.querySelectorAll('.nav-link');

// 动态设置导航栏高度
function setNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
}

// 初始化设置
document.addEventListener('DOMContentLoaded', setNavbarHeight);
window.addEventListener('resize', setNavbarHeight);

// 菜单切换功能
function toggleMenu() {
    const isActive = !navLinks.classList.contains('active');
    
    menuToggle.classList.toggle('active', isActive);
    navLinks.classList.toggle('active', isActive);
    menuOverlay.classList.toggle('active', isActive);
    document.body.classList.toggle('menu-open', isActive);
    
    // ARIA状态更新
    menuToggle.setAttribute('aria-expanded', isActive);
    navLinks.setAttribute('aria-hidden', !isActive);
}

// 事件监听器
menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// 其他原有交互逻辑保持不变...
