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
    document.body.classList.toggle('menu-open', isActive);
    
    // ARIA 状态更新
    menuToggle.setAttribute('aria-expanded', isActive);
    navLinks.setAttribute('aria-hidden', !isActive);
    
    // 重置触摸位置
    touchStartX = 0;
    touchStartY = 0;
}

// 事件监听
menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

document.addEventListener('click', (e) => {
    const isMenuOpen = navLinks.classList.contains('active');
    const clickInsideMenu = navLinks.contains(e.target);
    const clickOnToggle = menuToggle.contains(e.target);

    if (isMenuOpen && !clickInsideMenu && !clickOnToggle) {
        toggleMenu();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});

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
    const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI);

    if (angle < swipeAngleThreshold || angle > 180 - swipeAngleThreshold) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchend', (e) => {
    if (!navLinks.classList.contains('active')) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    const angle = Math.abs(Math.atan2(deltaY, deltaX) * 180 / Math.PI);

    if (absDeltaX > swipeThreshold && absDeltaY < swipeThreshold) {
        if (deltaX < 0 && angle < swipeAngleThreshold) {
            toggleMenu();
        } else if (deltaX > 0 && e.target === menuOverlay) {
            toggleMenu();
        }
    }
});
