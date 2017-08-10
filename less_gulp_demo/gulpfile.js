//最基本的写法是把所有任务配置在此文件里，我们这里做一层分离，用require-dir引入gulp/tasks里的任务
var requireDir = require('require-dir');  
requireDir('./gulp/tasks', { recurse: true});