import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {getQuiz} from '../../api'

export default class Index extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    getQuiz().then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <div>
        hello react
      </div>
    )
  }
}