import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    //   minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
})

function OrderStatusSelect(props) {
  // pass onChange handler from DashboardOrders through Order to this component
  // default status should be what is currently in Order component
  const {classes, handleOrderStatusChange, order} = props
  return (
    <FormControl className={classes.root}>
      <Select
        value=""
        onChange={event => handleOrderStatusChange(event, order)}
        className={classes.selectEmpty}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Update Order Status
        </MenuItem>
        <MenuItem value="Created">Created</MenuItem>
        <MenuItem value="Processing">Processing</MenuItem>
        <MenuItem value="Canceled">Canceled</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </Select>
    </FormControl>
  )
}

export default withStyles(styles)(OrderStatusSelect)
