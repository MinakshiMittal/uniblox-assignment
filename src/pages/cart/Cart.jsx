import { useSelector } from "react-redux";
import { CartCard } from "./CartCard";
import { userCartSelector } from "../../store/userCartSlice";
import { CartIcon } from "../products/CartIcon";
import { ArrowLeftIcon } from "./ArrowLeftIcon";
import { useNavigate } from "react-router-dom";
import { CartSummary } from "./CartSummary";

export const Cart = () => {
  const { cart } = useSelector(userCartSelector);
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex itesm-center gap-3">
        <div className="border p-1 rounded-lg cursor-pointer">
          <ArrowLeftIcon onClick={() => navigate("/")} />
        </div>
        <h1 className="text-2xl font-semibold text-red-900 flex items-center gap-1">
          Cart
          <CartIcon />
        </h1>
      </div>
      {cart?.length > 0 ? (
        <div className="flex gap-5">
          <div className="flex flex-col justify-start w-1/2 gap-8">
            {cart?.map((product) => {
              return <CartCard product={product} key={product?.id} />;
            })}
          </div>
          <div className="h-[80vh] border border-gray-200 flex items-center justify-center"></div>
          <CartSummary />
        </div>
      ) : (
        <p className="w-full h-full flex items-center justify-center text-gray-400 font-semibold">
          Cart is empty!
        </p>
      )}
    </div>
  );
};
