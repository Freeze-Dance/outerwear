import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers, destroyUser, promoteToAdmin} from '../store/user'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
})

class AllUser extends React.Component {
  // constructor(props) {
  //   super(props)
  //   }

  componentDidMount() {
    this.props.fetchAllUsers()
  }

  render() {
    const {allUsers} = this.props
    return (
      <React.Fragment>
        <h1>All Users</h1>
        <div>
          <Grid container spacing={40}>
            {allUsers &&
              allUsers.map(user => (
                <Grid item key={user.id} sm={6} md={4} lg={3}>
                  <Card className="card">
                    <CardContent className="cardContent">
                      <Typography gutterBottom variant="h5" component="h2">
                        {user.email}
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => this.props.promoteToAdmin(user.id)}
                        size="small"
                        color="primary"
                      >
                        Promote
                      </Button>
                      <Button
                        onClick={() => this.props.destroyUser(user.id)}
                        size="small"
                        color="primary"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  allUsers: state.user.allUsers
})

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => {
      return dispatch(fetchAllUsers())
    },
    destroyUser: userId => {
      return dispatch(destroyUser(userId))
    },
    promoteToAdmin: userId => {
      return dispatch(promoteToAdmin(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUser)
