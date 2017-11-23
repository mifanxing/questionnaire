import React, { Component } from 'react'
import {getQuestion} from '../../api'
export default class Question extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    const {params: {sessionId, questionId}} = this.props,
      question = await getQuestion(sessionId, questionId)
    console.log(question) 
  }
  render() {
    return <div>
      question
    </div>
  }
}