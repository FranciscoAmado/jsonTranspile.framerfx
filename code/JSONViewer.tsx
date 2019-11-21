import * as React from "react";
import { Frame, FrameProps, addPropertyControls, ControlType } from "framer";

import globalHook from "use-global-hook";

// Global Initial State
const initialState = {
  items: []
};

// Define actions
const actions = {
  addItem: (store, data) => {
    if (store.state.items.some(component => component.id === data.id)) {
      for (var i = 0; i < store.state.items.length; i++) {
        if (store.state.items[i].id === data.id) {
          store.state.items.splice(i, 1);
        }
      }
      const newItems = store.state.items.concat([data]);
      store.setState({ items: newItems });
    } else {
      const newItems = store.state.items.concat([data]);
      store.setState({ items: newItems });
    }
  }
};

// Attach globals to a hook
export const useGlobal = globalHook(React, initialState, actions);

// Type definitions for JSONViewer Nodes
type Props = Partial<FrameProps> &
  Partial<{
    target: React.ReactNodeArray;
  }>;

// Main function body
export function JSONViewer(props: Props) {
  const { target, ...rest } = props;
  const [node] = target;
  const [globalState, globalActions] = useGlobal();

  return (
    <Frame {...rest}>
      <div
        style={{
          ...containerStyle,
          ...props.style
        }}
      >
        <p>
          JSON:
          {JSON.stringify(globalState.items)}
        </p>
      </div>
    </Frame>
  );
}

JSONViewer.defaultProps = {
  height: 280,
  width: 300,
  target: []
};

addPropertyControls(JSONViewer, {
  target: { type: ControlType.ComponentInstance, title: "Target" }
});

type DefaultContainerProps = Partial<FrameProps>;

// A component for our default container
const DefaultContainer = (props: DefaultContainerProps) => {
  const { children, style, ...rest } = props;

  return (
    <Frame
      {...rest}
      style={{
        ...emptyState,
        ...style
      }}
    >
      {/* <>{children}</> */}
    </Frame>
  );
};

const emptyState: React.CSSProperties = {
  color: "#8855FF",
  background: "rgba(136, 85, 255, 0.1)",
  overflow: "hidden",
  padding: 16,
  fontSize: 16,
  lineHeight: 1.3,
  textAlign: "left"
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap"
};

const clipboard: React.CSSProperties = {
  cursor: "pointer",
  backgroundColor: "none",
  background: "none",
  border: "none",
  outline: "none",
  color: "#0099ff",
  position: "fixed",
  top: "8px",
  right: "12px"
};
