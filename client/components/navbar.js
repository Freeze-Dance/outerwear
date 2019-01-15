import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'
import DashboardTabs from './DashboardTabs'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 10
  },
  button: {
    color: '#ffffff'
  },
  siteTitle: {
    color: '#ffffff',
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20
  },
  icon: {
    marginRight: -25,
    marginLeft: 20
  }
})

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      dashboard: false
    }
    this.handleDashBoardClick = this.handleDashBoardClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchUser()
  }

  handleDashBoardClick(event) {
    event.preventDefault()
    this.setState(prev => {
      return {
        dashboard: !prev.dashboard
      }
    })
  }

  render() {
    let {isLoggedIn, isAdmin, handleClick} = this.props
    const {classes} = this.props
    return (
      <Fragment>
        <AppBar position="static" className={classes.root}>
          <nav className="flex-wrap-only">
            <Icon className={classes.icon}>ac_unit</Icon>
            <Typography
              variant="h4"
              color="textPrimary"
              className={classes.siteTitle}
            >
              Freeze Dance
            </Typography>
            {isLoggedIn ? (
              <div>
                <Button>
                  <Link to="/">Home</Link>
                </Button>
                <Button>
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>
                </Button>
                <Button>
                  <Link to={`/orderhistory/${this.props.user.id}`}>
                    Previous Orders
                  </Link>
                </Button>
                <Button>
                  <Link to={`/cart/${this.props.user.id}`}>Cart</Link>
                </Button>

                {isAdmin && (
                  <Button
                    className={classes.button}
                    onClick={this.handleDashBoardClick}
                  >
                    Admin Dashboard
                    {this.state.dashboard === false ? (
                      <Icon>expand_more</Icon>
                    ) : (
                      <Icon>expand_less</Icon>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Button>
                  <Link to="/">Home</Link>
                </Button>
                <Button>
                  <Link to="/login">Login</Link>
                </Button>
                <Button>
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button>
                  <Link to="/cart">Cart</Link>
                </Button>
              </div>
            )}
          </nav>
        </AppBar>
        {isAdmin && this.state.dashboard && <DashboardTabs />}
      </Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.user.id,
    isSingleProduct: !!state.currentProduct,
    isAdmin: !!state.user.user.admin,
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
