import React, {Component, Fragment} from 'react'

function Order(props) {
  const {id, time, orderStatus, products, subTotal} = props.order
  return (
    <Fragment>
      <h2>Order</h2>
      <li>
        <div>
          <div>{id}</div>
          <div>{time}</div>
        </div>
        <div>
          {products.map(product => (
            <div key={product.id}>
              <ul>
                <li>{product.title}</li>
                <li>{product.price}</li>
                <li>{product.orderProductQuantity}</li>
                <li>{product.price * product.orderProductQuantity}</li>
              </ul>
              <div>{subTotal}</div>
              <div>{orderStatus}</div>
            </div>
          ))}
        </div>
      </li>
    </Fragment>
  )
}

export default Order
