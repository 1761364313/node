import Router from '@koa/router'

import { add, query, update, remove } from '../controllers/list.js'

const router = new Router()

router.all('/list', query)

router.post('/add', add)

router.post('/update', update)

router.post('/remove', remove)

export default router.routes()
