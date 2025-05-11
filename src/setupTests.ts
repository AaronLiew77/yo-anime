import "@testing-library/jest-dom";
import React from "react";

// Polyfill for TextEncoder/TextDecoder
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = require("util").TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = require("util").TextDecoder;
}

// Mock the framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: (props: any) => React.createElement("div", props, props.children),
  },
  AnimatePresence: (props: any) => React.createElement(React.Fragment, null, props.children),
}));

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: () => ({ id: "1" }),
}));
