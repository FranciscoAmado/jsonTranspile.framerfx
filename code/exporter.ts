// import { ComponentArray } from "./Props";

// const fs = require("fs");
// import { writeFileSync } from "fs";
import * as fs from "fs";

let DummyData = [
  {
    id: "",
    type: "button_component",
    displayOptions: [
      { key: "button-type", value: "" },
      { key: "stretch", value: "" },
      { key: "horizontal-alignment", value: "center" }
    ],
    data: [{ key: "text", value: "" }]
  },
  {
    id: "",
    type: "button_component",
    displayOptions: [
      { key: "button-type", value: "" },
      { key: "stretch", value: "" },
      { key: "horizontal-alignment", value: "center" }
    ],
    data: [{ key: "text", value: "" }]
  }
];

function Exporter() {
  console.log("fs", fs);

  console.log("before");
  // writeFileSync("mynewfile1addisontest.txt", "Hello content!");
  console.log("after");
}

Exporter();
