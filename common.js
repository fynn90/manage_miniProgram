const fs = require('fs');
const path = require('path');
const ignoreItem = []; // 需要忽略的文件或目录
/**
 * 检查目录是否已经存在 是否创建新的目录
 * @param {*} dirPath 目标 绝对路径
 * @param {*} dir 目标目录名
 * @param {*} create 如果不存在是否创建新目录 默认是创建
 */
function checkOrCreateDir(dirPath, dir, create = true) {
  let target = path.resolve(dirPath, './' + dir);
  let dirStatus = fs.existsSync(target);
  if (!dirStatus && create) {
    fs.mkdir(target, () => {
      console.log(dir, '文件夹创建成功!')
    });
    return true;
  } else {
    return dirStatus;
  }
}


/**
 * 修改 小程序自己的 配置文件
 * @param targetPath 配置文件路径
 * @param config 配置对象 appid, projectname
 */
function modifyProjectConfig(targetPath, config) {
  let item = path.resolve(targetPath, './project.config.json');
  fs.readFile(item, (err, data) => {
    let projectConfig = data.toString();
    projectConfig = JSON.parse(projectConfig);
    projectConfig['appid'] = config.appid;
    projectConfig['projectname'] = config.projectname;

    var str = JSON.stringify(projectConfig);
    fs.writeFile(item, str, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('project.config.json 修改成功！');
    })
  })
};

/**
 * 修改 新建项目 config 配置文件 该文件用来保存 项目通用的全局变量 比如：shopid
 * @param {*} targetPath 目标项目 绝对路径
 * @param shopid 配置对象 shopid
 */
function modifyConfig(targetPath, config) {
  let item = path.resolve(targetPath, './config.js');
  fs.writeFile(item, `export const shop_id = ${config.shopid};export const qqMapKey = 'SWLBZ-WKWCJ-SKLFP-FBAGY-2M3WE-SBFAI';`, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('config.js 操作成功！');
  })
}



/**
 * 循环遍历 模板目录 拷贝到新项目中
 * templatePath 模板 绝对路径路径
 * targetPath 目标 绝对路径 
 */
function checkTemplate(templatePath, targetPath) {
  let arr = fs.readdirSync(templatePath);
  for (let i = 0, l = arr.length; i < l; i++) {
    let itemPath = path.resolve(templatePath, './' + arr[i]); // 模板 文件或目录 路径
    let targetItemPath = path.resolve(targetPath, './' + arr[i]); // 目标项目 文件或目录 路径
    let fileStatus = fs.statSync(itemPath).isFile();
    if (ignoreItem.includes(arr[i])) continue;
    if (fileStatus) {
      copyFile(itemPath, targetItemPath)
    } else {
      let status = checkOrCreateDir(targetPath, arr[i], true);
      if (status) {
        checkTemplate(itemPath, targetItemPath)
      };
    }
  }
}

/**
 * 拷贝文件
 * @param {*} src  源文件路径
 * @param {*} target 目标文件路径
 */
function copyFile(src, target) {
  fs.copyFileSync(src, target);
  console.log(target, '文件创建成功!')
}
const templateFolder = './template';
const targetFolder = './miniprogram';

module.exports = {
  checkOrCreateDir,
  modifyProjectConfig,
  modifyConfig,
  checkTemplate,
  copyFile,
  templateFolder,
  targetFolder
}