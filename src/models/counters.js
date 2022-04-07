import mongoose from 'mongoose'
import { dateFormat } from '../public/utils.js'

const Schema = mongoose.Schema

// 定义列表数据
const counters = new Schema({
  _id: String,
  sequence_value: Number,
  creatTime: { type: String, default: dateFormat() }
}, { collection: 'counters', versionKey: false })

// counters 表
export default mongoose.model('counters', counters)

