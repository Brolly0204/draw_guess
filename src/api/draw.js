import { post } from './util.js'

export const syncDraw = params => {
  return post('/draw/syncData', params)
}
