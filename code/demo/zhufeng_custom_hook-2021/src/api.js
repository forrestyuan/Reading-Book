const express = require('express')
const cors = require('cors')
const logger =  require('morgan')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.get('/api/users', function(req, res){
  let currentPage = parseInt(req.query.currentPage)
  let pageSize = parseInt(req.query.pageSize)
  let total = 26
  let list = []
  let offset = (currentPage - 1) * pageSize //本页条数的起始索引
  let nextPageItems = (offset + pageSize ) > total ? total : (offset + pageSize )
  for( let i = offset; i < nextPageItems; i++){
    list.push({id:i+1, name:'name'+(i+1)})
  }
  res.json({
    currentPage,
    pageSize,
    totalPage: Math.ceil((total/pageSize)),
    list
  })
})

app.listen(8000, () => {
  console.log('服务启动，端口8000')
})