import Router from '@koa/router'

import home from './home.js'
import order from './order.js'

const router = new Router()

router
 .use('/home', home)
.use('/order', order)

export default router