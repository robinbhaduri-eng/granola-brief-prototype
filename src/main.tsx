import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BriefCanvas from "./components/brief/BriefCanvas";
import "./index.css";

function Root() {
  const demo =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("demo")
      : null;

  if (demo === "brief") {
    return <BriefCanvas />;
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
