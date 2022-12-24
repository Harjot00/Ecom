import React from "react";

function Container(props) {
  return (
    <div className="w-full px-4 md:px-12 lg:px-16 mx-auto  space-y-6  flex flex-col justify-center">
      {props.children}
    </div>
  );
}

export default Container;
