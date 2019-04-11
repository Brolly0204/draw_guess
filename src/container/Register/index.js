import React, { Component } from 'react'
import { Form, Input, Card, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUser } from '../../redux/user'
import './index.less'

const FormItem = Form.Item

@connect(
  state => ({ ...state.user }),
  {
    signUser
  }
)
@Form.create()
class Register extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.signUser({ ...values })
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一样！')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value) {
      form.validateFields(['confirm'])
    }
    callback()
  }

  render() {
    const { userInfo } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    const registerTemplate = (
      <Card title="注册">
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="NickName" {...formItemLayout}>
            {getFieldDecorator('nikeName', {
              rules: [
                {
                  required: true,
                  message: '亲，请输入昵称~',
                  whitespace: true
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label="password" {...formItemLayout}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '亲，请输入密码~',
                  whitespace: true
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem label="confirm password" {...formItemLayout}>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '亲，请再次输入密码~',
                  whitespace: true
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </FormItem>
        </Form>
      </Card>
    )

    return userInfo.redirectTo ? <Redirect  to={userInfo.redirectTo}/> : registerTemplate
  }
}

export default Register
