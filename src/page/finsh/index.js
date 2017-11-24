import classNames from 'classnames'
import React, { Component } from 'react'
import {browserHistory} from 'react-router'

import {getResults, getQuiz, postSession} from '../../api'

export default class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null
    }
  }

  async componentDidMount() {
    const {params: {sessionId}} = this.props,
      res = await getResults(sessionId)
    this.setState({
      result: res.data.data,
    })
  }
  handleStart = async () => {
    const quize = await getQuiz(),
     session = await postSession(quize.data.data._id),
     sessionId = session.data.data.session_id,
     questionId = session.data.data.id
    console.log(quize, session)
    browserHistory.push(`/question/${sessionId}/${questionId}`)
  }
  render() {
    const {result} = this.state
    return <div className="app">
      <div>
        您的最终得分：
        <span className="score">
          {
            result && result.score
          }
        </span>
      </div>
      <div className="total">
        您一共答了{result && result.total}道题，答对一题得一分。
      </div>
      <div>
        <button className="question-next-button" onClick={this.handleStart}>重新答题</button>
      </div>
    </div>
  } 

}