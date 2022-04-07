import { getNextSequenceValue } from './counters.js'
import { isEmpty, resultErrorJson, resultSuccessJson } from '../public/utils.js'
import { dateFormat } from '../public/utils.js'

// 添加
export const create = (json, modelName, counstName = 'list') => new Promise(async (resolve, reject) => {
  try {
    const params = { ...json }
    await getNextSequenceValue(counstName).then(id => {
      console.log('id', id);
      params._id = id || 0
      params.creatTime = dateFormat()
    })
    const db = await modelName.create(params)
    if (db) {
      resolve(resultSuccessJson())
    } else {
      reject(resultErrorJson())
    }
  } catch {
    reject(resultErrorJson())
  }
})

// 编辑
export const updateOne = (json, modelName) => new Promise(async (resolve, reject) => {
  try {
    const params = { ...json }
    const setId = { $set: { _id: params._id } }
    delete params._id
    const db = await modelName.updateOne(setId, params)
    if (db) {
      resolve(resultSuccessJson())
    } else {
      reject(resultErrorJson())
    }
  } catch {
    reject(resultErrorJson())
  }
})

// 删除
export const deleteOne = (json, modelName) => new Promise(async (resolve, reject) => {
  try {
    const db = await modelName.deleteOne(json)
    if (db) {
      resolve(resultSuccessJson())
    } else {
      reject(resultErrorJson())
    }
  } catch {
    reject(resultErrorJson())
  }
})

// 查询
export const find = (json, modelName) => new Promise(async (resolve, reject) => {
  try {
    // 查询分页
    let page = {}
    const { pageIndex, pageSize } = json
    if (!isEmpty(pageIndex) && pageSize) {
      page.skip = pageSize * (pageIndex - 1)
      page.limit = pageSize - 0
    }
    // 删除 空字段
    const params = { ...json }
    Object.keys(params).forEach(i => {
      if (!params[i]) delete params[i]
    })
    // 查询 时间段 
    const { startTime, endTime } = params
    if (startTime && endTime) {
      params.creatTime = {
        $gte: startTime,
        $lte: endTime
      }
    }
    delete params.startTime
    delete params.endTime
    delete params.pageIndex
    delete params.pageSize
    const res = await modelName.find(params, null, { ...page }).sort({ creatTime: -1 })
    const count = await modelName.count(params)
    resolve({
      code: 0,
      data: res,
      count,
      msg: 'success'
    })
  } catch {
    reject(resultErrorJson())
  }
})