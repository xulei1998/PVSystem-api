// 定义一些路由处理函数供路由模块使用
const db = require('../db/index')
// 注册用户的处理函数
// 导入数据库操作模块
exports.reguser = (req,res)=>{
    const sqlStr = 'select * from data_one'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        // 执行语句失败
        if(err){
            return res.send({
                status:1,
                message:err.message
            })
        }
        res.send({
            status:0,
            message:'成功',
            data:results[0]
        })
    })
    res.send('reguser ok')
}
// 登录的处理函数
exports.login = (req,res)=>{
    res.send('login ok')
}
