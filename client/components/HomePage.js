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
  }
  async componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <h1>All Products</h1>

        <ul>
          {this.props.products.map(product => {
            return (
              <li key={product.id}>
                {product.title} {product.price}
                {product.categories.length > 0 ? (
                  product.categories[0].color
                ) : (
                  <div />
                )}
                <img src={product.photoURL} />
              </li>
            )
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
