import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { increase, decrease } from '../redux/actions'
class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increase: PropTypes.func.isRequired,
    decrease: PropTypes.func.isRequired,
    asyncIncrease: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.countFormRef = React.createRef()
    // this.state = {
    //   count: 0
    // }
  }
  increaseCount = () => {
    let number = this.countFormRef.current.value * 1
    // this.setState(state => ({count: state.count + number}))
    // this.props.store.dispatch(increase(number))
    this.props.increase(number)
  }
  decreaseCount = () => {
    let number = this.countFormRef.current.value * 1
    // this.setState(state => ({count:state.count - number}))
    // this.props.store.dispatch(decrease(number))
    this.props.decrease(number)

  }
  oddIncreaseCount = () => {
    // if (this.state.count % 2 === 1) {
    // if (this.props.store.getState().count % 2 === 1) {
    if (this.props.count % 2 === 1) {
      let number = this.countFormRef.current.value * 1
      // this.setState(state => ({count: state.count + number}))
      // this.props.store.dispatch(increase(number))
      this.props.increase(number)
    }
  }
  asyncIncreaseCount = () => {
    let number = this.countFormRef.current.value * 1
    // setTimeout(() => {
    //   // this.setState(state => ({count: state.count + number}))
    //   // this.props.store.dispatch(increase(number))
    //   // this.props.increase(number)
    // }, 1000)
    this.props.asyncIncrease(number)
  }
  render() {
    // const count = this.props.store.getState().count
    const count = this.props.count
    return (
      <div>
        <div>{count}</div>
        <select ref={this.countFormRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increaseCount}>增加</button>
        <button onClick={this.decreaseCount}>减少</button>
        <button onClick={this.oddIncreaseCount}>奇数才增加</button>
        <button onClick={this.asyncIncreaseCount}>异步增加</button>
      </div>
    )
  }
}

export default Counter
