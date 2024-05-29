import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ErrorIcon } from "./ErrorIcon";
import { createOrder, userCartSelector } from "../../store/userCartSlice";

export const CartSummary = () => {
  const { cart, orders } = useSelector(userCartSelector);
  const couponCode = "P98UKMV9";
  const [isCouponApplicable, setIsCouponApplicable] = useState(false);
  const dispatch = useDispatch();

  // Function to calculate total price of items in the cart
  const totalPrice = () =>
    cart?.reduce((acc, item) => acc + item.quantity * item.amount, 0);

  <div className="w-1/2 space-y-4">
    <p className="text-red-600 font-semibold text-lg">Cart Summary</p>
    <div>
      {cart?.map((item) => {
        return (
          <div className="flex items-center justify-between font-semibold text-gray-700">
            <p>{item?.name}</p>
            <p>{`${item?.currency}${item?.quantity * item?.amount}`}</p>
          </div>
        );
      })}
    </div>
    <div>
      <p className="flex items-center justify-between gap-2 ">
        <span className="text-gray-500 font-semibold">{`Coupon Code: ${couponCode}`}</span>
        <span
          className="text-red-700 cursor-pointer text-md font-bold"
          onClick={() => setIsCouponApplicable(true)}
        >
          {isCouponApplicable && orders?.length % 3 === 0
            ? "Coupon Applied"
            : "Apply Coupon?"}
        </span>
      </p>
      {isCouponApplicable && orders?.length % 3 !== 0 && (
        <p className="text-red-400 font-light text-xs flex items-center justify-end gap-1">
          <ErrorIcon className="w-5 h-5" />
          {`You need to order ${3 - (orders?.length % 3)} more
                  ${
                    3 - (orders?.length % 3) === 1 ? "time" : "times"
                  } to avail this offer!`}
        </p>
      )}
    </div>
    <div>
      <div className="flex items-center justify-between">
        <p>Total Price:</p>
        <p>{`Rs ${totalPrice().toFixed(2)}`}</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Discount</p>
        <p>{`- Rs ${
          isCouponApplicable && orders?.length % 3 === 0
            ? (totalPrice() * 0.1).toFixed(2)
            : (0).toFixed(2)
        }`}</p>
      </div>
      <div className="flex items-center justify-between">
        <p>Cart value:</p>
        <p>
          {`Rs ${
            isCouponApplicable && orders?.length % 3 === 0
              ? (totalPrice() * 0.9).toFixed(2)
              : totalPrice().toFixed(2)
          }`}
        </p>
      </div>
    </div>
    <div className="flex items-center justify-end pt-10">
      <button
        className="bg-red-600 text-lg font-semibold text-white py-2 px-4 rounded-xl"
        onClick={() => dispatch(createOrder({ order: cart }))}
      >
        Checkout
      </button>
    </div>
  </div>;
};
