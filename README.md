---
这是一个基于nodejs + express + vue 的前后端分离项目
---

# 整体思路
    分为三端   移动端 后台页面 后端
## 1.后台页面,后端接口
- 数据库初始化，初始化接口/admin/api
  1. 数据库使用MongoDB 这里使用node的mongoose包进行数据库操作
  ```js
  // 链接数据库
    mongo.connect('mongodb://127.0.0.1:27017/moba',{
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('数据库连接成功');
        }
    })
    // 通过mongoose.model('Category', schma) 新增一个Category集合  因为MongoDB中集合名如果最后一个是字母则转成复数形式，如果是数字则不变 所以在cmd中看到的应该是Category
    const schma = new mongoose.Schema({
    name: { type: String },
    parent: {
        // 设置关联  将当前分类与parent分类关联
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }
    })
    // 类似于mysql的表  每一个schma都是一个表 然后用model将Schema转成Model类型
    module.exports = mongoose.model('Category', schma)
  ```
  2. 后台接口基于数据库 增 删 改 查 接口通过以下操作拿到数据库的数据
  ```js
  Category.create(req.body) // 增
  Category.findByIdAndDelete(req.params.id,req.body) // 删
  Category.findByIdAndUpdate(req.params.id,req.body) // 改
  // populate('parent') 这里的语句是因为parent是进行关联的属性  对其进行关联查询
  Category.find().populate('parent').limit(10) // 查
  ```
  
- **通用CRUD接口**
    对于相似的接口进行合并 类似于Vue的mixin
    设置通用接口  我们一般给他加一个前缀 例如rest以免与之后的接口重复
    在设置好通用接口后 我们需要在后端express.Router设置mergeParams:true属性。这样就可以将路由合并  便于我们动态访问路由
    此时的api路由为/admin/api/rest/:resource
    我们就可以在req.params.resource中拿到动态路由的名称。
    （因为mongodb数据库转换大小写跟单复数的性质，我们需要用一个包inflection来转换）
    随后我们在使用路由之前动态的获取resource对应的集合名称绑定到req上以便路由中间件使用 而这一步操作也可以当做一个中间件加到app上 这样就可以实现接口的动态调用
    
- this.$set(obj,attr,value)
    遇见了一个自己知道理论的坑  vue2的响应式原理不会观察对象深层次的属性  使用$set才能观察到。我TM还以为是$nextTick的问题
    
- 数据库问题
    只要在使用到数据库数据的地方都需要引用到模型。即你使用哪个模型的数据就需要引用对应的模型，不论是间接引用还是直接引用！！！！
    
- **上传接口**
  
    ```js
    let multer = require('multer') // 引入上传的包
    let upload = multer({dest:__dirname+'/upload'})// 设置文件上传到的位置
    app.post('/admin/api/upload',auth,upload.single('file'),(req,res)=>{
      // auth 登录校验中间件
      // upload.single('file')  从前端拿到上传来的文件对象  file是文件对象名称
      let oldPath = req.file.destination + '/' + req.file.filename;
      let newPath = req.file.destination + '/' + req.file.originalname;
      fs.rename(oldPath,newPath,()=>{
          console.log('upload success');
      })
      // 因为上传的文件会修改文件名为乱码且会删掉文件的后缀名  在这里将原本的名称及后缀加上
      let imgUrl = 'http://localhost:3000/upload/' + req.file.originalname
      // 返回上传后的文件的路径
      req.file.url = imgUrl
      res.send(req.file)
    })
    ```

## 2.前端接口

- 与后台接口不同的是，前端接口需要的只是将数据进行封装，以便于在前端页面接收到的数据可以直接使用而无需进行数据结构的修改。因此前端接口相对来说比较简单。但是在mongodb中我们需要注意查询的方式，这里使用的是聚合查询，他的优点是可以将多条查询操作简化成一条，在数据库中查询效率就像查询一条语句一样迅速。
- **需要注意的是在聚合查询中引用到的模型都需要在文件中引入才行，否则就无法进行查询。**
```js
引入模型
let Category = require('../../modules/Category')
let Article = require('../../modules/Article')
let Hero = require('../../modules/Hero')
let Video = require('../../modules/Video')
let Item = require('../../modules/Item')
let mongoose = require('mongoose')
下面的查询都需要在模型中进行设置
schma.virtual('children',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})
多条语句查询
    let news = await Category.findOne({
        name:'新闻资讯'
    }).populate({
        path:'children',
         populate:({
             path:'newsList'
        })
     }).lean()
聚合查询
    let parent = await Category.findOne({
        name:'新闻资讯'
    })
    let cats = await Category.aggregate([
        { $match : { parent : parent._id } },// 过滤数据
        {
            $lookup: {
                from:'articles',
                localField:'_id',
                foreignField:'categories',
                as:'newsList'
            }
        },// 关联查询
        {
            $addFields:{ 
                newsList:{$slice: ['$newsList',5]}
            }
        }// 查询出结果的封装
    ])
    let subCats = cats.map(v=>v._id)
    cats.unshift({
        name:'热门',
        newsList: await Article.find().where({
            categories: { $in:subCats }
        }).populate('categories').limit(5).lean()
    })
    cats.map(cat=>{
        cat.newsList.map(news=>{
            news.categoryName = (cat.name === '热门' ? news.categories[1].name : cat.name)
            return news
        })
        return cat
    })
    res.json(cats)
```

## 3.其他技术

1. 自定义组件+具名插槽

2. 登录校验

   ```js
   let auth = async (req,res,next)=>{
     // 登录校验
     let token = req.headers.authorization
     if(token === undefined){
         return res.status(401).send({
             message:'token不存在,请先登录'
         })
     }
     let {id} = jwt.verify(token,'dqdqweqw')
     if(!id){
         return res.status(401).send({
             message:'无效token,请重新登陆'
         })
     }
     req.user = await admin.findById(id)
     if(!req.user){
         return res.status(401).send({
             message:'请重新登陆'
         })
     }
     await next()
   }
   //而根据后端接口的状态从而在前端进行路由访问权限的设置
   // 登录成功  后端会生成一个token返回给前端  前端之后的请求需要带上token才能访问到相应的数据   同时后端也会进行校验是否携带，token是否有效。
   http.interceptors.request.use((config)=>{
     if(sessionStorage.token){
       config.headers.Authorization = sessionStorage.token
     }
     return config
   })
   // 根据后端返回的状态设置路由访问权限  如果token后台会返回401状态  表示用户没有权限访问
   http.interceptors.response.use(res=>{
     return res
   },err=>{
     Vue.prototype.$message({
         type:'error',
         message:err.response.data.message
     })
     if(err.response.status === 401){
       router.push('/login')
     }
     return Promise.reject(err)
   })
   ```

3. mixin混入

   我们也需要在上传接口进行token的检测，因此可以定义一个全局的方法，在你使用的时候调用这个方法即可
   
   ```vue
   Vue.mixin({
     methods: {
       getAuthor(){
         return {
             Authorization:sessionStorage.token || ''
         }
       }
     },
   })
   ```
   
4. 生产环境编译
- chunk-vendors 引用的第三方库的文件
- app   自己写的文件