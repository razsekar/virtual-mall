import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap'

const ProductsList = ({ name, children }) => (
  <Card>
    <CardHeader>
      <CardTitle tag="h4">{name}</CardTitle>
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
          {children}
        </tbody>
      </Table>
    </CardBody>
  </Card>
)

ProductsList.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired
}

export default ProductsList
