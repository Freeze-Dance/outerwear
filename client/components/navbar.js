import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'
import DashboardTabs from './DashboardTabs'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: 10
  },
  colorTextPrimary: {
    color: '#ffffff'
  },
  siteTitle: {
    color: '#ffffff',
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20
  }
}

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
    // console.log('hitting click')
    this.setState(prev => {
      return {
        dashboard: !prev.dashboard
      }
    })
  }

  render() {
    let {isLoggedIn, isAdmin, handleClick} = this.props
    const {classes} = this.props
    // console.log(this.props, '<<< navbar')
    return (
      <Fragment>
        <AppBar position="static" className={classes.root}>
          <nav className="flex-wrap-only">
            <Typography
              variant="h4"
              color="textPrimary"
              className={classes.siteTitle}
            >
              Freeze Dance
            </Typography>
            {isLoggedIn ? (
              <div>
                <Link to="/">
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    className={classes.colorTextPrimary}
                  >
                    Home
                  </Typography>
                </Link>
                <a href="#" onClick={handleClick}>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    className={classes.colorTextPrimary}
                  >
                    Logout
                  </Typography>
                </a>
                <Link to={`/orderhistory/${this.props.user.id}`}>
                  {/* <Typography
                    variant="h6"
                    color="textPrimary"
                    className={classes.colorTextPrimary}
                  > */}
                  Previous Orders
                  {/* </Typography> */}
                </Link>
                {isAdmin ? (
                  <Button>
                    <Link to="/dashboard" onClick={this.handleDashBoardClick}>
                      {/* <Typography
                        variant="h6"
                        color="textPrimary"
                        className={classes.colorTextPrimary}
                      > */}
                      Dashboard
                      {/* </Typography> */}
                    </Link>
                  </Button>
                ) : (
                  <Button>
                    <Link to={`/cart/${this.props.user.id}`}>
                      {/* <Typography
                        variant="h6"
                        color="textPrimary"
                        className={classes.colorTextPrimary}
                      > */}
                      Cart
                      {/* </Typography> */}
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Button>
                  <Link to="/">
                    {/* <Typography
                      variant="h6"
                      color="textPrimary"
                      className={classes.colorTextPrimary}
                    > */}
                    Home
                    {/* </Typography> */}
                  </Link>
                </Button>
                <Button>
                  <Link to="/login">
                    {/* <Typography
                      variant="h6"
                      color="textPrimary"
                      className={classes.colorTextPrimary}
                    > */}
                    Login
                    {/* </Typography> */}
                  </Link>
                </Button>
                <Button>
                  <Link to="/signup">
                    {/* <Typography
                      variant="h6"
                      color="textPrimary"
                      className={classes.colorTextPrimary}
                    > */}
                    Sign Up
                    {/* </Typography> */}
                  </Link>
                </Button>
                <Button>
                  <Link to="/cart">
                    {/* <Typography
                      variant="h6"
                      color="textPrimary"
                      className={classes.colorTextPrimary}
                    > */}
                    Cart
                    {/* </Typography> */}
                  </Link>
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
