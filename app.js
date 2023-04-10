// 导入模块
const express = require("express");

// 创建服务器
const app = express();
// 设置允许跨域访问该服务
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "mytoken");
  next();
});
// 启动服务器
app.listen(3000, (req, res) => {
  console.log("run in localhost");
});

const mysql = require("mysql");

// 创建数据库连接对象
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "xl123456",
  database: "pv-power",
});

// 注册 解析表单的body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//
app.get("/api/getData", (req, res) => {
  // 定义SQL语句
  const sqlStr = "select * from data1";
  db.query(sqlStr, (err, results) => {
    console.log(results);
    if (err)
      return res.json({ err_code: 1, message: "获取失败", affectedRows: 0 });
    res.json({
      err_code: 0,
      message: results,
      affectedRows: 0,
    });
  });
});

//查询实时气象数据
app.get("/api/getMeteorologicalData", (req, res) => {
  console.log("req.query", req.query);
  let time = req.query.time;
  // 定义SQL语句
  const sqlStr = "SELECT  * FROM data1 WHERE time = ?";
  console.log("sqlStr", sqlStr);
  db.query(sqlStr, time, (err, results) => {
    if (err)
      return res.json({ err_code: 1, message: "获取失败", affectedRows: 0 });
    res.json({
      err_code: 0,
      data: results[0],
      affectedRows: 0,
    });
  });
});
//24小时功率预测图
app.get("/api/getHoursChart", (req, res) => {
  // 定义SQL语句
  const sqlStr =
    "SELECT  time, measured_power, s_pre_power, ss_pre_power FROM data1 WHERE time LIKE '%:00'";
  db.query(sqlStr, (err, results) => {
    if (err)
      return res.json({ err_code: 1, message: "获取失败", affectedRows: 0 });
    res.json({
      err_code: 0,
      data: results,
      affectedRows: 0,
    });
  });
});
//查询误差数据
app.get("/api/getErrorData", (req, res) => {
  let time = req.query.time;
  // 定义SQL语句
  const sqlStr = "SELECT * FROM error_data WHERE time = ?";
  db.query(sqlStr, time, (err, results) => {
    if (err)
      return res.json({ err_code: 1, message: "获取失败", affectedRows: 0 });
    res.json({
      err_code: 0,
      data: results[0],
      affectedRows: 0,
    });
  });
});
//查询历史气象数据
app.get("/api/getHistoryMeteorologicalData", (req, res) => {
  let no = req.query.no;
  // 定义SQL语句
  const sqlStr = `SELECT * FROM data${no}`;
  db.query(sqlStr, (err, results) => {
    if (err)
      return res.json({ err_code: 1, message: "获取失败", affectedRows: 0 });
    res.json({
      err_code: 0,
      data: results,
      affectedRows: 0,
    });
  });
});

//查询短期预测误差数据
app.get("/api/getShortForecast", (req, res) => {
  let end = req.query.end;
  let start = req.query.start;
  // 定义SQL语句
  const sqlStr = `SELECT * FROM short_term_forecast WHERE id BETWEEN ${end} AND ${start}`;
  db.query(sqlStr, (err, results) => {
    if (err)
      return res.json({ err_code: 1, message: "获取失败", affectedRows: 0 });
    res.json({
      err_code: 0,
      data: results,
      affectedRows: 0,
    });
  });
});

//查询超短期预测误差数据
app.get("/api/getUltraShortForecast", (req, res) => {
  // 定义SQL语句
  const sqlStr = "SELECT * FROM ultra_short_term_forecast WHERE id = ?";
  db.query(sqlStr, req.query.id, (err, results) => {
    if (err)
      return res.json({ err_code: 1, message: "获取失败", affectedRows: 0 });
    res.json({
      err_code: 0,
      data: results[0],
      affectedRows: 0,
    });
  });
});
