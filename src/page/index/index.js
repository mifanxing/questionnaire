import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {browserHistory} from 'react-router'


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
      sessionId = res.data.data.session_id,
      questionId = res.data.data.id

    browserHistory.push(`/question/${sessionId}/${questionId}`)
  }
  render() {

    return (
      <div className="app">
        <header className="index__header">
          {this.state.quiz.description}
        </header>
        <button className="question-next-button" onClick={this.handleStart}>开始测试</button>
      </div>
    )
  }
}