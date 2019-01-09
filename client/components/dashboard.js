import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {Link} from 'react-router-dom'

class dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    console.log('????????')
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
        </select>{' '}
        <Link to="/newproduct">
          <button>New Product</button>
        </Link>
        <ul>
          {this.props.products.map(product => {
            return !this.state.color ? (
              <li key={product.id}>
                {product.title} {product.price}
                <img src={product.photoURL} />{' '}
                <Link to={`/editproduct/${product.id}`}>
                  <button>edit</button>
                </Link>
              </li>
            ) : product.categories[0].color === this.state.color ? (
              <li key={product.id}>
                {product.title} {product.price}
                <img src={product.photoURL} />{' '}
                <Link to={`/editproduct/${product.id}`}>
                  <button>edit</button>
                </Link>
              </li>
            ) : null
          })}
        </ul>
      </React.Fragment>
    )
  }
}
const mapState = state => {
  return {
    products: state.product.products,
    test: 'string'
  }
}

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(dashboard)
