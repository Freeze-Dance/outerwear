import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store'
import Product from './Product'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles'

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

class dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      category: '',
      search: ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleFilterChange(event) {
    this.setState({
      category: event.target.value
    })
  }

  handleSearchChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  render() {
    // note requirements - all products must belong to at least one category
    const allCatalogProducts = this.props.products
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
    const {classes} = this.props
    return (
      <Fragment>
        <div className="flex-space-between">
          <div className="flex-flex-start margin-20">
            <div>
              <FormControl className={classes.root}>
                <FormHelperText>Filter Categories</FormHelperText>
                <Select
                  value={this.state.category}
                  onChange={event => this.handleFilterChange(event)}
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
          <div>
            <Button
              variant="contained"
              color="primary"
              type="button"
              className={classes.button}
            >
              <Link to="/newproduct">Add Product</Link>
            </Button>
          </div>
        </div>

        <div className="flex">{allCatalogProducts}</div>
      </Fragment>
    )
  }
}
const mapState = state => {
  return {
    products: state.product.products
  }
}

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(withStyles(styles)(dashboard))
