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
import React, {useEffect} from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function CartSummary() {

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

    useEffect(()=>{
        let total = 0;
        cartItems.map(item => {
          total += item.price * item.quantity
        })
        setCartTotal(total);
    
      },[itemQuantity])

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cart Summary</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th width="70%">Item</th>
                      <th>Quantity</th>
                      <th className="text-center">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        cartItems.map(item => {
                            return <tr>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td className="text-center">₹ {item.quantity * item.price}</td>
                            </tr>
                        })
                    }
                    <tr>
                      <td><b>Total</b></td>
                      <td></td>
                      <td className="text-center"><b>₹ {cartTotal}</b></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CartSummary;
