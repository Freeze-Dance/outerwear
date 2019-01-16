import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class DashboardTabs extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, value) {
    this.setState({
      value
    })
    this.props.history.push(value)
  }

  render() {
    console.log(this.props.history.location.pathname)
    const tabs = ['/dashboard', '/dashboardorders', '/allusers']
    const valueForTabs = tabs.includes(this.props.history.location.pathname)
      ? this.props.history.location.pathname
      : false
    return (
      <Fragment>
        <Paper>
          <Tabs
            value={valueForTabs}
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
      </Fragment>
    )
  }
}

export default withRouter(DashboardTabs)
