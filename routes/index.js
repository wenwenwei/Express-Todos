const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bodyParser = require('body-parser')

const MESSAGE = {
  ADD: {
    errcode: 0,
    data: null,
    msg: 'add success'
  },
  DELETE: {
    errcode: 0,
    data: null,
    msg: 'delete success'
  },
}

/**[解析application/x-www-form-urlencoded; charset=UTF-8数据] */
const bodyForm = bodyParser.urlencoded({
  extended: false
})

/**[建立数据模型] */
const todosSchema = new mongoose.Schema({
  content: String
});
var Todo = mongoose.model('Todo', todosSchema);

/**[删除] */
router.delete('/todo/:id', function (req, res) {
  let id = req.params.id
  Todo.find({ _id: id }).remove(function(err, data) {
    if(err) throw err;
    res.json(MESSAGE.DELETE)
  })
})

/**[新增] */
router.post('/todo', bodyForm, function (req, res) {
  const content = req.body.item
  Todo({ content: content }).save(function(err) {
    if(err) throw err;
  })
  res.json(MESSAGE.ADD)
})

router.get('/', function (req, res) {
  Todo.find({}, function(err, data) {
    if(err) throw err;
    res.render('index', {
      datas: data.map(item => ({ content: item.content, id: item._id }))
    })
  })
})

module.exports = router