const mongoose = require('mongoose')
const schma = new mongoose.Schema({
    name: { type: String },
    parent: {
        // 设置关联  将当前分类与该分类关联
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }
})
// 类似于mysql的表  每一个schma都是一个表 然后用model将Schema转成Model类型
schma.virtual('children',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})
schma.virtual('newsList',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Article'
})
schma.virtual('heroList',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Hero'
})
schma.virtual('videoList',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Video'
})

module.exports = mongoose.model('Category', schma)