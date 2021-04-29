let express = require('express');
let router = express.Router({
    mergeParams:true
});
// 添加分类接口
router.post('/',async (req,res)=>{
    //将一个或多个文档保存到数据库的快捷方式。create(docs) 为 docs 中的每个文档执行 MyModel(doc).save()。
    let model = await req.Model.create(req.body)
    res.send(model)
})
// 获取分类接口
router.get('/',async (req,res)=>{
    let queryOptions = {}
    let size = req.query.size || 150
    size = Number(size)
    if(req.ModelName === 'Category'){
        queryOptions.populate = 'parent'
    }
    if(req.ModelName === 'Article'){
        queryOptions.populate = 'categories'
    }
    let items = await req.Model.find().setOptions(queryOptions).limit(size)
    // populate('parent') 关联查询
    res.send(items)
})
// 修改分类接口
router.put('/:id',async (req,res)=>{
    let items = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(items)
})
// 删除分类接口
router.delete('/:id',async (req,res)=>{
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.json({
        state:'ok',
        context:'删除成功'
    })
})
// 获取详情接口
router.get('/:id',async (req,res)=>{
    let model = await req.Model.findById(req.params.id)
    res.send(model)
})

module.exports = router;