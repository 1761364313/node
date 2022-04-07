import mongoose from 'mongoose'
import { dateFormat } from '../public/utils.js'

const Schema = mongoose.Schema

// 定义列表数据
const list = new Schema({
  _id: Number,
  name: String,
  price: Number,
  priceAll: Number,
  tel: Number,
  person: String,
  creatTime: { type: String, default: dateFormat() }
}, { collection: 'list', versionKey: false })

// 连接list 表
export default mongoose.model('list', list)