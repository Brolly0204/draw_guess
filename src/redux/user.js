import { USER_SIGN, USER_LOGIN } from './actionTypes'
import { message } from 'antd'
import { setLocStorage } from '../utils/localstorage'
import apiList from '../api'

const initState = {
  userInfo: {}
}

function signReducer(state = initState, action) {
  switch (action.type) {
    case USER_SIGN:
      return {
        ...state,
        userInfo: { ...action.data }
      }
    case USER_LOGIN:
      return {
        ...state,
        userInfo: { ...action.data }
      }  
    default:
      return state
  }
}

function userRegisterAction(result) {
  return {
    type: USER_SIGN,
    data: { ...result, redirectTo: '/login'}
  }
}

function userLoginAction(result) {
  return {
    type: USER_LOGIN,
    data: { ...result, redirectTo: '/rooms' }
  }
}

// 注册
export const signUser = data => {
  return dispatch => {
    apiList.userRegister(data).then(res => {
      const result = res.data
      promptInfo(result, 1, () => {
        dispatch(userRegisterAction(result.data))
      })
    })
  }
}

// 登录
export const loginUser = data => {
  return dispatch => {
    apiList.userLogin(data).then(res => {
      const result = res.data
      if (result.code === 0 && result.data.token) {
        setLocStorage('token', result.data.token)
      }
      promptInfo(result, 1, () => {
        dispatch(userLoginAction(result.data))
      })
    })
  }
}

function promptInfo(result, duration, onClose) {
  if (result.code === 0) {
    message.success(result.msg, duration, onClose)
  } else {
    message.error(result.msg, duration, onClose)
  }
}

export default signReducer
