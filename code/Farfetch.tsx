import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer";
//@ts-ignore
import { Button } from "./Props.tsx";

export function MyButton(props) {
  return (
    <Frame {...Button(props)}>
      <h1>{props.buttonType}</h1>
      <h1>{props.stretch}</h1>
    </Frame>
  );
}

addPropertyControls(MyButton, {
  buttonType: {
    type: ControlType.String,
    title: "buttonType"
  },
  stretch: {
    type: ControlType.String,
    title: "Stretch"
  }
});
