import { Override } from "framer";

export let ComponentArray = [];

export function Button(props): Override {
  let ButtonData = {
    id: props.id,
    type: "button_component",
    displayOptions: [
      { key: "button-type", value: props.buttonType },
      { key: "stretch", value: props.stretch },
      { key: "horizontal-alignment", value: "center" }
    ],
    data: [{ key: "text", value: props.text }]
  };

  ComponentArray.push(ButtonData);

  //   console.log("Component Array", ComponentArray);

  return ButtonData;
}

export function Text(props): Override {
  let TextData = {
    id: "",
    type: "text_element",
    displayOptions: [
      { key: "font-style", value: props.fontStyle },
      { key: "left-padding", value: props.leftPadding },
      { key: "right-padding", value: props.leftPadding }
    ],
    data: [{ key: "text", value: props.text }]
  };

  return TextData;
}
