import { render, screen, fireEvent } from "@testing-library/react";
import { Cart } from "../pages/cart/Cart";
import { userCartSelector } from "../store/userCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "../assets/icons/ArrowLeftIcon";
import { CartCard } from "../pages/cart/CartCard";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Cart Component", () => {
  const product = {
    id: 1,
    name: "Test Product",
    description: "Test Description",
    currency: "USD",
    amount: 10,
    src: "test-image.jpg",
  };

  beforeEach(() => {
    useSelector.mockReturnValue({ cart: [] });
  });

  test('renders "Cart is empty!" message when cart is empty', () => {
    render(<Cart />);
    const emptyCartMessage = screen.getByText(/cart is empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });

  test("renders cart items when cart is not empty", () => {
    useSelector.mockReturnValue({
      cart: [{ id: 1, name: "Product 1", price: 10 }],
    });
    render(<Cart />);
    const cartItem = screen.getByText("Product 1");
    expect(cartItem).toBeInTheDocument();
  });

  test("clicking on ArrowLeftIcon triggers a function", () => {
    const mockFunction = jest.fn(); 
    render(<ArrowLeftIcon onClick={mockFunction} />);
    const iconElement = screen.getByTestId("arrow-left-icon");
    fireEvent.click(iconElement);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
