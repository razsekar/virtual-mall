import React from 'react'
import PropTypes from 'prop-types'
import { ButtonGroup, Card, CardImg, Button } from 'reactstrap'
import { addToCart } from '../actions'

const Product = ({ id, image, name, price, quantity }) => (
  <tr>
    <td>
      <Card style={{ width: '10rem', margin: '10px' }}>
        <CardImg top src={image} alt="..." />
      </Card>
    </td>
    <td>{name}</td>
    <td>
      {/* <ButtonGroup className="quantity-buttons" aria-label="Basic example">
        <Button variant="secondary" onClick = {()=> removeFromCart(product)}>-</Button>
        <Button variant="secondary">{quantity | 0}</Button>
        <Button variant="secondary" onClick = {()=> addToCart(product)}>+</Button>
      </ButtonGroup> */}
      <ButtonGroup className="quantity-buttons" aria-label="Basic example">
        <Button variant="secondary" >-</Button>
        <Button variant="secondary">{quantity | 0}</Button>
        <Button variant="secondary" onClick={() => addToCart(id)} disabled={quantity > 0 ? false : true}>+</Button>
      </ButtonGroup>
      {/* <button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}>
      {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
    </button> */}
    </td>
    <td className="text-center">₹ {price}</td>
  </tr>
)

Product.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number,
  quantity: PropTypes.number,
  name: PropTypes.string
}

export default Product
