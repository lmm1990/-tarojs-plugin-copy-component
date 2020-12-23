"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootPath = exports.delDir = exports.readFilePathList = exports.makeDir = exports.copyFile = exports.exists = void 0;
const fs = require("fs");
const path = require("path");
/**
 * 验证文件/目录是否存在
 *
 * @param filePath 文件/目录路径
 */
function exists(filePath) {
    return fs.existsSync(filePath);
}
exports.exists = exists;
/**
 * 验证是否是目录
 *
 * @param filePath 文件/目录路径
 */
function isDirectory(filePath) {
    return fs.statSync(filePath).isDirectory();
}
/**
 * 复制文件
 *
 * @param formPath 源路径
 * @param toPath 目标路径
 */
function copyFile(formPath, toPath) {
    //右斜杠替换成左斜杠
    formPath = formPath.replace(/\\/g, "/");
    toPath = toPath.replace(/\\/g, "/");
    //目录补全/
    const fromPathIsDir = isDirectory(formPath);
    if (fromPathIsDir && formPath[formPath.length - 1] != '/') {
        formPath = `${formPath}/`;
    }
    if (fromPathIsDir && toPath[toPath.length - 1] != '/') {
        toPath = `${toPath}/`;
    }
    const fromFilePathList = readFilePathList(formPath);
    let toDirList = new Set();
    fromFilePathList.forEach((item) => {
        let filePath = item.replace(formPath, '');
        filePath = filePath.substring(0, filePath.lastIndexOf('/'));
        filePath = `${toPath}${filePath}`;
        if (!toDirList.has(filePath) && !exists(filePath)) {
            makeDir(filePath);
            toDirList.add(filePath);
        }
        //复制文件
        fs.copyFileSync(item, `${toPath}${item.replace(formPath, '')}`);
    });
}
exports.copyFile = copyFile;
/**
 * 递归创建目录
 */
function makeDir(filePath) {
    if (exists(filePath)) {
        return;
    }
    let tempPath;
    filePath.split("/").forEach(function (dirName) {
        if (tempPath) {
            tempPath = `${tempPath}/${dirName}`;
        }
        else {
            //如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
            if (dirName) {
                tempPath = dirName;
            }
            else {
                tempPath = "/";
            }
        }
        if (!exists(tempPath)) {
            fs.mkdirSync(tempPath);
        }
    });
}
exports.makeDir = makeDir;
/**
 * 读取文件列表
 */
function readFilePathList(filePath) {
    filePath = filePath.replace(/\\/g, "/");
    let filePathList = [];
    _readFilePathList(filePath, filePathList);
    return filePathList;
    function _readFilePathList(filePath, filePathList) {
        const isDir = isDirectory(filePath);
        if (!isDir) {
            filePathList.push(filePath);
            return;
        }
        if (filePath[filePath.length - 1] != '/') {
            filePath = `${filePath}/`;
        }
        fs.readdirSync(filePath, {
            encoding: "utf8"
        }).forEach((file) => {
            _readFilePathList(`${filePath}${file}`, filePathList);
        });
    }
}
exports.readFilePathList = readFilePathList;
/**
 * 删除目录
 */
function delDir(filePath) {
    if (!exists(filePath)) {
        return;
    }
    fs.readdirSync(filePath).forEach((file) => {
        let curPath = `${filePath}/${file}`;
        if (fs.statSync(curPath).isDirectory()) {
            delDir(curPath); //递归删除文件夹
        }
        else {
            fs.unlinkSync(curPath); //删除文件
        }
    });
    fs.rmdirSync(filePath);
}
exports.delDir = delDir;
/**
 * 获得项目根目录
 *
 * @param relativePath 相对路径
 */
function getRootPath(relativePath = '../') {
    return path.join(__dirname, relativePath);
}
exports.getRootPath = getRootPath;
// var start = new Date().getTime();
// delDir("F:\\a2")
// copyFile("F:\\a", "F:\\a2").then(() => {
// 	console.log("copy ok");
// 	console.log("consume time:" + (new Date().getTime() - start))
// }, (err) => {
// 	console.log("error ocur");
// 	console.dir(err);
// });
//# sourceMappingURL=FileUtil.js.map