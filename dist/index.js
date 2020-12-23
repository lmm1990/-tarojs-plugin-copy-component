"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const fs_1 = require("fs");
const FileUtil_1 = require("./FileUtil");
exports.default = (ctx, pluginOpts) => {
    /**
     * 开始编译
     */
    ctx.onBuildStart(() => {
        console.log(`source components path:${pluginOpts.componentsPath}`);
        let { sourcePath } = ctx.paths;
        sourcePath = sourcePath.replace(/\\/g, "/");
        if (sourcePath[sourcePath.length - 1] === '/') {
            sourcePath = sourcePath.substring(0, sourcePath.length - 2);
        }
        let formPath = pluginOpts.componentsPath.replace(/\\/g, "/");
        if (formPath[formPath.length - 1] === '/') {
            formPath = formPath.substring(0, formPath.length - 2);
        }
        //读取配置文件列表
        const configFileList = glob.sync('**/components.json', {
            cwd: sourcePath
        });
        configFileList.forEach((item) => {
            const configPath = `${sourcePath}/${item}`;
            copyComponents(configPath, formPath);
        });
        console.log('build start');
    });
    ctx.onBuildFinish(() => {
        console.log('build finish');
    });
};
/**
 * 复制组件
 * @param configPath 配置文件路径
 * @param fromPath 源路径
 * @param toPath 目标路径
 */
function copyComponents(configPath, fromPath) {
    let toPath = configPath.substring(0, configPath.lastIndexOf('/'));
    const config = fs_1.readFileSync(configPath, "utf-8");
    const configList = JSON.parse(config);
    configList.forEach((item) => {
        if (item.from[0] !== '/') {
            throw new Error(`config file：${configPath}，from：${item.from} must be / start`);
        }
        if (item.to[0] !== '/') {
            throw new Error(`config file：${configPath}，to：${item.to} must be / start`);
        }
        let length = item.from.length;
        if (item.from[length - 1] === '/') {
            item.from = item.from.substring(0, length - 2);
        }
        length = item.to.length;
        if (item.to[length - 1] === '/') {
            item.to = item.to.substring(0, length - 2);
        }
        const tempFromPath = `${fromPath}${item.from}`;
        let tempToPath = `${toPath}${item.to}`;
        tempToPath = `${tempToPath}/${tempFromPath.substring(tempFromPath.lastIndexOf('/') + 1)}`;
        //删除target目录
        FileUtil_1.delDir(tempToPath);
        FileUtil_1.makeDir(tempToPath);
        FileUtil_1.copyFile(tempFromPath, tempToPath);
        console.log(`copy plugin from:${tempFromPath} to:${tempToPath}`);
    });
}
//# sourceMappingURL=index.js.map