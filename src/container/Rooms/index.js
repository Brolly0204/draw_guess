import React, { Component } from 'react'
import { Card, List, Button, Row, Col } from 'antd'

const data = [
  {
    room: 'one',
    msg: 'Japanese princess to wed commoner.'
  },
  {
    room: 'two',
    msg: 'Japanese princess to wed commoner.'
  },
  {
    room: 'three',
    msg: 'Japanese princess to wed commoner.'
  },
  {
    room: 'four',
    msg: 'Japanese princess to wed commoner.'
  },
  {
    room: 'five',
    msg: 'Japanese princess to wed commoner.'
  }
]

class Rooms extends Component {
  handleSubmit = room => {
    this.props.history.push(`/chat/${room}`)
  }
  render() {
    return (
      <Card>
        <List
          size="large"
          header={<div>房间列表</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Row>
                <Col>
                  <h3>
                    房间号：
                    {item.room}
                  </h3>
                </Col>
                <Col>
                  <span>{item.msg}</span>
                </Col>
                <Col>
                  <Button
                    onClick={() => this.handleSubmit(item.room)}
                    style={{ marginTop: '10px' }}
                    type="primary"
                  >
                    加入房间
                  </Button>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

export default Rooms
