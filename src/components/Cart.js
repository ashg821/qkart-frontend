import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  let resultantData = [];
  cartData.forEach(ele => {
    resultantData = [...resultantData, ...productsData.filter(element => element._id === ele.productId)];
  });
  resultantData.forEach((ele, index) => {
    ele['qty'] = cartData[index]['qty'];
  });
  return resultantData;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let total = 0;
  items.forEach(ele => {
    total += ele['cost'] * ele['qty'];
  });
  return total;
};


// TODO: CRIO_TASK_MODULE_CHECKOUT - Implement function to return total cart quantity
/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => {
  let totalQuantity = 0;
  items.forEach(ele => {
    totalQuantity += ele['qty'];
  });
  return totalQuantity;
};

// TODO: CRIO_TASK_MODULE_CHECKOUT - Add static quantity view for Checkout page cart
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
  params,
  disabled
}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {!disabled && <IconButton size="small" color="primary" onClick={() => handleDelete(localStorage.getItem('token'), params['items'], params['products'], params['id'], value - 1)}>
        <RemoveOutlined />
      </IconButton>}
      <Box padding="0.5rem" data-testid="item-qty">
        {disabled ? `Qty: ${value}` : value}
      </Box>
      {!disabled && <IconButton size="small" color="primary" onClick={() => handleAdd(localStorage.getItem('token'), params['items'], params['products'], params['id'], value + 1)}>
        <AddOutlined />
      </IconButton>}
    </Stack>
  );
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const Cart = ({
  products,
  items = [],
  handleQuantity, disabled
}) => {

  const history = useHistory();

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }



  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        <Box
          padding="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          {generateCartItemsFrom(items, products).map((ele, index) => (

            <Box display="flex" alignItems="flex-start" padding="1rem" key={ele._id}>
              <Box className="image-container">
                <img
                  // Add product image
                  src={ele.image}
                  // Add product name as alt eext
                  alt={ele.name}
                  width="100%"
                  height="100%"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{ele.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ItemQuantity
                    // Add required props by checking implementation
                    value={items[index]['qty']}
                    handleAdd={handleQuantity}
                    handleDelete={handleQuantity}
                    params={{ items, products, id: ele._id }}
                    disabled={disabled}
                  />
                  <Box padding="0.5rem" fontWeight="700">
                    ${ele.cost}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
          <Box display="flex" justifyContent="space-between" style={{ width: "100%" }}>
            <Box color="#3C3C3C" alignSelf="center">
              Order total
            </Box>
            <Box
              color="#3C3C3C"
              fontWeight="700"
              fontSize="1.5rem"
              alignSelf="center"
              data-testid="cart-total"
            >
              ${getTotalCartValue(generateCartItemsFrom(items, products))}
            </Box>
          </Box>
        </Box>

        {!disabled && <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={() => history.push("/checkout")}
          >
            Checkout
          </Button>
        </Box>}
      </Box>

      {/* order details card */}
      {disabled && <Box className="cart">
        <Box padding="1rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between">
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.3rem"
            sx={{ py: 2 }}
          >Order Details</Box>
          <Box display="flex" justifyContent="space-between" sx={{ py: 1 }}>
            <Box color="#3C3C3C">
              Products
            </Box>
            <Box color="#3C3C3C">
              {getTotalItems(items)}
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ py: 1 }}>
            <Box color="#3C3C3C">
              Subtotal
            </Box>
            <Box color="#3C3C3C">
              ${getTotalCartValue(generateCartItemsFrom(items, products))}
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ py: 1 }}>
            <Box color="#3C3C3C">
              Shipping Charges
            </Box>
            <Box color="#3C3C3C">
              $0
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ py: 1 }}>
            <Box color="#3C3C3C" fontSize="1.1rem" fontWeight="600">
              Total
            </Box>
            <Box color="#3C3C3C" fontSize="1.1rem" fontWeight="600">
              ${getTotalCartValue(generateCartItemsFrom(items, products))}
            </Box>
          </Box>
        </Box>
      </Box>}
    </>
  );
};

export default Cart;
