import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {withStyles} from '@material-ui/core/styles'

class DashboardTabs extends Component {
  constructor() {
    super()
    this.state = {
      value: '/dashboard'
    }
    this.handleChange = this.handleChange.bind(this)
  }

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
            <Tab label="User Accounts" />
          </Tabs>
        </Paper>
      </Fragment>
    )
  }
}

export default withRouter(DashboardTabs)
