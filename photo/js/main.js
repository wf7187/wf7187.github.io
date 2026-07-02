// 图片数组：填写你 images 文件夹内的图片文件名
const imgList = [
    "pic1.jpg",
    "pic2.png",
    "pic3.webp",
    "pic4.jpeg"
];

const gallery = document.getElementById("gallery");
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");
const searchInput = document.getElementById("searchInput");

// 渲染图片列表
function renderImages(list) {
    gallery.innerHTML = "";
    list.forEach(name => {
        const card = document.createElement("div");
        card.className = "img-card";
        card.dataset.src = `./images/${name}`;
        card.innerHTML = `
            <img src="./images/${name}" alt="${name}">
            <div class="img-name">${name}</div>
        `;
        // 点击弹窗放大
        card.onclick = () => {
            modal.style.display = "block";
            modalImg.src = card.dataset.src;
        };
        gallery.appendChild(card);
    });
}

// 初始渲染全部图片
renderImages(imgList);

// 关闭弹窗
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
};

// 搜索过滤
searchInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filterList = imgList.filter(name => name.toLowerCase().includes(keyword));
    renderImages(filterList);
});