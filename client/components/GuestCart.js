import React, {Component, Fragment} from 'react'
import Axios from 'axios'
import TakeGuestMoney from './StripeGuest'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'

const styles = {
  card: {
    width: 300,
    height: 500
    // marginBottom: 100
  },
  media: {
    height: 0,
    paddingTop: '100%'
    // imageHeight: 80
  }
}
class GuestCart extends Component {
  constructor() {
    super()
    this.state = {
      cart: {}
    }
    this.subtotal = this.subtotal.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  async componentDidMount() {
    const {data} = await Axios.get('/api/carts/guestCart')
    this.setState({cart: data})
  }

  async handleClick(event, productId) {
    console.log('e.target.value', event.target.value)
    let inc = Number(event.target.value)
    if (this.state.cart[productId].quantity === 1 && inc === -1) {
      console.log('stop!!!')
    } else {
      await Axios.put('/api/carts/guestCart', {productId, inc})
      const {data} = await Axios.get('/api/carts/guestCart')
      this.setState({cart: data})
    }
  }
  async handleCheckout() {
    let {data} = await Axios.put('/api/carts/guestCheckout', {
      cart: this.state.cart,
      subtotal: this.subtotal()
    })
    this.setState({cart: data})
  }

  subtotal() {
    if (Object.keys(this.state.cart).length) {
      let cart = this.state.cart
      return Object.keys(this.state.cart).reduce(
        (acc, curr) => acc + cart[curr].price * cart[curr].quantity,
        0
      )
    } else return '0'
  }
  render() {
    let cart = this.state.cart
    return (
      <Fragment>
        <div style={{display: 'flex'}}>
          {Object.values(cart).map(value => {
            let product = value
            return (
              <Fragment key={product.id}>
                <Card style={styles.card}>
                  <Link to={`/products/${product.id}`}>
                    <CardHeader
                      title={`Product #${product.id}`}
                      subheader={product.title}
                    />
                    <CardMedia
                      style={styles.media}
                      className="Product-media-207"
                      image={product.photoURL}
                      title={product.title}
                    />
                  </Link>
                  <CardContent>
                    <div>
                      <Typography>{`Price: $${product.price /
                        100}`}</Typography>

                      <Typography>Quantity: {product.quantity}</Typography>
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
                        onClick={e => this.handleClick(e, product.id)}
                      >
                        delete
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </Fragment>
            )
          })}
        </div>
        <br />

        <Typography variant="h3">
          {' '}
          Subtotal: {'$' + this.subtotal() / 100}
        </Typography>
        <br />
        <TakeGuestMoney />
      </Fragment>
    )
  }
}

export default GuestCart
