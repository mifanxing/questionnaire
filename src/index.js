import {render} from 'react-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Router, IndexRoute, Route, browserHistory} from 'react-router'
import Index from './page/index'


render(
  <Router history={browserHistory}>
    <Route path='/'>
      <IndexRoute component={Index} />
    </Route>
  </Router>
, document.getElementById('root'))