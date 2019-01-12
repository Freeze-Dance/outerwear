import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
import {formatSequelizeTimeToDate, formatSequelizeTimeToTime} from '../../utils'

const styles = {
  root: {
    margin: 20,
    padding: 20
  }
}

function Order(props) {
  const {id, time, orderStatus, products, subTotal} = props.order
  const {classes} = props
  return (
    <Fragment>
      <Paper className={classes.root}>
        <div className="flex-space-between">
          <Typography variant="h5" align="left" gutterBottom>
            Order# {id}
          </Typography>
          <Typography variant="subtitle1">
            Submitted {formatSequelizeTimeToDate(time)} @{formatSequelizeTimeToTime(
              time
            )}
          </Typography>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </TableCell>
                <TableCell>
                  ${product.orderProduct.purchasedPrice / 100}
                </TableCell>
                <TableCell>{product.orderProduct.quantity}</TableCell>
                <TableCell>
                  ${product.orderProduct.purchasedPrice *
                    product.orderProduct.quantity /
                    100}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell>${subTotal / 100}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Order Status</TableCell>
              <TableCell>{orderStatus}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  )
}

export default withStyles(styles)(Order)
