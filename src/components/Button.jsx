import React from "react";
import PropTypes from "prop-types";

const shapes = { circle: "rounded-[50%]", round: "rounded-lg" };
const variants = {
  fill: {
    green_900: "bg-green-900 text-white-A700",
    blue_800: "bg-blue-800",
    white_A700: "bg-white-A700",
    green_50: "bg-green-50",
    blue_A400: "bg-blue-A400 text-white-A700",
    gray_900: "bg-gray-900 text-white-A700",
    yellow_900: "bg-yellow-900 text-white-A700",
  },
  gradient: { green_A700_green_A200: "bg-gradient " },
  outline: {
    white_A700: "border border-solid border-white-A700",
    green_900: "border-2 border-green-900 border-solid text-green-900",
  },
};
const sizes = {
  xs: "p-1.5",
  sm: "p-[11px]",
  md: "p-[15px]",
  lg: "px-5 py-[21px]",
  xl: "p-6 sm:px-5",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "",
  variant = "",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["circle", "round"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  variant: PropTypes.oneOf(["fill", "gradient", "outline"]),
  color: PropTypes.oneOf([
    "green_900",
    "blue_800",
    "white_A700",
    "green_50",
    "blue_A400",
    "gray_900",
    "yellow_900",
    "green_A700_green_A200",
  ]),
};

export { Button };
