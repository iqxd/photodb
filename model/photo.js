var mongoose =require('mongoose');

var PhotoSchema = new mongoose.Schema({
    name : String,
    path : String
});

PhotoSchema.statics = {
    fetch : function(cb) {
        return this.find({}).exec(cb);
    },
    findById : function(id,cb) {
        return this.findOne({_id:id}).exec(cb);
    }
};
//每一次保存之前会调用这个方法;
PhotoSchema.pre("save",function(next) {
    next();
});
//为mongodb定义了这个数据模型, 这个数据模型和当前的数据库绑定了;
var Photo = mongoose.model("Photo",PhotoSchema);
module.exports =  Photo;