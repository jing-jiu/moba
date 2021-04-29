let express = require('express');
let router = express.Router();
let adminUser = require('../../modules/AdminUser')
// 登录接口设置
router.post('/login',async (req,res)=>{
    let {username,password} = req.body
    let user = await adminUser.findOne({username}).select('+password')
    // 检验用户名
    if(!user){
        return res.status(422).send({
            message:'用户名不存在'
        })
    }
    // 检验密码
    let isValid = require('bcrypt').compareSync(password,user.password)
    if(!isValid){
        return res.status(422).send({
            message:'用户密码错误'
        })
    }
    // 返回token
    let jwt = require('jsonwebtoken')
    let token = jwt.sign({ id: user._id },'dqdqweqw')
    res.send(token)
})
module.exports = router;