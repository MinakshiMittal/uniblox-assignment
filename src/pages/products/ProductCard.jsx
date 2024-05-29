import { useDispatch, useSelector } from "react-redux";
import { addToCart, userCartSelector } from "../../store/userCartSlice";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector(userCartSelector);
  const navigate = useNavigate();

  // Function to check if product is already in cart
  const isProductInCart = (item) =>
    cart?.filter((product) => product?.id === item?.id)?.length;

  return (
    <div className="border rounded-lg p-2 w-fit space-y-4">
      <div>
        <img
          className="w-56 h-72 rounded-lg"
          src={product?.src}
          alt="product"
        />
        <p className="text-lg font-semibold text-gray-900">{product?.name}</p>
        <p className="text-sm text-gray-600">{product?.description}</p>
      </div>
      <p>
        <span className="text-md font-semibold text-gray-900">{`${product?.currency}`}</span>{" "}
        <span className="text-md text-gray-600">{`${product?.amount}`}</span>
      </p>
      <button
        className={`px-2 py-2 w-full text-sm font-semibold ${
          !isProductInCart(product)
            ? "text-white bg-red-600"
            : "text-red-600 border border-red-600"
        } rounded-lg`}
        onClick={() =>
          isProductInCart(product)
            ? navigate("/cart")
            : dispatch(addToCart({ product: { ...product, quantity: 1 } }))
        }
      >
        {isProductInCart(product) ? "Go to Cart" : "Add to Cart"}
      </button>
    </div>
  );
};
