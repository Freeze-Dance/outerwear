import React from 'react'
import {createProduct} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class NewProduct extends React.Component {
  constructor() {
    super()
    this.state = {title: '', price: ''}
  }

  render() {
    console.log(this.state)
    return (
      <form
        onSubmit={async evt => {
          evt.preventDefault()
          console.log(this.props)
          await this.props.createProduct(this.state)
          this.props.history.push('/dashboard')
        }}
      >
        <div>
          <label htmlFor="title">
            <small>Title</small>
          </label>
          <input
            name="title"
            type="text"
            onChange={event => {
              this.setState({title: event.target.value})
            }}
            value={this.state.title}
          />
        </div>
        <div>
          <label htmlFor="price">
            <small>Price</small>
          </label>
          <input
            name="price"
            type="text"
            onChange={event => {
              this.setState({price: event.target.value})
            }}
            value={this.state.price}
          />
        </div>
        <div>
          <button type="submit">New Product</button>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  createProduct: newProduct => dispatch(createProduct(newProduct))
})
export default connect(null, mapDispatch)(NewProduct)
