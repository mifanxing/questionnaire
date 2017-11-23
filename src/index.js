import {render} from 'react-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Router, IndexRoute, Route, browserHistory} from 'react-router'

import './less/index.less'
import Index from './page/index'
import Question from './page/question'

render(
  <Router history={browserHistory}>
    <Route path='/'>
      <IndexRoute component={Index} />
      <Route path="question/:sessionId/:questionId" component={Question} ></Route>
    </Route>
  </Router>
, document.getElementById('root'))