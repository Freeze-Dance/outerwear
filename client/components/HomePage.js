import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {Link} from 'react-router-dom'
import './Homepage.css'
/**
 * COMPONENT
 */

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      category: '',
      search: '',
      currentPage: 1,
      productsPerPage: 3
    }
    this.handleChange = this.handleChange.bind(this)
    this.changePage = this.changePage.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleChange(event) {
    this.setState({
      category: event.target.value
    })
  }

  changePage(event) {
    console.log('event', typeof +event.target.id)
    this.setState({
      currentPage: +event.target.id
    })
  }

  render() {
    const endIdx = this.state.currentPage * this.state.productsPerPage
    const startIdx = endIdx - this.state.productsPerPage
    const currentProducts = this.props.products.slice(startIdx, endIdx)
    const pageNumbers = []
    for (
      let i = 1;
      i <= Math.ceil(this.props.products.length / this.state.productsPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }
    return (
      <React.Fragment>
        <h1>All Products</h1>
        <select onChange={this.handleChange}>
          <option value="">...</option>
          <option value="hats">Hats</option>
          <option value="gloves">Gloves</option>
          <option value="scarves">Scarves</option>
          <option value="coats">Coats</option>
          <option value="pants">Pants</option>
        </select>
        Search:{' '}
        <input
          type="text"
          value={this.state.search}
          onChange={e => this.setState({search: e.target.value})}
        />
        <ul>
          {currentProducts.map(product => {
            return !this.state.category &&
              product.title
                .toUpperCase()
                .includes(this.state.search.toUpperCase()) ? (
              <Link to={`/products/${product.id}`}>
                <li key={product.id}>
                  {product.title} : {`$${product.price / 100}`} <br />
                  <img src={product.photoURL} />
                </li>
              </Link>
            ) : product.categories.length ? (
              product.categories[0].name === this.state.category &&
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
            ) : null
          })}
        </ul>
        <ul className="page-ul">
          {pageNumbers.map(page => (
            <li
              className="pageNumber"
              key={page}
              id={page}
              onClick={this.changePage}
            >
              {page}
            </li>
          ))}
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
