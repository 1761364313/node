import ListModel from '../models/list.js'
import { create, find, updateOne, deleteOne } from './common.js'
import { resultErrorJson } from '../public/utils.js'

// 新增
export const add = async(ctx, next) => {
  try {
    const json = ctx?.request?.body
    const db = await create(json, ListModel, 'list')
    if (db) ctx.body = db
  } catch {
    ctx.body = resultErrorJson()
  }
}

// 更新
export const update = async(ctx, next) => {
  const json = ctx?.request?.body
  if (!json._id) {
    ctx.body = resultErrorJson(undefined, '_id不能为空')
    return false
  }
  try {
    const db = await updateOne(json, ListModel)
    if (db) ctx.body = db
  } catch {
    ctx.body = resultErrorJson()
  }
}

// 删除
export const remove = async(ctx, next) => {
  const json = ctx?.request?.body
  if (!json._id) {
    ctx.body = resultErrorJson(undefined, '_id不能为空')
    return false
  }
  try {
    const db = await deleteOne(json, ListModel)
    if (db) ctx.body = db
  } catch {
    ctx.body = resultErrorJson()
  }
} 

// 查询
export const query = async(ctx, next) => {
  try {
    const json = ctx?.request?.query
    const res = await find(json, ListModel)
    ctx.body = res
  } catch {
    ctx.body = resultErrorJson()
  }
}
