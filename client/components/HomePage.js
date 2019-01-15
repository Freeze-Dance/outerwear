import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {Link} from 'react-router-dom'
import Product from './Product'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'

import './Homepage.css'

const styles = theme => ({
  root: {
    minWidth: 160,
    marginLeft: 20,
    marginRight: 40,
    marginBottom: 20
  },
  searchRoot: {
    marginRight: 20
  },
  headerRoot: {
    marginLeft: 20
  },
  button: {
    margin: 20
  }
})
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
      productsPerPage: 6
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

  handleSearchChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  changePage(event) {
    this.setState({
      currentPage: +event.target.id
    })
  }

  render() {
    // getting and filter products
    const allProducts = this.props.products
      .filter(
        // filter for category select
        product =>
          product.categories[0].name === this.state.category ||
          this.state.category === ''
      )
      .filter(
        // filter for search input entry
        product =>
          product.title
            .toUpperCase()
            .includes(this.state.search.toUpperCase()) ||
          product.categories[0].name.toUpperCase() ===
            this.state.search.toLocaleUpperCase() ||
          this.state.search === ''
      )
      .map(product => (
        <Product className="card" key={product.id} product={product} />
      ))

    // pagination
    const endIdx = this.state.currentPage * this.state.productsPerPage
    const startIdx = endIdx - this.state.productsPerPage
    const currentProducts = allProducts.slice(startIdx, endIdx)
    const pageNumbers = []
    for (
      let i = 1;
      i <= Math.ceil(this.props.products.length / this.state.productsPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }

    // classes prop
    const {classes} = this.props
    return (
      <React.Fragment>
        <div className="flex-space-between">
          <div className="flex-flex-start margin-20">
            <div>
              <FormControl className={classes.root}>
                <FormHelperText>Filter Categories</FormHelperText>
                <Select
                  value={this.state.category}
                  onChange={event => this.handleChange(event)}
                  displayEmpty
                >
                  <MenuItem value="">Show All</MenuItem>
                  <MenuItem value="hats">Hats</MenuItem>
                  <MenuItem value="gloves">Gloves</MenuItem>
                  <MenuItem value="scarves">Scarves</MenuItem>
                  <MenuItem value="coats">Coats</MenuItem>
                  <MenuItem value="pants">Pants</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                className={classes.searchRoot}
                label="Search..."
                type="text"
                value={this.state.search}
                onChange={event => this.handleSearchChange(event)}
              />
            </div>
          </div>
        </div>

        <div className="flex">{currentProducts}</div>

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
    products: state.product.products
  }
}

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(withStyles(styles)(HomePage))

/**
 * PROP TYPES
 */
// HomePage.propTypes = {
//   email: PropTypes.string
// }
