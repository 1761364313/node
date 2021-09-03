import Router from '@koa/router'
import { find, insert, updata } from '../db/index.js'

const router = new Router()

router.all('/list', async(ctx,next) => {
  const params = ctx.request.query
  let page = null
  if (params && params.pageSize && params?.pageIndex >= 0) {
    page = {
      skip: parseInt(params?.pageIndex - 1),
      limit: parseInt(params?.pageSize)
    }
  }
  console.log('page', page)
  const db = await find('list', {}, page)
  if (db.data) {
    const res = {
      code: 0,
      list: db.data,
      count: db.count,
      msg: 'success' 
    }
    ctx.body = JSON.stringify(res)
  }
})

router.post('/add', async(ctx, next) => {
  const obj = ctx?.request?.body
  console.log('params', obj)
  const db = await insert('list', obj)
  console.log('db', db)
  const res = {
    code: db.data ? 0 : 1,
    data: db.data || db.err,
    msg: db.data ? 'success' : 'err'
  }
  ctx.body = JSON.stringify(res)
})

router.post('/update', async(ctx, next) => {
  const obj = ctx?.request?.body
  console.log('obj', obj)
  const db = await updata('list',{_id: obj._id}, obj)
  const res = {
    code: db.data ? 0 : 1,
    data: db.data || db.err,
    msg: db.data ? 'success' : 'err'
  }
  ctx.body = JSON.stringify(res)
})

export default router.routes()
