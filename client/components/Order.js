import React, {Fragment} from 'react'

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
              <img src={product.photoURL} />
              <ul>
                <li>{product.title}</li>
                <li>${product.price / 100}</li>
                <li>{product.orderProductQuantity}</li>
                <li>${product.price * product.orderProductQuantity / 100}</li>
              </ul>
              <div>SubTotal: ${subTotal / 100}</div>
              <div>Order Status: {orderStatus}</div>
            </div>
          ))}
        </div>
      </li>
    </Fragment>
  )
}

export default Order
