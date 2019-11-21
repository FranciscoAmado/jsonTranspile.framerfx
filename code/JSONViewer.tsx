import * as React from "react"
import {
    Frame,
    FrameProps,
    addPropertyControls,
    ControlType,
    useCycle,
    Data,
} from "framer"
import globalHook from 'use-global-hook';
 
const initialState = {
  items: [],
};
 
const actions = {
  addItem: (store, data) => {
    console.log("data", data);
    
    const newItems = store.state.items.concat([data]);
    console.log("newItems", JSON.stringify(newItems));
    store.setState({ items: newItems });
  },
};
 
export const useGlobal = globalHook(React, initialState, actions);

// Open Preview: Command + P
// Learn more: https://framer.com/api

type Props = Partial<FrameProps> &
    Partial<{
        target: React.ReactNodeArray
    }>

export function JSONViewer(props) {
    const { target, ...rest } = props
    const [node] = target
    const [globalState, globalActions] = useGlobal();

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

    React.useLayoutEffect(() => {
        console.log("JSONViewer useLayoutEffect", globalState.items)
    }, [])

    return (
        <Frame {...rest}>
            <div
                style={{
                    ...containerStyle,
                    ...props.style,
                }}
            >
                <p>
                    JSON:
                    {console.log("JSON", JSON.stringify(globalState.items))}
                    {JSON.stringify(globalState.items)}
                </p>
                <Frame {...rest}>
                    {React.cloneElement(node, {})}
                </Frame>
            </div>
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
    display: "flex",
    flexWrap: "wrap",
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
