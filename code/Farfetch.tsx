import * as React from "react"
import {
    useImperativeHandle,
    useState,
    useEffect,
    forwardRef,
    FunctionComponent,
} from "react"
import { Frame, FrameProps, addPropertyControls, ControlType } from "framer"
//@ts-ignore
import { Button } from "./Props.tsx"
import Clipboard from "react-clipboard.js"

type Props = Partial<FrameProps> &
    Partial<{
        displayOptions: string
        buttonType: string
        stretch: string
    }>

export const MyButton: FunctionComponent<Props> = (props: Props) => {
    const [displayOptions, setDisplayOptions] = useState(props.displayOptions)
    const { ...rest } = props

    // useEffect(() => {
    //     props.ref.current = { displayOptions }
    // }, [displayOptions])

    const handleDisplayOptionsInput = () => {
        setDisplayOptions("new pool")
    }

    console.log("count ", displayOptions)
    console.log("MyButton ref ", props)

    return (
        <Frame {...rest} onChange={handleDisplayOptionsInput}>
            <h1>{props.buttonType}</h1>
            <h1>{props.stretch}</h1>
            <h1>{displayOptions}</h1>
        </Frame>
    )
}

MyButton.defaultProps = {
    displayOptions: "false",
    buttonType: "Primary",
    stretch: "fill",
}

addPropertyControls(MyButton, {
    buttonType: {
        type: ControlType.String,
        title: "buttonType",
    },
    stretch: {
        type: ControlType.String,
        title: "Stretch",
    },
})
