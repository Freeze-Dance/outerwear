/*
We will redirect our user to this component if we
need them to change their password
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {resetPassword} from '../store'

/**
 * COMPONENT
 */
class PasswordReset extends Component {
  constructor(props) {
    super(props)
    this.state = {password: '', confirmPassword: '', error: ''}
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({error: 'Passwords do not match'})
    } else {
      this.setState({error: ''})
      this.props.resetPassword(this.state.password, this.props.user.user.id)
    }
  }

  render() {
    const {error} = this.state
    return (
      <div>
        <h1> Password Reset Form </h1>
        <form onSubmit={this.handleSubmit} name={name}>
          <div>
            <label htmlFor="Password">
              <small>Password</small>
            </label>
            <input name="password" type="password" onChange={this.onChange} />
          </div>
          <div>
            <label htmlFor="password">
              <small>Confirm Password</small>
            </label>
            <input
              name="confirmPassword"
              type="password"
              onChange={this.onChange}
            />
          </div>
          <div>
            <button type="submit">Change Password</button>
          </div>
          {error && <div> {error} </div>}
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  resetPassword: (password, userId) => {
    return dispatch(resetPassword(password, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
