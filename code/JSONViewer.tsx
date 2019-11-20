import * as React from "react"
import { Frame, FrameProps, addPropertyControls, ControlType } from "framer"

// Open Preview: Command + P
// Learn more: https://framer.com/api

type Props = Partial<FrameProps> &
    Partial<{
        target: React.ReactNodeArray
    }>

export function JSONViewer(props) {
    const { target, ...rest } = props

    const [node] = target

    if (!node) {
        return (
            <DefaultContainer {...rest}>
                <h1>🕵️‍♀️ JSONViewer</h1>
                <p>Connect a Frame to spy on its JSON.</p>
            </DefaultContainer>
        )
    }

    console.log("props", props)
    console.log("target", target)
    console.log("node", node)
    // console.log(node.props.children[0].props.displayOptions)

    return (
        <Frame {...rest}>
            <div style={containerStyle}>{node}</div>
        </Frame>
    )
}

JSONViewer.defaultProps = {
    height: 280,
    width: 300,
    target: [],
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(JSONViewer, {
    target: { type: ControlType.ComponentInstance, title: "Target" },
})

type DefaultContainerProps = Partial<FrameProps>

// A component for our default container
const DefaultContainer = (props: DefaultContainerProps) => {
    const { children, style, ...rest } = props

    return (
        <Frame
            {...rest}
            style={{
                ...emptyState,
                ...style,
            }}
        >
            <>{children}</>
        </Frame>
    )
}

const emptyState: React.CSSProperties = {
    color: "#8855FF",
    background: "rgba(136, 85, 255, 0.1)",
    overflow: "hidden",
    padding: 16,
    fontSize: 16,
    lineHeight: 1.3,
    textAlign: "left",
}

const containerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "scroll",
    padding: "0 8px",
}

const clipboard: React.CSSProperties = {
    cursor: "pointer",
    backgroundColor: "none",
    background: "none",
    border: "none",
    outline: "none",
    color: "#0099ff",
    position: "fixed",
    top: "8px",
    right: "12px",
}
