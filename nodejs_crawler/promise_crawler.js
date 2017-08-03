var http = require('http')
var cheerio = require('cheerio') //相当于JS的jquery
var baseUrl =  'http://www.imooc.com/learn/'
var url = 'http://www.imooc.com/learn/348' // 进击Node.js基础（一）的页面
var videoIds = [348,259,197,134,75]

// 函数，后面用，过滤源码
function filterChapters(html){
	var $ =cheerio.load(html)
	var chapters = $('.mod-chapters') //　通过class类名拿每大章，数组
  var title = $('#page_header .path span').text()
  var number = parseInt($($('.info_num i')[0]).text().trim(),10)

  // 整理后数据结构
  // courseData = {
  //   title: title,  //主标题
  //   number: number,  // 多少人看过
  //   videos: [{       // 章节信息
  //     chapterTitle: '',
  //     videos: [
  //       title: '',
  //       id: ''
  //     ]
  //   }]
  // }

	var courseData = {
    title:title,
    number: number,
    videos: []
  }
    chapters.each(function(item){  // 遍历每一章
    	var chapter = $(this)
    	var chapterTitle = chapter.find('strong').text()  // 拿到章节标题
    	var videos = chapter.find('.video').children('li')
    	var chapterData = {  // 章的内容
    		chapterTitle: chapterTitle,
    		videos:[]
    	}

    	videos.each(function(item){
    		var video = $(this).find('.J-media-item')
    		var videoTitle = video.text()
    		var id=0
    		var id = video.attr('href').split('video/')[1] // 拿到video后面ID
    		chapterData.videos.push({
    			title:videoTitle,
    			id: id
    		})
    	})
    	courseData.videos.push(chapterData)
    })
    return courseData
}

// 函数，后面用，打印出爬取信息
function printCourseInfo(coursesData){
  coursesData.forEach(function(courseData){
    console.log(courseData.number + '人学过' + courseData.title + '\n')
  })
   coursesData.forEach(function(courseData){
        console.log('###' + courseData.title + '\n')
        courseData.videos.forEach(function(item) {
            var chapterTitle = item.chapterTitle
            console.log(chapterTitle+'\n')
            item.videos.forEach(function(video){
               console.log('['+video.id+']'+video.title+'\n')
            })
        })
   })
}

// 主程序（后期异步爬取更多页面）现在为基于回调的方式
// http.get(url, function(res){
// 	var html = ''
// 	res.on('data',function(data){ // data事件
// 		html +=data
// 	})
// 	res.on('end',function(){  // end事件 console.log(html)不直接打印，要筛选信息
// 		var courseData=filterChapters(html)
// 		printCourseInfo(courseData)
// 	})
// }).on('error',function(){
// 	console.log('获取课程数据出错')
// })

// 更优雅的异步编程，
function getPageAsync(url) {
  return new Promise(function(resolve,reject){
    console.log('正在爬取' + url)
    http.get(url, function(res){
       var html = ''
       res.on('data',function(data){ // data事件
         html +=data
       })
       res.on('end',function(){  // end事件 console.log(html)不直接打印，要筛选信息
          resolve(html)
         // var courseData=filterChapters(html)
         // printCourseInfo(courseData)
       })
    }).on('error',function(){
       console.log('获取课程数据出错')
    })
  })
}

var fetchCourseArray = []
videoIds.forEach(function(id){
  fetchCourseArray.push(getPageAsync(baseUrl + id))
})
// 并发控制
Promise
  .all(fetchCourseArray)
  .then(function(pages){
     var coursesData= []
     pages.forEach(function(html){
      var courses = filterChapters(html)
      coursesData.push(courses)
     })
     coursesData.sort(function(a,b){
       return a.number < b.number
     })
     printCourseInfo(coursesData)
  })