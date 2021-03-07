/**
 * Mocking client-server processing
 */
import _products from './products.json'
import axios from "axios";

const TIMEOUT = 30

export default {
  getProducts: (cb) => {
    const request = axios.get(
      'http://localhost:1337/products'
    );
    request
      .then(response => {
         if(response.status === 200) 
         cb(response.data);
      })
      .catch(err => {
        cb([])
        console.log(err);
      });
  },
  updateInventory: (payload, cb) => {
    const request = axios.patch(
      'http://localhost:1337/products/' + payload.id,
      {
        quantity: payload.quantity
      }
    );
    request
      .then(response => {
        console.log(response)
        cb();
      })
      .catch(err => {
        console.log(err);
        cb();
      });
  },
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
