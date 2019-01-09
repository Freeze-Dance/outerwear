import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import store, {fetchProducts} from '../store'

/**
 * COMPONENT
 */

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProducts()
  }

  handleChange(event) {
    this.setState({
      color: event.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1>All Products</h1>
        <select onChange={this.handleChange}>
          <option value="">...</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="yellow">Yellow</option>
        </select>
        <ul>
          {this.props.products.map(product => {
            return !this.state.color ? (
              <li key={product.id}>
                {product.title} {product.price}
                <img src={product.photoURL} />
              </li>
            ) : product.categories[0].color === this.state.color ? (
              <li key={product.id}>
                {product.title} {product.price}
                <img src={product.photoURL} />
              </li>
            ) : null
          })}
        </ul>
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.product.products,
    test: 'string'
  }
}

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(HomePage)

/**
 * PROP TYPES
 */
// HomePage.propTypes = {
//   email: PropTypes.string
// }
