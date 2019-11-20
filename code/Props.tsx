import * as React from "react"
import { Override } from "framer"

// const [componentArray, setComponentArray] = React.useState([]);

let componentArray = []

export function Button(props): Override {
    let ButtonData = {
        id: props.id,
        type: "button_component",
        displayOptions: [
            { key: "button-type", value: props.buttonType },
            { key: "stretch", value: props.stretch },
            { key: "horizontal-alignment", value: "center" },
        ],
        data: [{ key: "text", value: props.text }],
    }

    componentArray.push(ButtonData)
    console.log(componentArray)
    // setComponentArray([...componentArray, ButtonData]);
    return ButtonData
    return {}
}

export function Text(props): Override {
    let TextData = {
        id: "",
        type: "text_element",
        displayOptions: [
            { key: "font-style", value: props.fontStyle },
            { key: "left-padding", value: props.leftPadding },
            { key: "right-padding", value: props.leftPadding },
        ],
        data: [{ key: "text", value: props.text }],
    }
    return TextData
}

// showing data in console
function collectData() {
    console.log("From Export Give Data", componentArray)
    return componentArray
}
// setTimeout(collectData, 2000)

/**
 *
 *
 *
 * Showing data from overrides
 *
 *
 * */

export function ShowData(): Override {
    return <h1>{JSON.stringify(componentArray)}</h1>
}

export function CleanData() {
    componentArray = []
}
