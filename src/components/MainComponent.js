import React, { Component } from 'react';
import config from './config.json'

export default class MainComponent extends Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
    this.populateComponents = this.populateComponents.bind(this)
  }
  state = {
    activeComponent: null
  }
  onClick(componentName) {
    const depComps = config[componentName]
    // const selectedComponent = require(`./${componentName}`).default
    const actualComponents = depComps.map((component) => {
      return require(`./${component}`).default
    })
    this.setState({ activeComponent: actualComponents })
  }
  populateComponents() {
    if(!this.state.activeComponent) {
      return null
    }
    return this.state.activeComponent.map((Component, index) => {
      return (
          <div key={index}>
            <Component />
          </div>
      );
    })
  }
  render() {
    return (
      <div>
        <header style={{
          textAlign:'center'
        }}>
          <h2>Dynamic Module loader</h2>
          <button className="btn" type="button" onClick={() => this.onClick('FirstComponent')}>Component1</button>
          <button style={{margin:'10px'}} className="btn" type="button" onClick={() => this.onClick('SecondComponent')}>Component2</button>
        </header>
        <div style={{
          textAlign:'center',
          width: '100%',
          height: '1000px',
          backgroundColor: 'aliceblue'
        }}>
          {
            this.populateComponents()
          }
        </div>
      </div>
    );
  }
}
