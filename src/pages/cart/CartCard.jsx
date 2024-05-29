import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/userCartSlice";

export const CartCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg p-2 w-fit flex  gap-8 w-full">
      <img src={product?.src} alt="product" className="w-32 h-32" />
      <div className="space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {product?.name}
            </p>
            <p className="text-sm text-gray-600">{product?.description}</p>
          </div>
          <p>
            <span className="text-md font-semibold text-gray-900">{`${product?.currency}`}</span>
            <span className="text-md text-gray-600">{`${product?.amount}`}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-red-600 text-lg font-semibold text-white w-5 h-5 rounded-md flex items-center justify-center pb-1"
            onClick={() =>
              product?.quantity > 1
                ? dispatch(
                    updateQuantity({
                      product: { ...product, quantity: product.quantity - 1 },
                    })
                  )
                : dispatch(removeFromCart({ product }))
            }
          >
            -
          </button>
          <p>{product?.quantity}</p>
          <button
            className="bg-red-600 text-lg font-semibold text-white w-5 h-5 rounded-md flex items-center justify-center"
            onClick={() =>
              dispatch(
                updateQuantity({
                  product: { ...product, quantity: product.quantity + 1 },
                })
              )
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
