const express = require("express");
/**[mongoose]
 * githua文档地址：https://github.com/Automattic/mongoose
 */
const mongoose = require("mongoose");

/**[连接数据库] */
mongoose.connect('mongodb://localhost/todos', function(err) {
  if(err) throw err;
  console.log('数据库链接成功！')
})

const app = express();
const IndexRoutes = require("./routes/index");

// 静态文件托管
app.use("/assets", express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", IndexRoutes);

app.listen(4000);
console.log("server started success, URL: http://localhost:4000");
