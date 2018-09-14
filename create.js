const readline = require('readline');
const fs = require('fs');
const path = require('path');
const templateFolder = './template';
const targetFolder = './miniprogram';
const templateProjectConfig = './template.project.config.json'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>'
})
const config = {
  shopid: '',
  appid: '',
  projectname: ''
}
// rl.prompt();
// rl.question("请输入shopid: ", (answer) => {
//   rl.prompt();
//   config.shopid = answer;
//   rl.question("请输入 appid: ", (answer) => {
//     config.appid = answer;
//     rl.prompt();
//     rl.question("请输入 projectname: ", (answer) => {
//       config.projectname = answer;
//       rl.close();
//     });
//   });
// });
rl.on('close', (input) => {
  console.log(config);
  // copy(templateFolder);
});
copy(templateFolder);
function copy(address) {
  let arr = fs.readdirSync(address);
  console.log(arr);
}
