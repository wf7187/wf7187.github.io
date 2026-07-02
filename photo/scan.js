const fs = require("fs");
const path = require("path");

const baseImg = path.join(__dirname, "images");
const jsFile = path.join(__dirname, "js/main.js");
const folders = ["folder1","folder2","folder3","folder4","folder5","folder6"];
const allowExt = [".jpg",".jpeg",".png",".webp",".gif"];

let result = {};
folders.forEach(dir => result[dir] = []);

folders.forEach(folder => {
    const fullPath = path.join(baseImg, folder);
    if(!fs.existsSync(fullPath)) return;
    const files = fs.readdirSync(fullPath);
    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if(allowExt.includes(ext)) result[folder].push(file);
    })
})

const str = JSON.stringify(result, null, 4);
const newBlock = `// ========== 配置每个文件夹内的图片文件名（node scan.js自动生成，无需手动改） ==========
const folderImages = ${str};
`;

let jsCode = fs.readFileSync(jsFile, "utf8");
jsCode = jsCode.replace(/\/\/ ========== 配置每个文件夹内的图片文件名[\s\S]*?const folderImages = \{[\s\S]*?\};/s, newBlock);
fs.writeFileSync(jsFile, jsCode, "utf8");
console.log("✅ 所有分区图片列表已自动更新完成！");
console.log(result);