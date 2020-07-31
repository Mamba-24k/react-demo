
import { connect } from 'react-redux'
// import { connect } from '../lib/my-react-redux'

import { increase, decrease, asyncIncrease } from '../redux/actions'

import Counter from '../components/counter'
// const mapStateToProps = (state, ownProps) => {
//   return {
//     count: state.count
//   }
// }
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     increase: (number) => {
//       dispatch(increase(number))
//     },
//     decrease: (number) => {
//       dispatch(decrease(number))
//     },
//     asyncIncrease: (number) => {
//       dispatch(asyncIncrease(number))
//     },
//   }
// }
export default connect(
  // mapStateToProps,
  state => ({ count: state.count }),
  // mapDispatchToProps
  { increase, decrease, asyncIncrease }
)(Counter)