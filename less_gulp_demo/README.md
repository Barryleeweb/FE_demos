# 写个简单的less、watch任务的demo
[参考链接](http://www.cnblogs.com/1wen/p/4533608.html)
##  1准备：
安装全局node、npm，这个教程很多不作详细介绍；
安装全局gulp
```
npm install -g gulp
```
新建getstart文件夹，文件夹中创建package.json，记得加上{}，保存
##  2命令提示符下，到getstart文件夹里，依次安装node模块：
```
npm install --save-dev gulp
npm install --save-dev gulp-less
npm install --save-dev gulp-watch
npm install --save-dev require-dir
```
##  3根目录新建gulpfile.js 、 gulp文件夹；
gulp文件夹里再新建一个tasks文件夹和config.js文件；
tasks文件夹里创建default.js, less.js, watch.js。
tasks文件里存放对应的任务、config.js配置任务的相关配置
### gulpfile.js (gulp入口文件)
最基本的写法是把所有任务配置在此文件里，我们这里做一层分离，用require-dir引入gulp/tasks里的任务
```
var requireDir = require('require-dir');  
requireDir('./gulp/tasks', { recurse: true});
```
### config配置:
```
/* gulp命令会由gulpfile.js运行，所以src和build文件夹路径如下（根目录下） */
var src = './src';
var dest = './build';

module.exports = {
    less: {
        all: src + "/less/**/*.less",  //所有less
        src: src + "/less/*.less",     //需要编译的less
        dest: dest + "/css",　　　　　　 //输出目录
        settings: {　　　　　　　　　　　 //编译less过程需要的配置，可以为空

        }
    }
}  
```
### 编写default,默认任务
这里默认任务添加了less和watch任务:
```
var gulp = require('gulp');  
gulp.task('default', ['less','watch']); 
```
### 编写less任务
这里引入了config.js配置文件，pipe()方法会依次执行，如下首先获取less源文件、然后编译、最后输出。
```
var gulp = require('gulp'); 
var less = require('gulp-less'); 
var config = require('../config').less; 
 
gulp.task('less', function(){     
    return gulp.src(config.src)     //less源文件         
    .pipe(less(config.settings))    //执行编译        
    .pipe(gulp.dest(config.dest))    //输出目录 
}); 
```
### 编写watch任务
```
var gulp = require('gulp'); 
var watch = require('gulp-watch'); 
var config = require('../config'); 

gulp.task('watch', function(){     
   watch(config.less.all, function(){    //监听所有less         
      gulp.start('less');                //出现修改、立马执行less任务     
   }) 
}) 
```

##  4根目录创建src->less文件夹,新建需要的less文件 
根据config配置，会编译less文件夹里的less，如下的main.less：
```
@import "app/a.less";
@import "app/b.less";
```
根据config配置，会编译监听less里的所有文件，一旦有变化，便会执行编译。
最终输出到build->css里

试试修改a.less，便会自动编译了。
OK，这个demo就做完了

这是个非常简单的任务，当然我们可以用gulp做很多事情，比如压缩图片、压缩代码、合并、iconFont，配置不同的生产环境需要的任务：deploy、staging、localhost等。
真正用好了，能提升非常大的开发和维护效率。