import React from 'react'
import {createProduct, editproduct} from '../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {title: '', price: ''}
  }
  render() {
    return (
      <div>
        <form
          onSubmit={async evt => {
            evt.preventDefault()
            await this.props.editproduct(this.props.match.params.id, this.state)
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
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  editproduct: (id, product) => dispatch(editproduct(id, product))
})
export default connect(null, mapDispatch)(EditProduct)
