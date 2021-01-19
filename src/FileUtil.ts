import * as fs from 'fs'
import * as path from 'path'

/**
 * 验证文件/目录是否存在
 * 
 * @param filePath 文件/目录路径
 */
export function exists(filePath: string): boolean {
	return fs.existsSync(filePath)
}

/**
 * 验证是否是目录
 * 
 * @param filePath 文件/目录路径
 */
export function isDirectory(filePath: string): boolean {
	return fs.statSync(filePath).isDirectory();
}

/**
 * 复制文件
 * 
 * @param formPath 源路径
 * @param toPath 目标路径
 */
export function copyFile(formPath: string, toPath: string) {
	//右斜杠替换成左斜杠
	formPath = formPath.replace(/\\/g, "/");
	toPath = toPath.replace(/\\/g, "/");

	//目录补全/
	const fromPathIsDir = isDirectory(formPath);
	if (fromPathIsDir && formPath[formPath.length - 1] != '/') {
		formPath = `${formPath}/`
	}
	if (fromPathIsDir && toPath[toPath.length - 1] != '/') {
		toPath = `${toPath}/`
	}
	if(!fromPathIsDir){
		//复制文件
		fs.copyFileSync(formPath, `${toPath}/${formPath.substring(formPath.lastIndexOf('/') + 1)}`)
		return;
	}
	const fromFilePathList: string[] = readFilePathList(formPath)

	let toDirList: Set<string> = new Set<string>()
	fromFilePathList.forEach((item) => {
		let filePath = item.replace(formPath, '');
		filePath = filePath.substring(0, filePath.lastIndexOf('/'))
		filePath = `${toPath}${filePath}`;
		if (!toDirList.has(filePath) && !exists(filePath)) {
			makeDir(filePath)
			toDirList.add(filePath)
		}
		//复制文件
		fs.copyFileSync(item, `${toPath}${item.replace(formPath, '')}`)
	})
}

/**
 * 递归创建目录
 */
export function makeDir(filePath: string) {
	if (exists(filePath)) {
		return
	}
	let tempPath: string;
	filePath.split("/").forEach(function (dirName) {
		if (tempPath) {
			tempPath = `${tempPath}/${dirName}`;
		}
		else {
			//如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
			if (dirName) {
				tempPath = dirName;
			} else {
				tempPath = "/";
			}
		}
		if (!exists(tempPath)) {
			fs.mkdirSync(tempPath)
		}
	});
}

/**
 * 读取文件列表
 */
export function readFilePathList(filePath: string) {
	filePath = filePath.replace(/\\/g, "/");
	let filePathList: string[] = [];
	_readFilePathList(filePath, filePathList);
	return filePathList;

	function _readFilePathList(filePath: string, filePathList: string[]) {
		const isDir = isDirectory(filePath);
		if (!isDir) {
			filePathList.push(filePath);
			return;
		}
		if (filePath[filePath.length - 1] != '/') {
			filePath = `${filePath}/`
		}
		fs.readdirSync(filePath, {
			encoding: "utf8"
		}).forEach((file: string) => {
			_readFilePathList(`${filePath}${file}`, filePathList)
		});
	}
}

/**
 * 删除目录
 */
export function delDir(filePath: string) {
	if (!exists(filePath)) {
		return
	}
	fs.readdirSync(filePath).forEach((file) => {
		let curPath = `${filePath}/${file}`;
		if (fs.statSync(curPath).isDirectory()) {
			delDir(curPath); //递归删除文件夹
		} else {
			fs.unlinkSync(curPath); //删除文件
		}
	});
	fs.rmdirSync(filePath);
}

/**
 * 删除文件
 * @param filePath 文件路径
 */
export function delFile(filePath:string){
	if(!exists(filePath)){
		return
	}
	fs.unlinkSync(filePath)
}

/**
 * 获得项目根目录
 * 
 * @param relativePath 相对路径
 */
export function getRootPath(relativePath: string = '../') {
	return path.join(__dirname, relativePath);
}
// var start = new Date().getTime();
// delDir("F:\\a2")
// copyFile("F:\\a", "F:\\a2").then(() => {
// 	console.log("copy ok");
// 	console.log("consume time:" + (new Date().getTime() - start))
// }, (err) => {
// 	console.log("error ocur");
// 	console.dir(err);
// });