import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { Products } from "../pages/products/Products"
import { useNavigate } from "react-router-dom";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Products", () => {
  test("navigates to cart page when cart icon is clicked", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    useSelector.mockReturnValue({ cart: [] });
    const { getByTestId } = render(<Products />);
    fireEvent.click(getByTestId("cart-icon"));
    expect(navigate).toHaveBeenCalledWith("/cart");
  });

  test("displays correct cart count in cart icon", () => {
    useSelector.mockReturnValue({ cart: [{}, {}, {}] });
    const { getByTestId } = render(<Products />);
    expect(getByTestId("cart-count").textContent).toBe("3");
  });
});
