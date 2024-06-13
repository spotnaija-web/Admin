import React from "react";

import { baseurl as base_url } from "../../apis/apiconfig"

const Img = ({
  className,
  src = "defaultNoData.png",
  alt = "testImg",
  source = "non-api",
  ...restProps
}) => {
  let src_path = `${src}`;
  
  if(source == "api"){
    src_path = `${base_url}/api/photo/${src}`;
  }
  return (
    <img
      className={className}
      src={src_path}
      alt={alt}
      {...restProps}
      loading={"lazy"}
    />
  );
};
export { Img };
