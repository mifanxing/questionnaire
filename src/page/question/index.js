import React, { Component } from 'react'
// import R from 'ramda'
import classNames from 'classnames'
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
      res = await getQuestion(sessionId, questionId),
      results = await getResults(sessionId)

    this.setState({
      question: res.data.data,
    })
  }
  handleClick = (e) => {
    this.setState({
      answer: e.target.value
    })
  }
   handleSublime = async () => {
    const {params: {sessionId, questionId}} = this.props
    if(!this.state.answer) {
      alert('请选择答案')
      return
    }
    const result = await postAnswer(sessionId, questionId, {value: this.state.answer})
    this.setState({
      question: result.data.data
    })
    console.log(result)
  }
  render() {
    const {question} = this.state
    return <div> 
      <h4>
        {
          question && question.question.title
        }
      </h4>
      <ul>
        {
          question && question.answer.options.map(
           item => (<li data-questionid={item._id} className={classNames({'right': item.correct === true, 'wrong': item.correct === false})}>
              <input type="radio" name="answer" value={item._id} onClick={this.handleClick} checked={item.correct}/>
              {item.label}
            </li>)
          )
        }
      </ul>
      <button onClick={this.handleSublime}>提交</button>
    </div>
  } 

}