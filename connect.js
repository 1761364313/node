import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/order',{
  useNewUrlParser:true,
})

const con = mongoose.connection

con.on('open', () => {
  console.log('db open')
})
con.on('error', console.error.bind(console, '连接数据库失败'));

con.on('disconnected', () => {
  console.log('db disconnected')
})

