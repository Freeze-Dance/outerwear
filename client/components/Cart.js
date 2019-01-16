import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart, submitCart, editQuantity, deleteItem} from '../store/cart'
import TakeMoney from './StripeCheckout'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'

const styles = {
  card: {
    width: 300,
    height: 700
    // marginBottom: 100
  },
  media: {
    height: 0,
    paddingTop: '100%'
    // imageHeight: 80
  }
}

class Cart extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.subtotal = this.subtotal.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart(this.props.match.params)
  }

  handleClick(e, productId, quantity) {
    if (quantity === 1 && e.target.value === 'subtract') console.log('stop!!!')
    else {
      this.props.editQuantity(e.target.value, productId, this.props.cart.id)
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    // this.props.submitCart(
    //   this.props.cart.id,
    //   this.props.cart.products,
    //   this.props.match.params
    // )
    // this.props.history.push(`/stripeUser/${this.props.match.params.userId}`)
    // this.props.history.push(`/orderhistory/${this.props.match.params.userId}`)
  }

  handleDelete(cartId, productId, userId) {
    console.log(cartId, productId, userId)
    this.props.deleteItem(cartId, productId, userId)
  }
  subtotal() {
    return this.props.cart.products.reduce(
      (acc, curr) => acc + curr.cartProduct.quantity * curr.price,
      0
    )
  }

  render() {
    const cart = this.props.cart
    return (
      <React.Fragment>
        {cart.products.length ? (
          <form onSubmit={this.handleSubmit}>
            <div style={{display: 'flex'}}>
              {cart.products.map(product => {
                return (
                  <React.Fragment key={product.id}>
                    <Card style={styles.card}>
                      <Link to={`/products/${product.id}`}>
                        <CardHeader
                          title={`Product #${product.id}`}
                          subheader={product.title}
                        />
                        <CardMedia
                          style={styles.media}
                          className="Product-media-207"
                          image={'/' + product.photoURL}
                          title={product.title}
                        />
                      </Link>
                      <CardContent>
                        <div>
                          <Typography>{`Price: $${product.price /
                            100}`}</Typography>
                          <Typography>
                            Quantity: {product.cartProduct.quantity}
                          </Typography>
                        </div>
                        <br />
                        <div>
                          <button
                            type="button"
                            value="1"
                            onClick={e => this.handleClick(e, product.id)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            value="-1"
                            onClick={e => this.handleClick(e, product.id)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            value="0"
                            onClick={() =>
                              this.handleDelete(
                                cart.id,
                                product.id,
                                this.props.match.params
                              )
                            }
                          >
                            delete
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </React.Fragment>
                )
              })}
            </div>
            <Typography variant="h3">
              Subtotal: {`$${this.subtotal() / 100}`}
            </Typography>
            <br />
            <TakeMoney />
          </form>
        ) : (
          <div>No items in the cart. Get shopping!</div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.currentCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: userId => dispatch(fetchCart(userId)),
    submitCart: (cartId, products, userId) =>
      dispatch(submitCart(cartId, products, userId)),
    editQuantity: (sign, productId, cartId) => {
      return dispatch(editQuantity(sign, productId, cartId))
    },
    deleteItem: (cartId, productId, userId) => {
      return dispatch(deleteItem(cartId, productId, userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
