// 图片文件夹配置（node scan.js自动更新图片列表）
const folderImages = {
    folder1: ["1-1.jpg", "1-2.jpg", "1-3.jpg", "1-4.jpg"],
    folder2: ["2-1.jpg", "2-2.jpg", "2-3.jpg"],
    folder3: ["3-1.jpg", "3-2.jpg", "3-3.jpg", "3-4.jpg", "3-5.jpg"],
    folder4: ["4-1.jpg", "4-2.jpg"],
    folder5: ["5-1.jpg", "5-2.jpg", "5-3.jpg"],
    folder6: ["6-1.jpg", "6-2.jpg", "6-3.jpg", "6-4.jpg"]
};

// 大图弹窗逻辑
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close-btn");
closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};

// 遍历6个独立轮播分区
document.querySelectorAll(".carousel-box").forEach(box => {
    const folderName = box.dataset.folder;
    const imgArr = folderImages[folderName];
    const listWrap = box.querySelector(".carousel-list");
    const prevBtn = box.querySelector(".prev");
    const nextBtn = box.querySelector(".next");
    const carouselWrap = box.querySelector(".carousel");

    const showNum = 3; // 每个分区固定同时显示3张图片
    const autoIntervalTime = 3000;
    let offset = 0;
    const maxOffset = imgArr.length - showNum;
    // 双倍数组实现无缝顺序循环，滑到末尾平滑衔接第一张，无生硬跳转
    const loopImgList = [...imgArr, ...imgArr];

    // 渲染全部图片
    loopImgList.forEach((name, index) => {
        const item = document.createElement("div");
        item.className = "carousel-item";
        item.dataset.index = index % imgArr.length;
        const src = `./images/${folderName}/${name}`;
        item.innerHTML = `
            <div class="carousel-image-wrap">
                <img src="${src}" alt="${name}" loading="lazy">
            </div>
        `;
        // 点击图片弹出全屏预览
        item.querySelector("img").addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = src;
        });
        listWrap.appendChild(item);
    });

    // 标记当前分区居中图片，添加center样式类
    function updateCenterImage() {
        const items = listWrap.querySelectorAll(".carousel-item");
        const realCenterIdx = offset + Math.floor(showNum / 2);
        items.forEach((item, idx) => {
            const realIdx = idx % imgArr.length;
            const targetRealIdx = realCenterIdx % imgArr.length;
            item.classList.toggle("center", realIdx === targetRealIdx);
        });
    }

    // 百分比位移滚动，完全跟随分区宽度自适应
    function updateTranslate() {
        const movePercent = offset * (100 / showNum);
        listWrap.style.transition = "transform 0.4s ease";
        listWrap.style.transform = `translateX(-${movePercent}%)`;
        updateCenterImage();
    }

    // 无缝无动画重置位置，肉眼无感
    function resetPosition() {
        listWrap.style.transition = "none";
        offset = 0;
        listWrap.style.transform = "translateX(0%)";
        listWrap.offsetHeight;
        listWrap.style.transition = "transform 0.4s ease";
        updateCenterImage();
    }

    // 上一张按钮
    prevBtn.addEventListener("click", () => {
        offset--;
        updateTranslate();
    });
    // 下一张按钮，一轮播放完成自动无缝重置
    nextBtn.addEventListener("click", () => {
        offset++;
        if (offset >= imgArr.length) setTimeout(resetPosition, 400);
        updateTranslate();
    });

    // 自动轮播定时器
    let autoTimer;
    function startAutoPlay() {
        autoTimer = setInterval(() => {
            offset++;
            if (offset >= imgArr.length) setTimeout(resetPosition, 400);
            updateTranslate();
        }, autoIntervalTime);
    }
    function stopAutoPlay() {
        clearInterval(autoTimer);
    }
    startAutoPlay();
    // 鼠标移入暂停自动播放，移出恢复
    carouselWrap.addEventListener("mouseenter", stopAutoPlay);
    carouselWrap.addEventListener("mouseleave", startAutoPlay);

    // 页面初始化加载居中状态
    updateTranslate();
});