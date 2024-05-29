import { render, fireEvent, cleanup } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { userCartSelector } from "../../store/userCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/userCartSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../store/userCartSlice", () => ({
  userCartSelector: jest.fn().mockReturnValue({ cart: [] }),
}));

jest.mock("../../store/userCartSlice", () => ({
  addToCart: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("ProductCard", () => {
  const product = {
    id: 1,
    name: "Test Product",
    description: "Test Description",
    currency: "USD",
    amount: 10,
    src: "test-image.jpg",
  };

  const cartSlice = {
    cart: [],
  };
  test("renders product details correctly", () => {
    useSelector.mockReturnValue(cartSlice);

    const { getByText, getByAltText } = render(
      <ProductCard product={product} />
    );

    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
    expect(getByText("USD")).toBeInTheDocument();
    expect(getByText("10")).toBeInTheDocument();
    expect(getByAltText("product")).toBeInTheDocument();
  });

  test.each([
    ["Add to Cart", []],
    ["Go to Cart", [product]],
  ])('displays "%s" button when product is %s in cart', (buttonText, cart) => {
    useSelector.mockReturnValue({ cart });
    const { getByText } = render(<ProductCard product={product} />);

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  test('navigates to cart page when "Go to Cart" button is clicked', () => {
    const navigate = jest.fn();

    useNavigate.mockReturnValue(navigate);
    useSelector.mockReturnValue({ cart: [product] });
    const { getByText } = render(<ProductCard product={product} />);
    fireEvent.click(getByText("Go to Cart"));

    expect(navigate).toHaveBeenCalledWith("/cart");
  });
});
