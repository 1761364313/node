import mongodb from 'mongodb'

import { isEmpty } from '../public/utils.js'

const MongoClient = mongodb.MongoClient

const HOST = 'mongodb://localhost:27017/'
const DATABASE = 'order'



// 连接数据方法
const connectDb = () => new Promise((resolve, reject) => {
  MongoClient.connect(HOST, (err, db) => {
    if (err) {
      console.log(err)
      console.log('数据库连接失败')
      reject(err)
      return
    }
    resolve({
      dbo: db.db(DATABASE),
      db
    })
  })
})

// id 累加器
const getNextSequenceValue = (sequenceName, dbo, type='add') => {
  console.log('dbo', dbo.collection('counters'))
   const sequenceDocument = dbo.collection('counters').findOneAndUpdate(
    {_id: sequenceName},
    { $inc: {sequence_value: type === 'add'? 1 : -1}},
  )
  return new Promise(resolve => {
    sequenceDocument.then(res => {
      if (res) {
        resolve(res.value?.sequence_value || 0)
      }
    })
  })
}

// 暴露ObjectId
export const ObjectID = mongodb.ObjectId

console.log('ObjectID', ObjectID)
// 查询总数
export const count = (collectionname,json = {}) => new Promise((resolve, reject) => {
  connectDb().then(dbs => {
    const { dbo } = dbs
    if (dbo) {
      const num = dbo.collection(collectionname).find(json).count()
      num.then(total => {
        if (total) {
          resolve(total)
        } else {
          resolve(0)
        }
      })
    }
  })
})

/**
  * 查询 
  * collectionname: 表名
  * json：查询条件
  */
 export const find = (collectionname, json, page) => new Promise((resolve, reject) => {
    connectDb().then((dbs) => {
      const {dbo, db} = dbs
      if (dbo) {
        let res
        if (page) {
          res = dbo.collection(collectionname).find(json).limit(page.limit).skip(page.skip * page.limit)
        } else {
          res = dbo.collection(collectionname).find(json)
        }
        const num = count(collectionname, json)
        num.then(total => {
          res.toArray((err, data) => {
            db.close()
            resolve({err, data, count: total})
          })  
        })
      }
    }).catch(err => {
      reject(err)
    })
 })

 // insert 插入数据库
 export const insert = (colletionname, json) => new Promise((resolve, reject) => {
   connectDb().then(async dbs => {
      const {dbo, db} = dbs
      console.log('ssss', dbo)
      let ids  = 0
      await getNextSequenceValue('list', dbo).then(id => ids = id || 0)
      const data = {...json, _id: ids}
      dbo.collection(colletionname).insertOne(data, (err, data) => {
      db.close()
      resolve({err, data})
    })
   }).catch(err => {
     reject(err)
   })
 })
 
 /**
  * 修改 
  * @param {*} collectionname 表名称
  * @param {*} serchJson 查询条件
  * @param {*} setJson 修改数据
  * @returns 
  */
 export const updata = (collectionname, serchJson, setJson) => new Promise((resolve, reject) => {
  connectDb().then(dbs => {
    const {dbo, db} = dbs
    dbo.collection(collectionname).updateOne(serchJson, {$set: setJson}, (err, data) => {
      db.close()
      resolve({err, data})
    })
  }).catch(err => {
    reject(err)
  })
 })
 
 // remove 删除
 export const remove = ( collectionname, json) => new Promise((resolve, reject) => {
    connectDb().then(dbs => {
      const { dbo, db} = dbs
      dbo.collection(collectionname).deleteOne(json, (err, data) => {
        db.close()
        resolve({err, data})
      })
    }).catch(err => {
      reject(err)
    })
 })
 
 export default {
  ObjectID,
  count,
  find,
  updata,
  insert,
  remove
 }