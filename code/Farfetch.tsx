import * as React from "react";
import { Frame, FrameProps, addPropertyControls, ControlType } from "framer";
//@ts-ignore
import { Button } from "./Props.tsx";
import Clipboard from "react-clipboard.js";

import { useGlobal } from "./JSONViewer";

type Props = Partial<FrameProps> &
  Partial<{
    stateValue: string;
    displayOptions: string;
    buttonType: string;
    stretch: string;
  }>;

export const MyButton = (props: Props) => {
  const { ...rest } = props;
  const [globalState, globalActions] = useGlobal();

  let ButtonData = {
    id: props.id,
    type: "button_component",
    displayOptions: [
      { key: "button-type", value: props.buttonType },
      { key: "stretch", value: props.stretch },
      { key: "horizontal-alignment", value: "center" }
    ],
    data: [{ key: "text", value: "dead" }]
  };

  React.useLayoutEffect(() => {
    globalActions.addItem(ButtonData);
  }, [props]);

  return (
    <Frame {...rest}>
      <h1>{props.buttonType}</h1>
      <h1>{props.stretch}</h1>
    </Frame>
  );
};

MyButton.defaultProps = {
  displayOptions: "false",
  buttonType: "Primary",
  stretch: "fill"
};

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
