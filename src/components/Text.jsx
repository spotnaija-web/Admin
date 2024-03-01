import React from "react";

const sizeClasses = {
  txtInterSemiBold24WhiteA700: "font-inter font-semibold",
  txtInterMedium16Gray600: "font-inter font-medium",
  txtInterRegular20: "font-inter font-normal",
  txtInterSemiBold48: "font-inter font-semibold",
  txtInterMedium14Gray600: "font-inter font-medium",
  txtInterSemiBold24: "font-inter font-semibold",
  txtInterSemiBold16Gray900: "font-inter font-semibold",
  txtInterMedium14Bluegray800: "font-inter font-medium",
  txtInterMedium14WhiteA700: "font-inter font-medium",
  txtInterMedium12Gray600: "font-inter font-medium",
  txtInterSemiBold32: "font-inter font-semibold",
  txtInterRegular14WhiteA700: "font-inter font-normal",
  txtInterMedium18: "font-inter font-medium",
  txtInterMedium12: "font-inter font-medium",
  txtInterMedium32: "font-inter font-medium italic",
  txtInterMedium16: "font-inter font-medium",
  txtInterSemiBold18: "font-inter font-semibold",
  txtInterMedium16Green900: "font-inter font-medium",
  txtInterSemiBold16: "font-inter font-semibold",
  txtInterMedium14: "font-inter font-medium",
  txtInterSemiBold18Gray900: "font-inter font-semibold",
  txtInterSemiBold20: "font-inter font-semibold",
  txtInterRegular14: "font-inter font-normal",
  txtInterRegular16: "font-inter font-normal",
  txtInterSemiBold48Gray900: "font-inter font-semibold",
  txtInterRegular18: "font-inter font-normal",
  txtInterMedium16Bluegray800: "font-inter font-medium",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };