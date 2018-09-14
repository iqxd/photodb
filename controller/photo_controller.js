var Photo = require("../model/photo.js");
var formidable = require('formidable');
var fs = require('fs');
var TITLE = '上传图片';
var UPLOAD_FOLDER = '/photos/';

module.exports.index= function(req,res) {
    res.render('index', {
            title: '上传照片',
    });
}

//存储照片文件到目录，并录入照片数据到数据库
module.exports.upload= function(req,res) {

    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public' + UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {

        if (err) {
          res.locals.error = err;
          res.render('index', { title: TITLE });
          return;        
        }  
       
        var extName = '';  //后缀名
        switch (files.photo.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;         
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;         
        }

        if(extName.length == 0){
              res.locals.error = '只支持png和jpg格式图片';
              res.render('index', { title: TITLE });
              return;                   
        }

        var photoNewName = Date.now() + '.' + extName;
        var newPath = form.uploadDir + photoNewName;
        var relativePath= UPLOAD_FOLDER + photoNewName
    //    console.log("file name:" + files.photo.name);
        fs.renameSync(files.photo.path, newPath);  //重命名

        var photo = new Photo({
            name : files.photo.name,
            path : relativePath
        });

        photo.save(function(err) {
          if (err) {
             res.locals.error = err;
             res.render('index', { title: TITLE });
             return;        
          }  
        });
    });

    res.locals.success = '上传成功';
    res.render('index', { title: TITLE });      
}

//读取所有照片
module.exports.show =  function(req, res) {
    console.log(req.session);
    Photo.fetch(function(err,photos) {
      //  console.log(photos[0].path);
        res.render('show', {
            title: '显示照片',
            photos : photos
        });
    });
};
