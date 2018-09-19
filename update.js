const {
  checkOrCreateDir,
  modifyProjectConfig,
  modifyConfig,
  checkTemplate,
  copyFile,
  templateFolder,
  targetFolder
} = require('./common.js')
const fs = require('fs');
const path = require('path');

var projects = fs.readFileSync('./projects.json');
projects = projects.toString();
projects = JSON.parse(projects);

for (let key of Object.keys(projects)) {
  checkOrCreateDir(path.resolve(__dirname, targetFolder), key);
  let templateFolderPath = path.resolve(__dirname, templateFolder);
  let targetFolderPath = path.resolve(__dirname, targetFolder, './' + key);
  checkTemplate(templateFolderPath, targetFolderPath);
  let config = projects[key];
  modifyProjectConfig(targetFolderPath, config);
  modifyConfig(targetFolderPath, config);
}
