const mysql = require('mysql')

// 创建数据库连接对象
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'pv-power'
})


// 注册 解析表单的body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
