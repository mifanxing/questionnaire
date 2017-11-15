import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {browserHistory} from 'react-router'
import base64 from 'base64url'

import {getQuiz, postSession} from '../../api'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quiz: {}
    }
  }
  async componentDidMount() {
    //获取 quiz
    const res = await getQuiz()
    this.setState({
      quiz: res.data.data
    })
  }
  handleStart = async () => {
    const res = await postSession(this.state.quiz._id),
      sessionId = res.data.data._id,
    //将sessionId和question编码成base64格式，便于URL传输
      urlComponent = base64(`/${sessionId}/5a0ab91a5855c713c4432e90`)
    browserHistory.push(`/question/${urlComponent}`)
  }
  render() {
    console.log(this.state.data)
    return (
      <div className="app">
        <header className="index__header">
          {this.state.quiz.description}
        </header>
        <button onClick={this.handleStart}>开始测试</button>
      </div>
    )
  }
}