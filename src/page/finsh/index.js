import classNames from 'classnames'
import React, { Component } from 'react'

import {getResults} from '../../api'

export default class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null
    }
  }

  async componentDidMount() {
    const {params: {sessionId, questionId}} = this.props,
      res = await getResults(sessionId)
    console.log(res)
    this.setState({
      result: res.data.data,
    })
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
      
    </div>
  } 

}