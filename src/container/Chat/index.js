import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMsg, recvMsg, joinChat, leaveChat } from '../../redux/chat.js'
import { Input, Button, Layout } from 'antd'
import ChatMsg from './ChatMsg'
import DrawPanel from '../../components/DrawPanel'
import './index.less'

const { Header, Footer, Content, Sider } = Layout

@connect(
  state => ({
    ...state.chat
  }),
  {
    sendMsg,
    recvMsg,
    joinChat,
    leaveChat
  }
)
class Chat extends Component {
  constructor() {
    super()
    this.state = {
      msg: ''
    }
  }

  componentDidMount() {
    this.props.joinChat({
      room: this.props.match.params.room,
      token: localStorage.getItem('token')
    })
    console.log('isOn', this.props.isOn)
    if (!this.props.isOn) {
      this.props.recvMsg()
    }
  }

  componentWillUnmount() {
    this.props.leaveChat({
      room: this.props.match.params.room
    })
  }

  handleChange = e => {
    this.setState({
      msg: e.target.value
    })
  }

  handleSubmit = () => {
    this.submitMsg()
  }

  handleEnter = e => {
    if (e.keyCode === 13) {
      this.submitMsg()
    }
  }

  submitMsg = () => {
    this.props.sendMsg({
      msg: this.state.msg,
      room: this.props.match.params.room
    })
    this.setState({
      msg: ''
    })
  }

  render() {
    return (
      <Layout className="layout-container">
        <Header className="layout-container-header" theme="light" />
        <Layout>
          <Content>
            <DrawPanel />
          </Content>
          <Sider className="layout-container-sider" width={300} theme="light">
            <ChatMsg />
            <div className="chat-input">
              <Input
                className="input"
                value={this.state.msg}
                onChange={this.handleChange}
                onKeyDown={this.handleEnter}
              />
              <Button type="primary" onClick={this.handleSubmit}>
                发送
              </Button>
            </div>
          </Sider>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    )
  }
}

export default Chat
