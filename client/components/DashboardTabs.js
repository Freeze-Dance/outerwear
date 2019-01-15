import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router'
import {Redirect} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const defaultState = '/dashboard'

class DashboardTabs extends Component {
  constructor() {
    super()
    this.state = {
      value: defaultState
    }
    this.handleChange = this.handleChange.bind(this)
  }

  // componentDidUpdate() {
  //   this.setState(prev => {
  //     return {
  //       value: prev.value
  //     }
  //   })
  // }

  handleChange(event, value) {
    this.setState({
      value: value
    })
    this.props.history.push(value)
  }

  render() {
    return (
      <Fragment>
        <Paper>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Product Catalog" value="/dashboard" />
            <Tab label="Customer Orders" value="/dashboardorders" />
            <Tab label="User Accounts" value="/allusers" />
          </Tabs>
        </Paper>
        <Redirect to={`${this.state.value}`} />
      </Fragment>
    )
  }
}

export default withRouter(DashboardTabs)
