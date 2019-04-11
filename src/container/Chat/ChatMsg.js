import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Avatar } from 'antd'

@connect(state => ({ ...state.chat }))
class ChatMsg extends Component {
  render() {
    return (
      <List
        dataSource={this.props.msgs}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.msg}</a>}
              description={item.msg}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default ChatMsg
