let createError = require('http-errors')
let express = require('express')
let path = require('path')
let fs = require('fs')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let comment = require('./routes/admin/index')
let api = require('./routes/admin/api')
let app = express()
let db = require('../server_moba/plugins/db')
let web = require('./routes/web/index')
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.use('/upload',express.static(__dirname+'/upload'))
// 设置静态目录
app.use('/admin',express.static(__dirname+'/admin'))
app.use('/',express.static(__dirname+'/web'))
// 定义后端渲染
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
let admin = require('./modules/AdminUser')
let jwt = require('jsonwebtoken')
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
// 公共路由
app.use('/admin/api/rest/:resource',auth,async (req,res,next)=>{
  let ModelName = require('inflection').classify(req.params.resource)
  req.Model = require(`./modules/${ModelName}`)
  req.ModelName = ModelName
  next()
},comment)
// 特殊路由入口
app.use('/admin/api', api)

// 上传接口
let multer = require('multer')
let upload = multer({dest:__dirname+'/upload'})
app.post('/admin/api/upload',auth,upload.single('file'),(req,res)=>{
  let oldPath = req.file.destination + '/' + req.file.filename
  let newPath = req.file.destination + '/' + req.file.originalname
  fs.rename(oldPath,newPath,()=>{
      console.log('upload success')
  })
  let imgUrl = 'http://localhost:3000/upload/' + req.file.originalname
  req.file.url = imgUrl
  res.send(req.file)
})
// 前端接口
app.use('/web/api',web)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
module.exports = app
