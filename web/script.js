// 元素选择器
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');
const navItems = document.querySelectorAll('.nav-link');

// 触摸事件参数
let touchStartX = 0;
let touchStartY = 0;
const swipeThreshold = 50;
const swipeAngleThreshold = 30;

// 菜单状态切换
function toggleMenu() {
    const isActive = !navLinks.classList.contains('active');
    
    // 切换样式
    menuToggle.classList.toggle('active', isActive);
    navLinks.classList.toggle('active', isActive);
    menuOverlay.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
    
    // ARIA 状态更新
    menuToggle.setAttribute('aria-expanded', isActive);
    navLinks.setAttribute('aria-hidden', !isActive);
    
    // 重置触摸位置
    touchStartX = 0;
    touchStartY = 0;
}

// 点击事件监听
menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// 外部点击关闭
document.addEventListener('click', (e) => {
    const isMenuOpen = navLinks.classList.contains('active');
    const clickInside = navLinks.contains(e.target) || menuToggle.contains(e.target);
    
    if (isMenuOpen && !clickInside) {
        toggleMenu();
    }
});

// ESC键关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// 窗口resize处理
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

// 菜单项点击处理
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// 触摸事件处理
document.addEventListener('touchstart', (e) => {
    if (!navLinks.classList.contains('active')) return;
    
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    if (!navLinks.classList.contains('active')) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI;

    // 阻止垂直滚动
    if (angle < swipeAngleThreshold || angle > 180 - swipeAngleThreshold) {
        e.preventDefault();
    }
});

document.addEventListener('touchend', (e) => {
    if (!navLinks.classList.contains('active')) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI);

    // 滑动关闭判断
    if (absDeltaX > swipeThreshold && absDeltaY < swipeThreshold) {
        if (deltaX < 0 && angle < swipeAngleThreshold) { // 向左滑动
            toggleMenu();
        } else if (deltaX > 0 && e.target === menuOverlay) { // 向右滑动遮罩层
            toggleMenu();
        }
    }
});
