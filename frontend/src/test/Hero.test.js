import React from "react";
import { render , screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../Landing_page/Home/Hero";



test("renders hero image and signup button", () => {
  render(<Hero />);

  //  hero image
  const heroImage = screen.getByAltText("heroImage");
  expect(heroImage).toBeInTheDocument();
  expect(heroImage).toHaveAttribute("src", "media/images/homeHero.png");

  //  Sign up button
  const signupButton = screen.getByRole("button", { name: /sign up for free/i });
  expect(signupButton).toBeInTheDocument();
  expect(signupButton).toHaveClass("btn-primary");
});