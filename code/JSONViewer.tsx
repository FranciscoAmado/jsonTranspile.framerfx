import * as React from "react"
import {
    Frame,
    FrameProps,
    Scroll,
    addPropertyControls,
    ControlType,
} from "framer"

import globalHook from "use-global-hook"
import Clipboard from "react-clipboard.js"
import JSONPretty from "react-json-prettify"

// Global Initial State
const initialState = {
    items: [],
}

// Define actions
const actions = {
    addItem: (store, data) => {
        if (store.state.items.some(component => component.id === data.id)) {
            for (var i = 0; i < store.state.items.length; i++) {
                if (store.state.items[i].id === data.id) {
                    store.state.items.splice(i, 1)
                }
            }
            const newItems = store.state.items.concat([data])
            store.setState({ items: newItems })
        } else {
            const newItems = store.state.items.concat([data])
            store.setState({ items: newItems })
        }
    },
    nuke: (store, data) => {
        store.setState({ items: [] })
    },
}

// Attach globals to a hook
export const useGlobal = globalHook(React, initialState, actions)

// Main function body
export function JSONViewer(props) {
    const { style, ...rest } = props
    const [globalState, globalActions] = useGlobal()

    if (globalState.items.length == 0) {
        return <DefaultContainer {...rest} />
    }

    var json = JSON.stringify(globalState.items)

    return (
        <Frame
            {...rest}
            style={{
                ...emptyState,
                ...style,
            }}
        >
            <div style={containerStyle}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <button
                        style={{ ...clipboard, marginLeft: "0px" }}
                        onClick={globalActions.nuke}
                    >
                        Reset
                    </button>
                    <Clipboard
                        data-clipboard-text={json}
                        style={{ ...clipboard }}
                    >
                        Copy to Clipboard
                    </Clipboard>
                </div>
                <JSONPretty json={globalState.items} padding={4}/>
            </div>
        </Frame>
    )
}

JSONViewer.defaultProps = {
    height: 725,
    width: 725,
}

type DefaultContainerProps = Partial<FrameProps>

// A component for our default container
const DefaultContainer = (props: DefaultContainerProps) => {
    const { children, style, ...rest } = props

    const code = `
    import { useGlobal } from "./JSONViewer";
    const [globalState, globalActions] = useGlobal();

    let data = {
        id: props.id,
        type: "component_type",
        displayOptions: [
            { key: "attribute-with-props", value: props.stretch },
            { key: "attribute-value", value: "center" }
        ],
        data: [{ key: "data-key", value: "data-value" }]
    };

    React.useLayoutEffect(() => {
        globalActions.addItem(data);
    }, [props]);
    `

    return (
        <Frame
            {...rest}
            style={{
                ...emptyState,
                ...style,
            }}
        >
            <h1>🤓 JSONViewer</h1>
            <h2>Get your Components as JSON by following the pattern:</h2>
            <div style={containerStyle}>
                <Clipboard data-clipboard-text={code} style={{ ...clipboard }}>
                    Copy to Clipboard
                </Clipboard>
                <pre
                    style={{
                        background: "#34362e",
                        color: "grey",
                    }}
                >
                    {code}
                </pre>
            </div>
        </Frame>
    )
}

const emptyState: React.CSSProperties = {
    color: "white",
    background: "#272822",
    overflow: "hidden",
    padding: 16,
    fontSize: 16,
    lineHeight: 1.3,
    textAlign: "left",
}

const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
}

const clipboard: React.CSSProperties = {
    cursor: "pointer",
    backgroundColor: "none",
    background: "none",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    // position: "fixed",
    // top: "8px",
    // right: "12px",
}
