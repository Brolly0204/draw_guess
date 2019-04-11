import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { syncDrawData } from '../../redux/chat'
import './index.less'

@connect(
  state => ({ ...state.chat }),
  { syncDrawData }
)
@withRouter
class DrawPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ctx: '',
      width: 0,
      height: 0,
      isEraser: false,
      eraserClass: 'btn',
      timer: null,
      bgColor: '#fff',
      oldPoint: { x: '', y: '' }
    }
    this.drawRef = React.createRef()
    this.conRef = React.createRef()
  }

  handleMouseDown = e => {
    this.toDataURL()
    this.drawRef.current.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    if (this.state.isEraser) {
      this.handleEraser(e)
      return
    }
    const x = e.offsetX
    const y = e.offsetY
    this.handleDrawLine(x, y)
    this.setState({
      oldPoint: { x: x - 1, y: y - 1 }
    })
  }

  handleMouseMove = e => {
    this.toDataURL()
    if (this.state.isEraser) {
      this.handleEraser(e)
      return
    }
    const x = e.offsetX
    const y = e.offsetY
    this.handleDrawLine(x, y)
    this.setState({
      oldPoint: { x: x - 1, y: y - 1 }
    })
  }

  handleMouseUp = () => {
    this.drawRef.current.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleInitDraw = () => {
    const ctx = this.drawRef.current.getContext('2d')
    let that = this
    const { offsetWidth, offsetHeight } = that.conRef.current
    that.drawRef.current.width = offsetWidth
    that.drawRef.current.height = offsetHeight - 60
    ctx.fillStyle = this.state.bgColor
    ctx.fillRect(0, 0, offsetWidth, offsetHeight - 60)
    ctx.lineWidth = 5
    this.setState({
      ctx,
      width: offsetWidth,
      height: offsetHeight
    })
  }

  handleDrawLine = (x, y) => {
    const ctx = this.state.ctx
    // 开始绘制新路径
    ctx.beginPath()
    // // 线条宽度
    // ctx.lineWidth = 5
    // 线条两边末端形状 butt | round | square
    ctx.lineCap = 'round'
    // 起点坐标
    ctx.moveTo(this.state.oldPoint.x, this.state.oldPoint.y)
    // 结束坐标
    ctx.lineTo(x, y)
    // 开始绘制 路径 默认：黑色
    ctx.stroke()
    // 闭合当前路径
    ctx.closePath()
  }

  selectColor = e => {
    this.closeEraser()
    const ctx = this.state.ctx
    ctx.strokeStyle = e.target.value

    this.setState({
      ctx
    })
  }

  changeColor = e => {
    this.closeEraser()

    const ctx = this.state.ctx
    ctx.strokeStyle = e.target.style.backgroundColor
    this.setState({
      ctx
    })
  }

  clearCanvas = () => {
    this.closeEraser()
    const { ctx, width, height } = this.state
    ctx.fillRect(0, 0, width, height)
    this.toDataURL()
  }

  saveIMG = () => {
    this.closeEraser()
    const a = document.createElement('a')
    const link = this.drawRef.current.toDataURL()
    const img = new Image()
    img.src = link
    img.onload = function() {
      a.href = img.src
      a.download = Date.now()
      a.click()
    }
  }

  handleEraser = e => {
    const { ctx, bgColor } = this.state
    var x = e.offsetX
    var y = e.offsetY
    ctx.beginPath()
    ctx.arc(x, y, 12, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = bgColor
    ctx.fill()
  }

  openEraser = () => {
    const { isEraser } = this.state
    this.setState({
      isEraser: !isEraser,
      eraserClass: `btn ${!isEraser ? 'active' : ''}`
    })
  }

  closeEraser = () => {
    this.setState({
      isEraser: false,
      eraserClass: 'btn'
    })
  }

  toDataURL = () => {
    this.props.syncDrawData({
      room: this.props.match.params.room,
      dataURL: this.drawRef.current.toDataURL()
    })
  }

  render() {
    const { dataURL } = this.props
    return (
      <div className="draw-container" ref={this.conRef}>
          <div>
          {
            dataURL ? <img src={dataURL} alt="" /> : <canvas
            ref={this.drawRef}
            onMouseDown={this.handleMouseDown}
            className="canvas"
          />
          }
            <div className="toolbar">
              更换颜色：
              <input
                className="selectColorBtn"
                type="color"
                onChange={this.selectColor}
              />
              <input
                className="btnColor"
                type="button"
                onClick={this.changeColor}
                style={{ backgroundColor: 'blueviolet' }}
              />
              <input
                className="btnColor"
                type="button"
                onClick={this.changeColor}
                style={{ backgroundColor: 'palegoldenrod' }}
              />
              <input
                className="btnColor"
                type="button"
                onClick={this.changeColor}
                style={{ backgroundColor: 'plum' }}
              />
              <input
                className="btnColor"
                type="button"
                onClick={this.changeColor}
                style={{ backgroundColor: 'rebeccapurple' }}
              />
              <span className="btn">操作按钮：</span>
              <button
                className={this.state.eraserClass}
                onClick={this.openEraser}
              >
                橡皮擦
              </button>
              <button className="btn" onClick={this.clearCanvas}>
                清空画布
              </button>
              <button className="btn" onClick={this.saveIMG}>
                保存图片
              </button>
            </div>
          </div>
      </div>
    )
  }
  componentDidMount() {
    const timer = setTimeout(() => {
      this.handleInitDraw()
    })
    this.setState({ timer })
  }
  componentWillUnmount() {
    window.clearTimeout(this.state.timer)
  }
}

export default DrawPanel
