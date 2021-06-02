import React from "react";
import loading from "../../assets/loading.svg";

const Loading = (props) => {
  const spinnerStyle = props.width ? {width: props.width} : {width: 100};

  return (
    <div className="spinner text-center mg-t-50" style={spinnerStyle}>
      <img src={loading} alt="Loading" />
    </div>
  )
}
export default Loading;
