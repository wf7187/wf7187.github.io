// 生成全屏随机流星
function createShootingStars(count = 25) {
    const nightBg = document.querySelector('.night-bg');
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'shooting_star';
        const randomLeft = Math.random() * 100;
        const randomTop = Math.random() * 100;
        const delay = Math.floor(Math.random() * 9000);
        star.style.left = `${randomLeft}vw`;
        star.style.top = `${randomTop}vh`;
        star.style.animationDelay = `${delay}ms`;
        nightBg.appendChild(star);
    }
}

// 导航元素获取
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');
const navItems = document.querySelectorAll('.nav-link');
const goWorkBtn = document.getElementById('goWork');
const workItems = document.querySelectorAll('.work-item');

// 动态更新导航高度变量
function setNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);
}

// 打开/关闭移动端菜单
function toggleMenu() {
    const isActive = !navLinks.classList.contains('active');
    menuToggle.classList.toggle('active', isActive);
    navLinks.classList.toggle('active', isActive);
    menuOverlay.classList.toggle('active', isActive);
    document.body.classList.toggle('menu-open', isActive);
    menuToggle.setAttribute('aria-expanded', isActive);
    navLinks.setAttribute('aria-hidden', !isActive);
}

// 关闭菜单统一方法
function closeMenu() {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
}

// 自动抓取作品网页快照：区分两套接口
//接口说明：网页快照采用 WordPress 免费接口，国内可正常访问；若加载缓慢可替换代码内快照地址为 urlscan 接口。
//JS 读取卡片类名判断：1/2/3 号作品：WordPress 快照 s0.wp.com  4 号作品：urlscan 快照接口 urlscan.io/liveshot
function loadWorkSnapshot() {
    workItems.forEach(item => {
        const pageUrl = item.dataset.url;
        const img = item.querySelector('.snap-img');
        if (!pageUrl || !img) return;

        let snapshotSrc;
        // 带 use-urlscan 类的第四个作品使用urlscan接口
        if (item.classList.contains('use-urlscan')) {
            snapshotSrc = `https://urlscan.io/liveshot/?width=600&height=360&url=${encodeURIComponent(pageUrl)}`;
        } else {
            // 前三个使用wp接口
            snapshotSrc = `https://s0.wp.com/mshots/v1/${encodeURIComponent(pageUrl)}?w=600&h=360`;
        }

        img.src = snapshotSrc;
        // 加载失败兜底
        img.onerror = () => {
            img.style.background = '#333';
            img.alt = '快照加载失败';
        };
    });
}

// 点击卡片新标签打开链接
function bindWorkClick() {
    workItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetUrl = item.dataset.url;
            if(targetUrl){
                window.open(targetUrl, '_blank');
            }
        })
    })
}

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    setNavbarHeight();
    createShootingStars(25);
    loadWorkSnapshot();
    bindWorkClick();
});

// 窗口缩放监听
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