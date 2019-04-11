import { post } from './util.js'

export const userRegister = params => {
  return post('/user/register', params)
}

export const userLogin = params => {
  return post('/user/login', params)
}
