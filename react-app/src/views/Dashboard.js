/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  CardImg,
  CardHeader,
  Table,
  ButtonGroup
} from "reactstrap";

import axios from "axios";
import { NavLink } from "react-router-dom";

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart, removeFromCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductsContainer from './ProductsContainer'
import { getCartProducts } from "reducers";
import { getTotal } from "reducers";

const Dashboard = ({ products, cartProducts, addToCart, removeFromCart }) => {
  console.log(products, cartProducts);
  const [productsList, setProductsList] = React.useState([])

  let localCart = []
  let localItemQuantity = {}
  if(localStorage.getItem('cart')){
    localCart = JSON.parse(localStorage.getItem('cart'))
    
    localCart.map(item => {
      localItemQuantity[item.id] = item.quantity
    })
  }

  const [cartItems, setCartItems] = React.useState(localCart)
  const [itemQuantity, setItemQuantity] = React.useState(localItemQuantity)
  const [cartTotal, setCartTotal] = React.useState(0)

  const getQuantityById = (id) => {
    let product = cartProducts.find(product => product.id === id);
    return typeof product !== 'undefined' ? product.quantity : 0
  }

  /* const addToCart = (item) => {
    setCartItems(oldItems => {
      let index = oldItems.findIndex(i => i.id === item.id)
      if(index === -1){//Item doesn't exist in cart

        updateInventory(item.id, item.quantity - 1)

        setItemQuantity(oldValue => {
          return {
            ...oldValue,
            [item.id]: 1 
          }
        })

        return [
          ...oldItems,
          {
            ...item,
            quantity: 1
          }
        ]
      }
      else{

        if(oldItems[index].quantity + 1 > item.quantity)
        {
          alert('This quantity is out of stock')
          return [
            ...oldItems
          ]
        }

        updateInventory(item.id, item.quantity - itemQuantity[item.id] - 1)

        oldItems[index].quantity += 1

        setItemQuantity(oldValue => {
          oldValue[item.id] = oldItems[index].quantity
          return {
            ...oldValue
          }
        })

        return [
          ...oldItems
        ]
      }
    })
  } */

  /* const removeFromCart = (item) => {
    setCartItems(oldItems => {
      let index = oldItems.findIndex(i => i.id === item.id)
      if(index !== -1){
        if(oldItems[index].quantity)
        {
          updateInventory(item.id, item.quantity - itemQuantity[item.id] + 1)
          oldItems[index].quantity -= 1
          setItemQuantity(oldValue => {
            oldValue[item.id] = oldItems[index].quantity
            return {
              ...oldValue
            }
          })
        }
      }

      return [
        ...oldItems
      ]
      
    })
  } */

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartItems))
  },[cartItems])

  useEffect(()=>{
    let total = 0;
    cartItems.map(item => {
      total += item.price * item.quantity
    })
    setCartTotal(total);

  },[itemQuantity])

  const updateInventory = (id, quantity) => {
    console.log(id, quantity)
    const request = axios.patch(
      'http://localhost:1337/products/' + id,
      {
        quantity: quantity
      }
    );
    request
      .then(response => {
        console.log(response)
         /* if(response.status === 200) 
          setProductsList(response.data); */
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart"> 
            <iframe src="http://localhost:3000/d/TdX3jM8Gk/virtual-mall-dashboard?from=0&to=0&orgId=1&viewPanel=2" height="500" frameBorder="0"></iframe>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Grocery</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th></th>
                      <th>Items</th>
                      <th>Quantity</th>
                      <th className="text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    products.map(product => {
                      return <tr key={`${product.id}`}>
                        <td>
                          <Card style={{ width: '10rem', margin: '10px' }}>
                            <CardImg top src={product.image} alt="..." />
                          </Card>
                        </td>
                        <td>{product.name}</td>
                        <td>
                          <ButtonGroup className="quantity-buttons" aria-label="Basic example">
                            <Button variant="secondary" onClick = {()=> removeFromCart(product.id)}>-</Button>
                            <Button variant="secondary">{getQuantityById(product.id) | 0}</Button>
                            <Button variant="secondary" onClick = {()=> addToCart(product.id)}>+</Button>
                          </ButtonGroup>
                        </td>
                        <td className="text-center">₹ {product.price}</td>
                      </tr>
                    })
                  }
                    <tr>
                      <td colSpan="2"><b>Total</b></td>
                      <td><b>₹ {cartTotal}</b></td>
                      <td className="text-center"><Button color="primary" disabled={cartTotal === 0}>
                        <NavLink
                          to={'cart-summary'}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <p>Checkout</p>
                        </NavLink></Button></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col md="12">
            <ProductsContainer />
          </Col>
        </Row> */}
      </div>
    </>
  );
}

Dashboard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products),
  cartProducts: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { addToCart, removeFromCart }
)(Dashboard)
