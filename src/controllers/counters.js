import Counters from '../models/counters.js'

// id 累加器
export const getNextSequenceValue = (sequenceName) => {
  const sequenceDocument = Counters.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
  )
  return new Promise(resolve => {
    sequenceDocument.then(res => {
      resolve(res?.sequence_value || 1)
    })
  })
}