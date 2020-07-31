import React, { Component } from 'react'
import PropTypes from 'prop-types'
export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }
  static childContextTypes = {
    store: PropTypes.object
  }
  constructor(props, context) {
    super(props)
    console.log(props, context)
  }

  getChildContext() {
    return { store: this.props.store }
  }
  render() {
    return this.props.children
  }
}
export function connect(mapStateToProps, mapDispatchToProps) {
  console.log(mapStateToProps, mapDispatchToProps)
  return (UIComponent) => {
    return class ContainerComponent extends Component {
      static propTypes = {
        store: PropTypes.object
      }
      static contextTypes = {
        store: PropTypes.object
      }
      constructor(props, context) {
        super(props)
        console.log(props, context)
        let { store } = context
        let stateProps = mapStateToProps(store.getState())
        this.state = { ...stateProps }
        let dispatchProps
        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(store.dispatch)
        } else {
          dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
            let createAction = mapDispatchToProps[key]
            pre[key] = (...args) => store.dispatch(createAction(...args))
            return pre
          }, {})
        }
        this.dispatchProps = dispatchProps
        store.subscribe(() => {
          this.setState({ ...mapStateToProps(store.getState()) })
        })
      }

      render() {
        return <UIComponent {...this.state} {...this.dispatchProps}></UIComponent>
      }
    }
  }
} 