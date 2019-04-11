import io from 'socket.io-client'
import { SEND_MSG, CLEAR_MSG, JOIN_CHAT, SYNC_DRAW } from './actionTypes.js'

const socket = io('http://localhost:7000')

const initState = {
  msgs: [],
  isOn: false,
  dataURL: ''
}

function chatReducer(state = initState, action) {
  switch (action.type) {
    case SEND_MSG:
      return {
        ...state,
        msgs: [...state.msgs, action.payload]
      }
    case JOIN_CHAT:
      return {
        ...state,
        isOn: action.isOn
      }
    case SYNC_DRAW:
      return {
        ...state,
        dataURL: action.payload.dataURL
      }
    case CLEAR_MSG:
      return {
        ...state,
        msgs: []
      }
    default:
      return state
  }
}

const recvMsgAction = payload => {
  return {
    type: SEND_MSG,
    payload
  }
}

const syncDrawAction = payload => {
  return {
    type: SYNC_DRAW,
    payload
  }
}

export const recvMsg = () => {
  return dispatch => {
    socket.on('recvmsg', data => {
      dispatch(recvMsgAction(data))
    })
    socket.on('realTimeDraw', data => {
      console.log('real', data)
      dispatch(syncDrawAction(data))
    })
    socket.on('joined', data => {
      console.log(data)
    })
  }
}

export const joinChat = msg => {
  return dispatch => {
    socket.emit('joinChat', { ...msg })
    dispatch({
      type: JOIN_CHAT,
      isOn: true
    })
  }
}

export const leaveChat = msg => {
  return dispatch => {
    socket.emit('leaveChat', { ...msg })
    socket.on('leaved', () => {
      dispatch({ type: CLEAR_MSG })
    })
  }
}

export const sendMsg = msg => {
  return () => {
    socket.emit('sendmsg', { ...msg })
  }
}

export const syncDrawData = data => {
  return dispatch => {
    socket.emit('syncDraw', data)
  }
}

export default chatReducer
