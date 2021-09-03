import Router from '@koa/router'

const router = new Router()

router.all('/list', async(ctx,next) => {
  const json = {
    "code": 0,
    "msg": "success",
    "list": [
      {
        "id": 1,
        "name": "test",
        "age": 122,
        "text": '2222',
        "time": "2021-7-25 10:33:33"
      },
      {
        "id": 2,
        "name": "test",
        "age": 122,
        "time": "2021-7-25 10:33:33"
      },
      {
        "id": 3,
        "name": "test",
        "age": 122,
        "time": "2021-7-25 10:33:33"
      },
      {
        "id": 4,
        "name": "test",
        "age": 122,
        "time": "2021-7-25 10:33:33"
      },
      {
        "id": 5,
        "name": "test",
        "age": 122,
        "time": "2021-7-25 10:33:33"
      },
      {
        "id": 6,
        "name": "test",
        "age": 122,
        "time": "2021-7-25 10:33:3333"
      },
      {
        "id": 7,
        "name": "test",
        "age": 122,
        "time": "2021-7-25 10:33:3333"
      }
    ]
  }
  ctx.body = json
})

router.get('/info', async(ctx,next) => {
  const json = {
    "code": 0,
    "data": 'info hello word',
    "msg": "success info"
  }
  ctx.body = json
})

export default router.routes()
