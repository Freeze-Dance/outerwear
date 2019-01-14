import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    width: 400,
    height: 600,
    marginBottom: theme.spacing.unit * 2
  },
  media: {
    height: 0,
    paddingTop: '90%',
    imageHeight: 200
  }
})

function Product(props) {
  const product = props.product
  const {classes} = props
  console.log(props)
  return (
    <Fragment>
      <Card className={classes.card}>
        <Link to={`/products/${product.id}`}>
          <CardHeader
            title={`Product #${product.id}`}
            subheader={`${
              product.title
            } - ${product.categories[0].name.toUpperCase()}`}
          />
          <CardMedia
            className={classes.media}
            image={product.photoURL}
            title={`${product.categories[0].name}/${product.title}`}
          />
        </Link>
        <CardContent>
          <div className="flex-space-between">
            <div>
              <Typography>{`$${product.price / 100}`}</Typography>
              <Typography component="p">
                Description: {product.description}
              </Typography>
              <Typography>
                Current Inventory: {product.inventoryQuantity} units
              </Typography>
            </div>
            <div>
              <Link to={`/editproduct/${product.id}`}>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default withStyles(styles)(Product)
