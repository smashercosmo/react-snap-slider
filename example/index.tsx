import React from 'react'
import ReactDOM from 'react-dom'

import '../src/index.css'
import App from './app'

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
