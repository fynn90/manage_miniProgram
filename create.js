const readline = require('readline');
const fs = require('fs');
const path = require('path');
const {
  checkOrCreateDir,
  modifyProjectConfig,
  modifyConfig,
  checkTemplate,
  copyFile,
  templateFolder,
  targetFolder
} = require('./common.js')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>'
})
const tmptProject = 'wx_17904';
const config = {
  shopid: '',
  appid: '',
  projectname: ''
};

var projects = fs.readFileSync('./projects.json');
projects = projects.toString();
projects = JSON.parse(projects);
rl.prompt();
rl.question("请输入shopid: ", (answer) => {
  rl.prompt();
  config.shopid = answer;
  rl.question("请输入 appid: ", (answer) => {
    config.appid = answer;
    rl.prompt();
    rl.question("请输入 projectname: ", (answer) => {
      config.projectname = answer;
      rl.close();
    });
  });
});
rl.on('close', (input) => {
  init();
});
/**
 * 项目初始化
 */
function init() {
  if (!!projects[config.projectname]) {
    rl.prompt();
    rl.question(config.projectname + "已存在 请重新输入个 projectname: ", (answer) => {
      config.projectname = answer;
      rl.close();
    });
  } else {
    checkOrCreateDir(path.resolve(__dirname), targetFolder);
    checkOrCreateDir(path.resolve(__dirname, targetFolder), config.projectname);
    let templateFolderPath = path.resolve(__dirname, templateFolder);
    let targetFolderPath = path.resolve(__dirname, targetFolder, './' + config.projectname);
    checkTemplate(templateFolderPath, targetFolderPath);
    modifyProjectConfig(targetFolderPath, config);
    modifyConfig(targetFolderPath, config);
    projects[config.projectname] = {
      "shopid": config.shopid,
      "appid": config.appid,
      "projectname": config.projectname
    };
    let str = JSON.stringify(projects);
    fs.writeFile('./projects.json', str, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('project.config.json 修改成功！');
    })
  }
}

