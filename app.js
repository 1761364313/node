import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './src/routes/index.js'
import { cors } from './src/server/httpConfig.js'
import './connect.js'

const app = new Koa()
// 设置跨域
app.use(cors())
// post 请求接受参数
app.use(bodyParser())
// 路由
app.use(router.routes())
// 处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头.
app.use(router.allowedMethods())
app.listen(8080)


