import React from "react";
import { render, screen } from "@testing-library/react";
import { Cart } from "../pages/cart/Cart";
import { useSelector } from "react-redux";
import { CartCard } from "../pages/cart/CartCard";
import { useNavigate } from "react-router-dom";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Cart Component", () => {
  test('renders "Cart is empty!" message when cart is empty', () => {
    useSelector.mockReturnValue({ cart: [] });
    render(<Cart />);
    const emptyCartMessage = screen.getByText(/cart is empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });
});
