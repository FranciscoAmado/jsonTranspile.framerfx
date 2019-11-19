import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer";
//@ts-ignore
import { ShowData } from "./Props.tsx";

export function JSON(props) {
  console.log(props);

  return <Frame>{ShowData()}</Frame>;
}

addPropertyControls(JSON, {
  buttonType: {
    type: ControlType.String,
    title: "buttonType"
  },
  stretch: {
    type: ControlType.String,
    title: "Stretch"
  }
});
