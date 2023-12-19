import React from 'react'

import './App.css'
import Wheel from './component'

export default class App extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <div className='App'>
        <Wheel />
      </div>
    )
  }
}
