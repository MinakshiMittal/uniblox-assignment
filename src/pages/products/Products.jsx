import { useNavigate } from "react-router-dom";
import { products } from "../../data";
import { ProductCard } from "./ProductCard";
import { useSelector } from "react-redux";
import { userCartSelector } from "../../store/userCartSlice";
import { CartIcon } from "./CartIcon";

export const Products = () => {
  const navigate = useNavigate();
  const { cart } = useSelector(userCartSelector);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
        <div className="relative">
          <div className="cursor-pointer">
            <CartIcon onClick={() => navigate("/cart")} />
          </div>
          <p className="absolute bottom-3 left-4 w-4 h-4 bg-red-600 text-white text-xs font-medium rounded-full flex items-center justify-center">
            {cart?.length}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap">
        {products?.map((product) => {
          return <ProductCard product={product} key={product?.id} />;
        })}
      </div>
    </div>
  );
};
