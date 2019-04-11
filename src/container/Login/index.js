import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { loginUser } from '../../redux/user'
import './index.less'

@connect(
  state => ({...state.user}),
  { loginUser }
)
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()
    // let values = this.props.form.getFieldsValue()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        // message.success(`用户名：${values.nikeName}，密码：${values.password}`)
        this.props.loginUser(values)
      }
    })
  }
  render() {
    const { token, redirectTo } = this.props.userInfo
    const { getFieldDecorator } = this.props.form
    const htmlTemplate = (
      <div className="container">
        <Card
          className="login-card"
          title="《你画我猜》，正确的打开方式你知道吗？"
          style={{ width: '400px', margin: '150px auto 0' }}
        >
          <Form onSubmit={this.handleSubmit} className="login-container">
            <Form.Item>
              {getFieldDecorator('nikeName', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名！'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="user"
                      style={{ color: 'rgba(0, 0, 0, 0.35)' }}
                    />
                  }
                  placeholder="亲，请输入用户名~"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码！'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="lock"
                      style={{ color: 'rgba(0, 0, 0, 0.35)' }}
                    />
                  }
                  placeholder="亲，请输入密码~"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remeber', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a
                className="login-form-forgot"
                href="#"
                style={{ float: 'right' }}
              >
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )

    return token ? <Redirect to={redirectTo} /> : htmlTemplate
  }
}

export default Login
