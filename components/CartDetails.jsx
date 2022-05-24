import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const CartDetails = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();
  const roundNumberToTwoDecimalPlaces = (num) => {
    var p = Math.pow(10, 2);
    return Math.round(num * p) / p;
  };
  const cartTotalPrice = totalPrice.toFixed(2);
  const handleCheckout = () => {};
  return (
    <>
      <div className="cartdetails-wrapper flex-direction" ref={cartRef}>
        <div className="cartdetails-container">
          <div className="cart-product-container backgrd">
            {cartItems?.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h6>
                      ${item.price} X {item.quantity}
                    </h6>
                  </div>
                  <div className="flex top">
                    <h5></h5>
                    <h4>
                      $
                      {roundNumberToTwoDecimalPlaces(
                        item.price * item.quantity
                      )}
                    </h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="subtotal-container">
          <div className="flex subt">
            <h5>Order Summary</h5>
          </div>
          {cartItems.length >= 1 && (
            <div>
              <div className="cart-summary-line">
                <span className="label js-subtotal"> Subtotal</span>
                <span className="value">${cartTotalPrice}</span>
              </div>

              <div className="cart-summary-line subborder">
                <span className="label js-subtotal"> Shipping</span>
                <span className="value">Free</span>
              </div>

              <div className="cart-summary-line">
                <span className="label js-subtotal"> TOTAL</span>
                <span className="value">${cartTotalPrice}</span>
              </div>
              <br></br>
              <div className="stripe-btn-container">
                <button type="button" className="btn" onClick={handleCheckout}>
                  Pay with Stripe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDetails;
