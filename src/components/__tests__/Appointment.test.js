import React from "react";
import { render } from "@testing-library/react";
import Application from "components/Application";
import Appointment from "components/Appointment/index";



describe("Appointment", () => {
// A test that renders a React Component
it("renders without crashing", () => {
  render(<Appointment />);
  });
  
});
