import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      color: '',
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleChange(event) {
    this.setState({
      color: event.target.value
    })
  }

  render() {
    console.log(this.state)
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
        Search:{' '}
        <input
          type="text"
          value={this.state.search}
          onChange={e => this.setState({search: e.target.value})}
        />
        <ul>
          {this.props.products.map(product => {
            return !this.state.color &&
              product.title
                .toUpperCase()
                .includes(this.state.search.toUpperCase()) ? (
              <Link to={`/products/${product.id}`}>
                <li key={product.id}>
                  {product.title} : {`$${product.price / 100}`} <br />
                  <img src={product.photoURL} />
                </li>
              </Link>
            ) : product.categories[0].color === this.state.color &&
            product.title
              .toUpperCase()
              .includes(this.state.search.toUpperCase()) ? (
              <Link to={`/products/${product.id}`}>
                <li key={product.id}>
                  {product.title} : {`$${product.price / 100}`} <br />
                  <img src={product.photoURL} />
                </li>
              </Link>
            ) : null
          })}
        </ul>
      </React.Fragment>
    )
  }
}

console.log('hello darkness my old friend'.includes('hello'))
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
