import classNames from 'classnames'
import React, { Component } from 'react'
import {browserHistory} from 'react-router'

import {getQuestion, postAnswer, getResults} from '../../api'

export default class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: '',
      question: null,
    }
  }
  async componentDidMount() {
    const {params: {sessionId, questionId}} = this.props,
      res = await getQuestion(sessionId, questionId)

    this.setState({
      question: res.data.data,
    })
  }

  async componentWillReceiveProps({params: {sessionId, questionId}}) {
    if(questionId !== this.props.params.questionId) {
      const res = await getQuestion(sessionId, questionId)

    this.setState({
      question: res.data.data,
    })
    }
  }

  handleSublime = async (e) => {
    const {params: {sessionId, questionId}} = this.props,
      value = e.target.value
    if(!value) {
      alert('请选择答案')
      return
    }
    const result = await postAnswer(sessionId, questionId, {value})
    this.setState({
      question: result.data.data
    })
    console.log(result)
  }
  handleNext = () => {
    const {params: {sessionId}} = this.props
    this.state.question.question.question_order === 9 ? browserHistory.push(`/finish/${sessionId}`) : browserHistory.push(`/question/${sessionId}/${this.state.question.next}`)
  }
  render() {
    const {question} = this.state
    return <div className="question">
      <header>
      {
        question && question.correct === null && <h4 className="question-content">
          {
            question && question.question.title
          }
        </h4>
      }
      {
        question && (question.correct  === false || question.correct === true ) && <div className={classNames('isRight', {'question-right': question.correct, 'question-wrong': !question.correct})}>
          <div className="question-isRight">{question.correct ? '正确' : '错误'}</div>
          <button className="question-next-button" onClick={this.handleNext}>{this.state.question.question.question_order === 9 ? "结束答题" : "下一题"}</button>
        </div>
      } 
      </header> 
      
      <ul>
        {
          question && question.answer.options.map(item => 
            (
              <li data-questionid={item._id} className={classNames('option',{'answer-right': question.correct === true && item._id === question.chooseValue, 'answer-wrong': question.correct === false && item._id === question.chooseValue})}>
                {question.correct === null && <input type="radio" className="question-choose" name="answer" value={item._id} onClick={this.handleSublime} />}
                {question.correct !== null && <span className="question-choose-icon">{item.correct ? '√' : '×'}</span>} 
                <span className="option-content">{item.label}</span>
              </li>
            )
          )
        }
      </ul>
    </div>
  } 

}